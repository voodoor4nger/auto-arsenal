import type { GameState } from "../game";
import type { ClusterBomb, Enemy, Projectile } from "../types";
import { WEAPONS } from "../constants";
import { findClusterBombWeapon } from "../weapons";
import { dealDamage } from "../damage";

export function updateClusterBombs(state: GameState, dt: number): void {
  const w = findClusterBombWeapon(state);
  if (w) {
    if (w.cooldownRemaining > 0) {
      w.cooldownRemaining = Math.max(0, w.cooldownRemaining - dt);
    } else if (w.fireRate > 0) {
      const target = nearestEnemy(state);
      if (target) {
        spawnBomb(state, w, target);
        w.cooldownRemaining = 1 / w.fireRate;
      }
    }
  } else if (state.clusterBombs.length === 0) {
    return;
  }

  for (const b of state.clusterBombs) {
    if (!b.alive) continue;

    b.prevPos.x = b.pos.x;
    b.prevPos.y = b.pos.y;
    b.pos.x += b.vel.x * dt;
    b.pos.y += b.vel.y * dt;

    b.ttl -= dt;
    if (b.ttl <= 0) {
      detonate(state, b, null);
      continue;
    }

    const hit = firstEnemyOverlap(state, b);
    if (hit) detonate(state, b, hit);
  }
}

function detonate(state: GameState, b: ClusterBomb, hit: Enemy | null): void {
  if (hit) dealDamage(state, hit, b.impactDamage);
  spawnFragments(state, b);
  b.alive = false;
}

function spawnFragments(state: GameState, b: ClusterBomb): void {
  const n = Math.max(1, b.fragmentCount);
  for (let i = 0; i < n; i++) {
    const angle = (Math.PI * 2 * i) / n;
    const vx = Math.cos(angle) * b.fragmentSpeed;
    const vy = Math.sin(angle) * b.fragmentSpeed;
    const proj: Projectile = {
      kind: "projectile",
      id: state.nextEntityId++,
      pos: { x: b.pos.x, y: b.pos.y },
      prevPos: { x: b.pos.x, y: b.pos.y },
      vel: { x: vx, y: vy },
      radius: WEAPONS.CLUSTER.FRAGMENT_RADIUS,
      alive: true,
      damage: b.fragmentDamage,
      ttl: b.fragmentLifetime,
      pierceRemaining: 0,
      hitIds: [],
      homingStrength: 0,
    };
    state.projectiles.push(proj);
  }
}

function spawnBomb(
  state: GameState,
  w: { impactDamage: number; fragmentDamage: number; fragmentCount: number },
  target: Enemy
): void {
  const px = state.player.pos.x;
  const py = state.player.pos.y;
  const dx = target.pos.x - px;
  const dy = target.pos.y - py;
  const len = Math.hypot(dx, dy) || 1;
  state.clusterBombs.push({
    kind: "clusterBomb",
    id: state.nextEntityId++,
    pos: { x: px, y: py },
    prevPos: { x: px, y: py },
    vel: {
      x: (dx / len) * WEAPONS.CLUSTER.PROJECTILE_SPEED,
      y: (dy / len) * WEAPONS.CLUSTER.PROJECTILE_SPEED,
    },
    radius: WEAPONS.CLUSTER.BOMB_RADIUS,
    alive: true,
    impactDamage: w.impactDamage,
    fragmentDamage: w.fragmentDamage,
    fragmentCount: w.fragmentCount,
    fragmentSpeed: WEAPONS.CLUSTER.FRAGMENT_SPEED,
    fragmentLifetime: WEAPONS.CLUSTER.FRAGMENT_LIFETIME,
    ttl: WEAPONS.CLUSTER.BOMB_LIFETIME,
  });
}

function firstEnemyOverlap(state: GameState, b: ClusterBomb): Enemy | null {
  for (const e of state.enemies) {
    if (!e.alive) continue;
    const dx = e.pos.x - b.pos.x;
    const dy = e.pos.y - b.pos.y;
    const r = e.radius + b.radius;
    if (dx * dx + dy * dy <= r * r) return e;
  }
  return null;
}

function nearestEnemy(state: GameState): Enemy | null {
  const px = state.player.pos.x;
  const py = state.player.pos.y;
  let best: Enemy | null = null;
  let bestD2 = Infinity;
  for (const e of state.enemies) {
    if (!e.alive) continue;
    const dx = e.pos.x - px;
    const dy = e.pos.y - py;
    const d2 = dx * dx + dy * dy;
    if (d2 < bestD2) {
      best = e;
      bestD2 = d2;
    }
  }
  return best;
}
