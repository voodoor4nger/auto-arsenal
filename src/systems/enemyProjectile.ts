import type { GameState } from "../game";

export function updateEnemyProjectiles(state: GameState, dt: number): void {
  for (const p of state.enemyProjectiles) {
    if (!p.alive) continue;

    p.prevPos.x = p.pos.x;
    p.prevPos.y = p.pos.y;
    p.pos.x += p.vel.x * dt;
    p.pos.y += p.vel.y * dt;

    p.ttl -= dt;
    if (p.ttl <= 0) p.alive = false;
  }
}
