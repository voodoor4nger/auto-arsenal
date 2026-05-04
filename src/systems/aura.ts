import type { GameState } from "../game";
import { WEAPONS } from "../constants";
import { findAuraWeapon } from "../weapons";
import { dealDamage } from "../damage";

export function updateAura(state: GameState, dt: number): void {
  const w = findAuraWeapon(state);
  if (!w) return;

  if (w.pulseTtl > 0) w.pulseTtl = Math.max(0, w.pulseTtl - dt);

  w.tickCooldown -= dt;
  if (w.tickCooldown > 0) return;

  const px = state.player.pos.x;
  const py = state.player.pos.y;
  const r2 = w.radius * w.radius;
  for (const e of state.enemies) {
    if (!e.alive) continue;
    const dx = e.pos.x - px;
    const dy = e.pos.y - py;
    if (dx * dx + dy * dy > r2) continue;
    dealDamage(state, e, w.damage);
  }

  w.tickCooldown += w.tickRate > 0 ? 1 / w.tickRate : 1;
  if (w.tickCooldown < 0) w.tickCooldown = 1 / w.tickRate;
  w.pulseTtl = WEAPONS.AURA.PULSE_DURATION;
}
