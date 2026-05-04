import type { GameState } from "../game";
import {
  GEM_PULL_SPEED_MAX,
  GEM_PULL_SPEED_MIN,
  GEM_SNAP_RADIUS,
  GLOBAL_DAMAGE_MULT_PER_LEVEL,
  LEVEL_XP_GROWTH,
  PICKUP_VIZ_DURATION,
  SCRAP_PER_LEVEL,
} from "../constants";

export function updateGems(state: GameState, dt: number): void {
  const player = state.player;
  const px = player.pos.x;
  const py = player.pos.y;
  const pickupR = player.pickupRadius;

  for (const g of state.gems) {
    if (!g.alive) continue;

    g.prevPos.x = g.pos.x;
    g.prevPos.y = g.pos.y;

    const dx = px - g.pos.x;
    const dy = py - g.pos.y;
    const d = Math.hypot(dx, dy);

    if (d <= GEM_SNAP_RADIUS) {
      grantXp(state, g.value * player.xpMultiplier);
      g.alive = false;
      state.pickupVizRemaining = PICKUP_VIZ_DURATION;
      continue;
    }

    if (d > pickupR) {
      g.vel.x = 0;
      g.vel.y = 0;
    } else {
      const t = 1 - d / pickupR;
      const speed = GEM_PULL_SPEED_MIN + (GEM_PULL_SPEED_MAX - GEM_PULL_SPEED_MIN) * t;
      const inv = 1 / d;
      g.vel.x = dx * inv * speed;
      g.vel.y = dy * inv * speed;
    }

    g.pos.x += g.vel.x * dt;
    g.pos.y += g.vel.y * dt;
  }

  if (state.pickupVizRemaining > 0) {
    state.pickupVizRemaining = Math.max(0, state.pickupVizRemaining - dt);
  }
}

function grantXp(state: GameState, amount: number): void {
  const p = state.player;
  p.xp += amount;
  while (p.xp >= p.xpToNext) {
    p.xp -= p.xpToNext;
    p.level += 1;
    p.xpToNext = Math.ceil(p.xpToNext * LEVEL_XP_GROWTH);
    p.globalDamageMult += GLOBAL_DAMAGE_MULT_PER_LEVEL;
    p.runScrap += SCRAP_PER_LEVEL;
    state.pendingLevelUps += 1;
  }
}
