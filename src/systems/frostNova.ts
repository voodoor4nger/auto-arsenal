import type { GameState } from "../game";
import type { Enemy, FrostNovaWeapon } from "../types";
import { EVOLUTIONS, WEAPONS } from "../constants";
import { findFrostNovaWeapon } from "../weapons";
import { dealDamage } from "../damage";

export function updateFrostNova(state: GameState, dt: number): void {
  const w = findFrostNovaWeapon(state);
  if (!w) return;

  if (w.pulseVizTtl > 0) w.pulseVizTtl = Math.max(0, w.pulseVizTtl - dt);

  w.pulseCooldown -= dt;
  if (w.pulseCooldown > 0) return;

  emitPulse(state, w);

  w.pulseCooldown += w.pulseRate > 0 ? 1 / w.pulseRate : 1;
  if (w.pulseCooldown < 0) w.pulseCooldown = 1 / w.pulseRate;
}

function emitPulse(state: GameState, w: FrostNovaWeapon): void {
  const px = state.player.pos.x;
  const py = state.player.pos.y;
  const r2 = w.radius * w.radius;

  for (const e of state.enemies) {
    if (!e.alive) continue;
    const dx = e.pos.x - px;
    const dy = e.pos.y - py;
    if (dx * dx + dy * dy > r2) continue;

    dealDamage(state, e, w.damage);
    if (!e.alive) continue;

    applySlow(e, w.slowAmount, w.slowDuration);
    e.frostFlashTtl = WEAPONS.FROST_NOVA.FROST_FLASH_DURATION;

    if (w.evolved && (e.species === "brute" || e.species === "caster")) {
      if (e.freezeTtl < EVOLUTIONS.FROST_NOVA.STUN_DURATION) {
        e.freezeTtl = EVOLUTIONS.FROST_NOVA.STUN_DURATION;
      }
    }
  }

  w.pulseVizTtl = WEAPONS.FROST_NOVA.PULSE_VIZ_DURATION;
  w.pulseVizRadius = w.radius;
}

export function applySlow(e: Enemy, multiplier: number, duration: number): void {
  if (e.slowTimer <= 0 || multiplier < e.slowMultiplier) {
    e.slowMultiplier = multiplier;
  }
  if (duration > e.slowTimer) {
    e.slowTimer = duration;
  }
}
