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

  if (player.iframeRemaining > 0 || player.dashIframeTimer > 0) {
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
      const source = e.species === "chaser" ? "basic" : e.species;
      damagePlayer(state, e.damage, source);

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
      damagePlayer(state, p.damage, p.source);
      return;
    }
  }
}

export function damagePlayer(
  state: GameState,
  amount: number,
  source: string
): boolean {
  const player = state.player;
  if (player.iframeRemaining > 0 || player.dashIframeTimer > 0) return false;
  const reduction = Math.max(0, 1 - player.ironSkinStacks * IRON_SKIN_STACK);
  const applied = amount * reduction;
  if (applied <= 0) return false;

  const actual = Math.min(applied, player.hp);
  state.totalDamageTaken += actual;
  state.damageBySource[source] = (state.damageBySource[source] ?? 0) + actual;
  state.frameDamageTaken[source] = (state.frameDamageTaken[source] ?? 0) + actual;

  player.hp = Math.max(0, player.hp - applied);
  player.iframeRemaining = PLAYER_IFRAME_DURATION;
  if (player.hp <= 0) {
    player.alive = false;
    if (state.causeOfDeath === null) state.causeOfDeath = source;
  }
  return true;
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
