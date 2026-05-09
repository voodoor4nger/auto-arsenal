import type { GameState } from "../game";
import type { BossBruteLord, Brute, Caster, Explosion } from "../types";
import {
  BOMBER_ARM_RANGE,
  BOSS_ENRAGE_DAMAGE_MULT,
  BOSS_ENRAGE_HP_THRESHOLD,
  BOSS_ENRAGE_SLAM_COOLDOWN,
  BOSS_ENRAGE_SPEED_BONUS,
  BOSS_ROAR_HP_THRESHOLD,
  BOSS_SLAM_COOLDOWN,
  BOSS_SLAM_DAMAGE,
  BOSS_SLAM_RADIUS,
  BOSS_SLAM_RANGE,
  BOSS_SLAM_TELEGRAPH_RING,
  BOSS_SLAM_WINDUP,
  BRUTE_SLAM_COOLDOWN,
  BRUTE_SLAM_DAMAGE,
  BRUTE_SLAM_RADIUS,
  BRUTE_SLAM_RANGE,
  BRUTE_SLAM_STRIKE_INNER,
  BRUTE_SLAM_STRIKE_OUTER,
  BRUTE_SLAM_STRIKE_TTL,
  BRUTE_SLAM_WINDUP,
  CASTER_ATTACK_DAMAGE,
  CASTER_AOE_RADIUS,
  CASTER_CHANNEL_TIME,
  CASTER_COOLDOWN,
  CASTER_FLASH_DURATION,
  CASTER_KEEP_DISTANCE_TOLERANCE,
  CASTER_RANGE,
  SHOOTER_RANGE,
} from "../constants";
import { dealDamage } from "../damage";
import { damagePlayer } from "./combat";
import { makeBrute } from "./spawn";

export function updateEnemyAI(state: GameState, dt: number): void {
  const px = state.player.pos.x;
  const py = state.player.pos.y;

  for (const e of state.enemies) {
    if (!e.alive) continue;
    if (e.critFlashTtl > 0) e.critFlashTtl = Math.max(0, e.critFlashTtl - dt);
    if (e.frostFlashTtl > 0) e.frostFlashTtl = Math.max(0, e.frostFlashTtl - dt);
    if (e.slowTimer > 0) {
      e.slowTimer = Math.max(0, e.slowTimer - dt);
      if (e.slowTimer <= 0) e.slowMultiplier = 1;
    }
    if (e.species === "shielded" && e.shieldBreakTtl > 0) {
      e.shieldBreakTtl = Math.max(0, e.shieldBreakTtl - dt);
    }
    if (e.species === "caster" && e.attackFlashTtl > 0) {
      e.attackFlashTtl = Math.max(0, e.attackFlashTtl - dt);
    }
    if (e.species === "bomber") {
      e.pulsePhase += dt;
    }
    if (e.burnTtl > 0) {
      dealDamage(state, e, e.burnDps * dt);
      e.burnTtl = Math.max(0, e.burnTtl - dt);
      if (!e.alive) continue;
    }
    if (e.freezeTtl > 0) {
      e.freezeTtl = Math.max(0, e.freezeTtl - dt);
      e.prevPos.x = e.pos.x;
      e.prevPos.y = e.pos.y;
      e.vel.x = 0;
      e.vel.y = 0;
      continue;
    }
    e.prevPos.x = e.pos.x;
    e.prevPos.y = e.pos.y;

    const dx = px - e.pos.x;
    const dy = py - e.pos.y;
    const len = Math.hypot(dx, dy);

    const effSpeed = e.speed * e.slowMultiplier;

    if (e.species === "caster") {
      updateCaster(state, e, dx, dy, len, effSpeed, dt);
    } else if (e.species === "brute") {
      updateBrute(state, e, len, effSpeed, dt);
    } else if (e.species === "boss_brute_lord") {
      updateBoss(state, e, len, effSpeed, dt);
    } else {
      let moving = true;
      if (e.species === "shooter" && len <= SHOOTER_RANGE) moving = false;

      if (moving && len > 0.0001) {
        const inv = 1 / len;
        e.vel.x = dx * inv * effSpeed;
        e.vel.y = dy * inv * effSpeed;
      } else {
        e.vel.x = 0;
        e.vel.y = 0;
      }

      e.pos.x += e.vel.x * dt;
      e.pos.y += e.vel.y * dt;
    }

    if (e.species === "bomber") {
      if (!e.armed && len <= BOMBER_ARM_RANGE) {
        e.armed = true;
        e.armedTimer = 0;
      }
      if (e.armed) e.armedTimer += dt;
    }

    if (e.shoveTimer > 0) {
      e.pos.x += e.shoveVelocity.x * dt;
      e.pos.y += e.shoveVelocity.y * dt;
      e.shoveTimer -= dt;
      if (e.shoveTimer <= 0) {
        e.shoveTimer = 0;
        e.shoveVelocity.x = 0;
        e.shoveVelocity.y = 0;
      }
    }
  }
}

function updateBrute(state: GameState, b: Brute, len: number, effSpeed: number, dt: number): void {
  if (b.slamPhase === "windup") {
    b.vel.x = 0;
    b.vel.y = 0;
    b.slamWindupTimer -= dt;
    if (b.slamWindupTimer <= 0) {
      const px = state.player.pos.x;
      const py = state.player.pos.y;
      const dx = b.pos.x - px;
      const dy = b.pos.y - py;
      if (dx * dx + dy * dy <= BRUTE_SLAM_RADIUS * BRUTE_SLAM_RADIUS) {
        damagePlayer(state, BRUTE_SLAM_DAMAGE, "brute_slam");
      }
      const explosion: Explosion = {
        pos: { x: b.pos.x, y: b.pos.y },
        radius: BRUTE_SLAM_RADIUS,
        ttl: BRUTE_SLAM_STRIKE_TTL,
        ttlMax: BRUTE_SLAM_STRIKE_TTL,
        innerColor: BRUTE_SLAM_STRIKE_INNER,
        outerColor: BRUTE_SLAM_STRIKE_OUTER,
        ringWidth: 5,
      };
      state.explosions.push(explosion);
      b.slamPhase = "ready";
      b.slamCooldown = BRUTE_SLAM_COOLDOWN;
    }
    return;
  }

  // ready: chase + tick cooldown + maybe trigger windup
  b.slamCooldown = Math.max(0, b.slamCooldown - dt);

  const dx = state.player.pos.x - b.pos.x;
  const dy = state.player.pos.y - b.pos.y;
  if (len > 0.0001) {
    const inv = 1 / len;
    b.vel.x = dx * inv * effSpeed;
    b.vel.y = dy * inv * effSpeed;
  } else {
    b.vel.x = 0;
    b.vel.y = 0;
  }
  b.pos.x += b.vel.x * dt;
  b.pos.y += b.vel.y * dt;

  if (b.slamCooldown <= 0 && len <= BRUTE_SLAM_RANGE) {
    b.slamPhase = "windup";
    b.slamWindupTimer = BRUTE_SLAM_WINDUP;
    b.vel.x = 0;
    b.vel.y = 0;
  }
}

function updateBoss(
  state: GameState,
  b: BossBruteLord,
  len: number,
  effSpeed: number,
  dt: number
): void {
  // Roar at 50% HP — spawn 2 brute minions next to the boss
  if (!b.hasRoared && b.maxHp > 0 && b.hp / b.maxHp <= BOSS_ROAR_HP_THRESHOLD) {
    b.hasRoared = true;
    const offset = b.radius + 24;
    state.enemies.push(makeBrute(state, b.pos.x - offset, b.pos.y));
    state.enemies.push(makeBrute(state, b.pos.x + offset, b.pos.y));
  }

  // Enrage at 25% HP — speed boost, faster slam, more contact damage
  if (!b.enraged && b.maxHp > 0 && b.hp / b.maxHp <= BOSS_ENRAGE_HP_THRESHOLD) {
    b.enraged = true;
    b.speed = b.baseSpeed * (1 + BOSS_ENRAGE_SPEED_BONUS);
    b.damage = b.baseDamage * BOSS_ENRAGE_DAMAGE_MULT;
  }

  if (b.slamPhase === "windup") {
    b.vel.x = 0;
    b.vel.y = 0;
    b.slamWindupTimer -= dt;
    if (b.slamWindupTimer <= 0) {
      const px = state.player.pos.x;
      const py = state.player.pos.y;
      const dx = b.pos.x - px;
      const dy = b.pos.y - py;
      if (dx * dx + dy * dy <= BOSS_SLAM_RADIUS * BOSS_SLAM_RADIUS) {
        damagePlayer(state, BOSS_SLAM_DAMAGE, "brute_slam");
      }
      const explosion: Explosion = {
        pos: { x: b.pos.x, y: b.pos.y },
        radius: BOSS_SLAM_RADIUS,
        ttl: BRUTE_SLAM_STRIKE_TTL,
        ttlMax: BRUTE_SLAM_STRIKE_TTL,
        innerColor: BRUTE_SLAM_STRIKE_INNER,
        outerColor: BOSS_SLAM_TELEGRAPH_RING,
        ringWidth: 7,
      };
      state.explosions.push(explosion);
      b.slamPhase = "ready";
      b.slamCooldown = b.enraged ? BOSS_ENRAGE_SLAM_COOLDOWN : BOSS_SLAM_COOLDOWN;
    }
    return;
  }

  b.slamCooldown = Math.max(0, b.slamCooldown - dt);

  const dx = state.player.pos.x - b.pos.x;
  const dy = state.player.pos.y - b.pos.y;
  // Use the boss's potentially-enraged speed (recompute effSpeed since speed may have changed)
  const moveSpeed = b.speed * b.slowMultiplier;
  if (len > 0.0001) {
    const inv = 1 / len;
    b.vel.x = dx * inv * moveSpeed;
    b.vel.y = dy * inv * moveSpeed;
  } else {
    b.vel.x = 0;
    b.vel.y = 0;
  }
  b.pos.x += b.vel.x * dt;
  b.pos.y += b.vel.y * dt;

  if (b.slamCooldown <= 0 && len <= BOSS_SLAM_RANGE) {
    b.slamPhase = "windup";
    b.slamWindupTimer = BOSS_SLAM_WINDUP;
    b.vel.x = 0;
    b.vel.y = 0;
  }
  void effSpeed;
}

function updateCaster(
  state: GameState,
  c: Caster,
  dx: number,
  dy: number,
  len: number,
  effSpeed: number,
  dt: number
): void {
  const px = state.player.pos.x;
  const py = state.player.pos.y;

  if (c.castPhase === "approach") {
    if (len > 0.0001) {
      const inv = 1 / len;
      c.vel.x = dx * inv * effSpeed;
      c.vel.y = dy * inv * effSpeed;
    } else {
      c.vel.x = 0;
      c.vel.y = 0;
    }
    c.pos.x += c.vel.x * dt;
    c.pos.y += c.vel.y * dt;

    if (len <= CASTER_RANGE) {
      c.castPhase = "channeling";
      c.castPhaseTimer = CASTER_CHANNEL_TIME;
      c.castTargetX = px;
      c.castTargetY = py;
    }
    return;
  }

  if (c.castPhase === "channeling") {
    c.vel.x = 0;
    c.vel.y = 0;
    c.castPhaseTimer -= dt;
    if (c.castPhaseTimer <= 0) {
      const tdx = c.castTargetX - px;
      const tdy = c.castTargetY - py;
      if (tdx * tdx + tdy * tdy <= CASTER_AOE_RADIUS * CASTER_AOE_RADIUS) {
        damagePlayer(state, CASTER_ATTACK_DAMAGE, "caster");
      }
      c.attackFlashTtl = CASTER_FLASH_DURATION;
      c.castPhase = "cooldown";
      c.castPhaseTimer = CASTER_COOLDOWN;
    }
    return;
  }

  // cooldown
  if (len > 0.0001) {
    const inv = 1 / len;
    const ux = dx * inv;
    const uy = dy * inv;
    let sign = 0;
    if (len < CASTER_RANGE - CASTER_KEEP_DISTANCE_TOLERANCE) sign = -1;
    else if (len > CASTER_RANGE + CASTER_KEEP_DISTANCE_TOLERANCE) sign = 1;
    c.vel.x = ux * effSpeed * sign;
    c.vel.y = uy * effSpeed * sign;
  } else {
    c.vel.x = 0;
    c.vel.y = 0;
  }
  c.pos.x += c.vel.x * dt;
  c.pos.y += c.vel.y * dt;

  c.castPhaseTimer -= dt;
  if (c.castPhaseTimer <= 0) {
    if (len <= CASTER_RANGE) {
      c.castPhase = "channeling";
      c.castPhaseTimer = CASTER_CHANNEL_TIME;
      c.castTargetX = px;
      c.castTargetY = py;
    } else {
      c.castPhase = "approach";
    }
  }
}
