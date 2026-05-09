import type { GameState } from "../game";
import type {
  Bomber,
  BossBruteLord,
  Brute,
  Caster,
  Chaser,
  Enemy,
  Shielded,
  Shooter,
} from "../types";
import {
  BOMBER_CONTACT_DAMAGE,
  BOMBER_HP_MULT,
  BOMBER_RADIUS_MULT,
  BOMBER_SPEED_MULT,
  BOSS_BRUTE_LORD_BASE_HP,
  BOSS_CONTACT_DAMAGE,
  BOSS_HP_SCALING,
  BOSS_RADIUS_MULT,
  BOSS_SLAM_COOLDOWN,
  BOSS_SPEED_MULT,
  BRUTE_CONTACT_DAMAGE,
  BRUTE_HP_MULT,
  BRUTE_RADIUS_MULT,
  BRUTE_SLAM_COOLDOWN,
  BRUTE_SPEED_MULT,
  CASTER_CONTACT_DAMAGE,
  CASTER_HP_MULT,
  CASTER_RADIUS_MULT,
  CASTER_SPEED_MULT,
  ENEMY_HP,
  ENEMY_RADIUS,
  ENEMY_SPEED,
  ENEMY_CONTACT_DAMAGE,
  SCALING,
  SHIELDED_CONTACT_DAMAGE,
  SHIELDED_HP_MULT,
  SHIELDED_RADIUS_MULT,
  SHIELDED_SHIELD_HP,
  SHIELDED_SPEED_MULT,
  SHOOTER_CONTACT_DAMAGE,
  SHOOTER_FIRE_INTERVAL,
  SHOOTER_HP_MULT,
  SHOOTER_RADIUS,
  SHOOTER_SPEED_MULT,
  SPAWN_OFFSCREEN_MARGIN,
  SPAWN_WEIGHTS_BY_MINUTE,
  type SpawnSpecies,
} from "../constants";

export function updateSpawn(state: GameState, dt: number): void {
  state.spawnTimer -= dt;
  if (state.spawnTimer > 0) return;

  const minutes = state.time / 60;
  const interval = currentSpawnInterval(minutes);
  const count = Math.round(currentSpawnCount(minutes));

  for (let i = 0; i < count; i++) {
    const species = pickSpawnSpecies(minutes);
    state.enemies.push(makeEdgeEnemy(state, species));
  }

  state.spawnTimer += interval;
  if (state.spawnTimer < 0) state.spawnTimer = interval;
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function clamp01(x: number): number {
  if (x < 0) return 0;
  if (x > 1) return 1;
  return x;
}

function currentSpawnCount(minutes: number): number {
  const cfg = SCALING.spawnCount;
  if (minutes <= cfg.kneeMinutes) {
    return lerp(cfg.startCount, cfg.midCount, clamp01(minutes / cfg.kneeMinutes));
  }
  return lerp(
    cfg.midCount,
    cfg.endCount,
    clamp01((minutes - cfg.kneeMinutes) / cfg.secondPhaseDurationMinutes)
  );
}

function currentSpawnInterval(minutes: number): number {
  const cfg = SCALING.spawnInterval;
  if (minutes <= cfg.kneeMinutes) {
    return lerp(cfg.startSeconds, cfg.kneeSeconds, clamp01(minutes / cfg.kneeMinutes));
  }
  return cfg.kneeSeconds;
}

function enemyHpMultiplier(minutes: number): number {
  const cfg = SCALING.enemyHp;
  if (minutes <= cfg.kneeMinutes) {
    return 1 + minutes * cfg.earlyRatePerMin;
  }
  const earlyScale = 1 + cfg.kneeMinutes * cfg.earlyRatePerMin;
  const lateScale = (minutes - cfg.kneeMinutes) * cfg.lateRatePerMin;
  return earlyScale + lateScale;
}

function enemySpeedMultiplier(minutes: number): number {
  const cfg = SCALING.enemySpeed;
  const cappedMinutes = Math.min(minutes, cfg.kneeMinutes);
  return 1 + cappedMinutes * cfg.earlyRatePerMin;
}

function pickSpawnSpecies(minutes: number): SpawnSpecies {
  const entry =
    SPAWN_WEIGHTS_BY_MINUTE.find((e) => minutes < e.untilMinute) ??
    SPAWN_WEIGHTS_BY_MINUTE[SPAWN_WEIGHTS_BY_MINUTE.length - 1];
  let total = 0;
  for (const [, w] of entry.weights) total += w;
  let r = Math.random() * total;
  for (const [species, w] of entry.weights) {
    r -= w;
    if (r <= 0) return species;
  }
  return entry.weights[0][0];
}

function makeEdgeEnemy(state: GameState, species: SpawnSpecies): Enemy {
  const { x, y } = randomEdgePosition(state);
  switch (species) {
    case "shooter":
      return makeShooter(state, x, y);
    case "brute":
      return makeBrute(state, x, y);
    case "bomber":
      return makeBomber(state, x, y);
    case "shielded":
      return makeShielded(state, x, y);
    case "caster":
      return makeCaster(state, x, y);
    case "basic":
    default:
      return makeChaser(state, x, y);
  }
}

function randomEdgePosition(state: GameState): { x: number; y: number } {
  const { width, height } = state.viewport;
  const margin = SPAWN_OFFSCREEN_MARGIN;
  const halfW = width / 2 + margin;
  const halfH = height / 2 + margin;

  const edge = Math.floor(Math.random() * 4);
  let lx = 0;
  let ly = 0;
  switch (edge) {
    case 0:
      lx = (Math.random() * 2 - 1) * halfW;
      ly = -halfH;
      break;
    case 1:
      lx = halfW;
      ly = (Math.random() * 2 - 1) * halfH;
      break;
    case 2:
      lx = (Math.random() * 2 - 1) * halfW;
      ly = halfH;
      break;
    default:
      lx = -halfW;
      ly = (Math.random() * 2 - 1) * halfH;
  }
  return { x: state.camera.pos.x + lx, y: state.camera.pos.y + ly };
}

function makeChaser(state: GameState, x: number, y: number): Chaser {
  const minutes = state.time / 60;
  const hp = Math.round(ENEMY_HP * enemyHpMultiplier(minutes));
  const speed = ENEMY_SPEED * enemySpeedMultiplier(minutes);
  return {
    kind: "enemy",
    species: "chaser",
    id: state.nextEntityId++,
    pos: { x, y },
    prevPos: { x, y },
    vel: { x: 0, y: 0 },
    radius: ENEMY_RADIUS,
    alive: true,
    hp,
    damage: ENEMY_CONTACT_DAMAGE,
    speed,
    critFlashTtl: 0,
    burnTtl: 0,
    burnDps: 0,
    dropsLoot: true,
    freezeTtl: 0,
    shoveVelocity: { x: 0, y: 0 },
    shoveTimer: 0,
    slowMultiplier: 1,
    slowTimer: 0,
    frostFlashTtl: 0,
  };
}

function makeShooter(state: GameState, x: number, y: number): Shooter {
  const minutes = state.time / 60;
  const baseHp = ENEMY_HP * SHOOTER_HP_MULT;
  const baseSpeed = ENEMY_SPEED * SHOOTER_SPEED_MULT;
  const hp = Math.round(baseHp * enemyHpMultiplier(minutes));
  const speed = baseSpeed * enemySpeedMultiplier(minutes);
  return {
    kind: "enemy",
    species: "shooter",
    id: state.nextEntityId++,
    pos: { x, y },
    prevPos: { x, y },
    vel: { x: 0, y: 0 },
    radius: SHOOTER_RADIUS,
    alive: true,
    hp,
    damage: SHOOTER_CONTACT_DAMAGE,
    speed,
    critFlashTtl: 0,
    burnTtl: 0,
    burnDps: 0,
    dropsLoot: true,
    freezeTtl: 0,
    shoveVelocity: { x: 0, y: 0 },
    shoveTimer: 0,
    slowMultiplier: 1,
    slowTimer: 0,
    frostFlashTtl: 0,
    fireCooldown: SHOOTER_FIRE_INTERVAL,
  };
}

export function makeBrute(state: GameState, x: number, y: number): Brute {
  const minutes = state.time / 60;
  const hp = Math.round(ENEMY_HP * BRUTE_HP_MULT * enemyHpMultiplier(minutes));
  const speed = ENEMY_SPEED * BRUTE_SPEED_MULT * enemySpeedMultiplier(minutes);
  return {
    kind: "enemy",
    species: "brute",
    id: state.nextEntityId++,
    pos: { x, y },
    prevPos: { x, y },
    vel: { x: 0, y: 0 },
    radius: ENEMY_RADIUS * BRUTE_RADIUS_MULT,
    alive: true,
    hp,
    damage: BRUTE_CONTACT_DAMAGE,
    speed,
    critFlashTtl: 0,
    burnTtl: 0,
    burnDps: 0,
    dropsLoot: true,
    freezeTtl: 0,
    shoveVelocity: { x: 0, y: 0 },
    shoveTimer: 0,
    slowMultiplier: 1,
    slowTimer: 0,
    frostFlashTtl: 0,
    slamCooldown: BRUTE_SLAM_COOLDOWN,
    slamPhase: "ready",
    slamWindupTimer: 0,
  };
}

function makeBomber(state: GameState, x: number, y: number): Bomber {
  const minutes = state.time / 60;
  const hp = Math.max(1, Math.round(ENEMY_HP * BOMBER_HP_MULT * enemyHpMultiplier(minutes)));
  const speed = ENEMY_SPEED * BOMBER_SPEED_MULT * enemySpeedMultiplier(minutes);
  return {
    kind: "enemy",
    species: "bomber",
    id: state.nextEntityId++,
    pos: { x, y },
    prevPos: { x, y },
    vel: { x: 0, y: 0 },
    radius: ENEMY_RADIUS * BOMBER_RADIUS_MULT,
    alive: true,
    hp,
    damage: BOMBER_CONTACT_DAMAGE,
    speed,
    critFlashTtl: 0,
    burnTtl: 0,
    burnDps: 0,
    dropsLoot: true,
    freezeTtl: 0,
    shoveVelocity: { x: 0, y: 0 },
    shoveTimer: 0,
    slowMultiplier: 1,
    slowTimer: 0,
    frostFlashTtl: 0,
    armed: false,
    armedTimer: 0,
    detonated: false,
    pulsePhase: 0,
  };
}

function makeShielded(state: GameState, x: number, y: number): Shielded {
  const minutes = state.time / 60;
  const hp = Math.round(ENEMY_HP * SHIELDED_HP_MULT * enemyHpMultiplier(minutes));
  const speed = ENEMY_SPEED * SHIELDED_SPEED_MULT * enemySpeedMultiplier(minutes);
  return {
    kind: "enemy",
    species: "shielded",
    id: state.nextEntityId++,
    pos: { x, y },
    prevPos: { x, y },
    vel: { x: 0, y: 0 },
    radius: ENEMY_RADIUS * SHIELDED_RADIUS_MULT,
    alive: true,
    hp,
    damage: SHIELDED_CONTACT_DAMAGE,
    speed,
    critFlashTtl: 0,
    burnTtl: 0,
    burnDps: 0,
    dropsLoot: true,
    freezeTtl: 0,
    shoveVelocity: { x: 0, y: 0 },
    shoveTimer: 0,
    slowMultiplier: 1,
    slowTimer: 0,
    frostFlashTtl: 0,
    shieldHp: SHIELDED_SHIELD_HP,
    shieldHpMax: SHIELDED_SHIELD_HP,
    shieldBreakTtl: 0,
  };
}

export function makeBossBruteLord(
  state: GameState,
  x: number,
  y: number,
  windowIndex: number
): BossBruteLord {
  const minutes = state.time / 60;
  const baseHp = Math.round(BOSS_BRUTE_LORD_BASE_HP * Math.pow(BOSS_HP_SCALING, windowIndex - 1));
  const hp = Math.round(baseHp * enemyHpMultiplier(minutes));
  const baseSpeed = ENEMY_SPEED * BOSS_SPEED_MULT * enemySpeedMultiplier(minutes);
  return {
    kind: "enemy",
    species: "boss_brute_lord",
    id: state.nextEntityId++,
    pos: { x, y },
    prevPos: { x, y },
    vel: { x: 0, y: 0 },
    radius: ENEMY_RADIUS * BOSS_RADIUS_MULT,
    alive: true,
    hp,
    damage: BOSS_CONTACT_DAMAGE,
    speed: baseSpeed,
    critFlashTtl: 0,
    burnTtl: 0,
    burnDps: 0,
    dropsLoot: true,
    freezeTtl: 0,
    shoveVelocity: { x: 0, y: 0 },
    shoveTimer: 0,
    slowMultiplier: 1,
    slowTimer: 0,
    frostFlashTtl: 0,
    maxHp: hp,
    windowIndex,
    slamCooldown: BOSS_SLAM_COOLDOWN,
    slamPhase: "ready",
    slamWindupTimer: 0,
    baseSpeed,
    baseDamage: BOSS_CONTACT_DAMAGE,
    hasRoared: false,
    enraged: false,
  };
}

function makeCaster(state: GameState, x: number, y: number): Caster {
  const minutes = state.time / 60;
  const hp = Math.round(ENEMY_HP * CASTER_HP_MULT * enemyHpMultiplier(minutes));
  const speed = ENEMY_SPEED * CASTER_SPEED_MULT * enemySpeedMultiplier(minutes);
  return {
    kind: "enemy",
    species: "caster",
    id: state.nextEntityId++,
    pos: { x, y },
    prevPos: { x, y },
    vel: { x: 0, y: 0 },
    radius: ENEMY_RADIUS * CASTER_RADIUS_MULT,
    alive: true,
    hp,
    damage: CASTER_CONTACT_DAMAGE,
    speed,
    critFlashTtl: 0,
    burnTtl: 0,
    burnDps: 0,
    dropsLoot: true,
    freezeTtl: 0,
    shoveVelocity: { x: 0, y: 0 },
    shoveTimer: 0,
    slowMultiplier: 1,
    slowTimer: 0,
    frostFlashTtl: 0,
    castPhase: "approach",
    castPhaseTimer: 0,
    castTargetX: 0,
    castTargetY: 0,
    attackFlashTtl: 0,
  };
}
