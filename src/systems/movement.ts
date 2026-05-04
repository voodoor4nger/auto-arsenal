import type { GameState } from "../game";
import { getMoveAxis } from "../input";

export function updateMovement(state: GameState, dt: number): void {
  const axis = getMoveAxis(state.input);
  const player = state.player;

  player.prevPos.x = player.pos.x;
  player.prevPos.y = player.pos.y;

  player.vel.x = axis.x * player.moveSpeed;
  player.vel.y = axis.y * player.moveSpeed;

  player.pos.x += player.vel.x * dt;
  player.pos.y += player.vel.y * dt;
}

export function updateCamera(state: GameState): void {
  state.camera.prevPos.x = state.camera.pos.x;
  state.camera.prevPos.y = state.camera.pos.y;
  state.camera.pos.x = state.player.pos.x;
  state.camera.pos.y = state.player.pos.y;
}
