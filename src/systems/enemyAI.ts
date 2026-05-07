import type { GameState } from "../game";
import { SHOOTER_RANGE } from "../constants";
import { dealDamage } from "../damage";

export function updateEnemyAI(state: GameState, dt: number): void {
  const px = state.player.pos.x;
  const py = state.player.pos.y;

  for (const e of state.enemies) {
    if (!e.alive) continue;
    if (e.critFlashTtl > 0) e.critFlashTtl = Math.max(0, e.critFlashTtl - dt);
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

    let moving = true;
    if (e.species === "shooter" && len <= SHOOTER_RANGE) {
      moving = false;
    }

    if (moving && len > 0.0001) {
      const inv = 1 / len;
      e.vel.x = dx * inv * e.speed;
      e.vel.y = dy * inv * e.speed;
    } else {
      e.vel.x = 0;
      e.vel.y = 0;
    }

    e.pos.x += e.vel.x * dt;
    e.pos.y += e.vel.y * dt;

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
