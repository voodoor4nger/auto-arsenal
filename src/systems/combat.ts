import type { GameState } from "../game";
import {
  IRON_SKIN_STACK,
  PLAYER_IFRAME_DURATION,
  THORNS_STACK,
} from "../constants";

export function updateCombat(state: GameState, dt: number): void {
  const player = state.player;

  if (player.iframeRemaining > 0) {
    player.iframeRemaining = Math.max(0, player.iframeRemaining - dt);
  }

  if (player.iframeRemaining > 0) {
    consumeOverlappingShots(state);
    return;
  }

  for (const e of state.enemies) {
    if (!e.alive) continue;
    if (e.freezeTtl > 0) continue;
    const dx = e.pos.x - player.pos.x;
    const dy = e.pos.y - player.pos.y;
    const r = e.radius + player.radius;
    if (dx * dx + dy * dy <= r * r) {
      const reduction = Math.max(0, 1 - player.ironSkinStacks * IRON_SKIN_STACK);
      applyDamage(state, e.damage * reduction);

      if (player.thornsStacks > 0) {
        const reflect = e.damage * player.thornsStacks * THORNS_STACK;
        e.hp -= reflect;
        if (e.hp <= 0) e.alive = false;
      }
      return;
    }
  }

  for (const p of state.enemyProjectiles) {
    if (!p.alive) continue;
    const dx = p.pos.x - player.pos.x;
    const dy = p.pos.y - player.pos.y;
    const r = p.radius + player.radius;
    if (dx * dx + dy * dy <= r * r) {
      p.alive = false;
      const reduction = Math.max(0, 1 - player.ironSkinStacks * IRON_SKIN_STACK);
      applyDamage(state, p.damage * reduction);
      return;
    }
  }
}

function applyDamage(state: GameState, amount: number): void {
  const player = state.player;
  player.hp = Math.max(0, player.hp - amount);
  player.iframeRemaining = PLAYER_IFRAME_DURATION;
  if (player.hp <= 0) player.alive = false;
}

function consumeOverlappingShots(state: GameState): void {
  const player = state.player;
  for (const p of state.enemyProjectiles) {
    if (!p.alive) continue;
    const dx = p.pos.x - player.pos.x;
    const dy = p.pos.y - player.pos.y;
    const r = p.radius + player.radius;
    if (dx * dx + dy * dy <= r * r) p.alive = false;
  }
}
