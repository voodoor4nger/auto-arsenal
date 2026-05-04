import type { GameState } from "../game";

export function updateRegen(state: GameState, dt: number): void {
  const p = state.player;
  if (!p.alive) return;
  if (p.regen <= 0) return;
  if (p.hp >= p.maxHp) return;
  p.hp = Math.min(p.maxHp, p.hp + p.regen * dt);
}
