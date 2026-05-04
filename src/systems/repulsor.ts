import type { GameState } from "../game";
import { WEAPONS } from "../constants";
import { findRepulsorWeapon } from "../weapons";
import { dealDamage } from "../damage";

export function updateRepulsor(state: GameState, dt: number): void {
  const w = findRepulsorWeapon(state);
  if (!w) return;

  if (w.pulseVizTtl > 0) w.pulseVizTtl = Math.max(0, w.pulseVizTtl - dt);

  w.pulseCooldown -= dt;
  if (w.pulseCooldown > 0) return;

  const px = state.player.pos.x;
  const py = state.player.pos.y;
  const r2 = w.radius * w.radius;

  for (const e of state.enemies) {
    if (!e.alive) continue;
    const dx = e.pos.x - px;
    const dy = e.pos.y - py;
    const d2 = dx * dx + dy * dy;
    if (d2 > r2) continue;

    dealDamage(state, e, w.damage);
    if (!e.alive) continue;

    const d = Math.sqrt(d2);
    if (d < 0.0001) continue;
    const inv = 1 / d;
    e.pos.x += (dx * inv) * w.pushDistance;
    e.pos.y += (dy * inv) * w.pushDistance;
    e.prevPos.x = e.pos.x;
    e.prevPos.y = e.pos.y;
  }

  w.pulseVizRadius = w.radius;
  w.pulseVizTtl = WEAPONS.REPULSOR.VIZ_DURATION;
  w.pulseCooldown += w.pulseRate > 0 ? 1 / w.pulseRate : 1;
  if (w.pulseCooldown < 0) w.pulseCooldown = 1 / w.pulseRate;
}
