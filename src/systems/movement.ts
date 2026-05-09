import type { GameState } from "../game";
import type { DashAfterimage, DashFlash } from "../types";
import {
  DASH_AFTERIMAGE_BASE_ALPHA,
  DASH_AFTERIMAGE_INTERVAL,
  DASH_AFTERIMAGE_TTL,
  DASH_DISTANCE,
  DASH_DURATION,
  DASH_FLASH_TTL,
  DASH_IFRAME_DURATION,
} from "../constants";
import { getMoveAxis } from "../input";

export function updateMovement(state: GameState, dt: number): void {
  const axis = getMoveAxis(state.input);
  const player = state.player;

  player.prevPos.x = player.pos.x;
  player.prevPos.y = player.pos.y;

  if (player.dashActiveTimer > 0) {
    advanceDashSlide(state, dt);
  } else {
    player.vel.x = axis.x * player.moveSpeed;
    player.vel.y = axis.y * player.moveSpeed;

    if (axis.x !== 0 || axis.y !== 0) {
      player.lastMovementDirection.x = axis.x;
      player.lastMovementDirection.y = axis.y;
    }

    player.pos.x += player.vel.x * dt;
    player.pos.y += player.vel.y * dt;
  }

  if (player.dashCooldown > 0) {
    player.dashCooldown = Math.max(0, player.dashCooldown - dt);
  }
  if (player.dashIframeTimer > 0) {
    player.dashIframeTimer = Math.max(0, player.dashIframeTimer - dt);
  }

  if (
    state.input.justPressed.has("Space") &&
    player.dashCooldown <= 0 &&
    player.dashActiveTimer <= 0
  ) {
    triggerDash(state, axis);
  }

  decayDashEffects(state, dt);
}

function advanceDashSlide(state: GameState, dt: number): void {
  const player = state.player;
  player.dashActiveTimer = Math.max(0, player.dashActiveTimer - dt);
  player.vel.x = 0;
  player.vel.y = 0;

  if (player.dashActiveTimer <= 0) {
    player.pos.x = player.dashEndPos.x;
    player.pos.y = player.dashEndPos.y;
    spawnDashFlash(state, player.dashEndPos.x, player.dashEndPos.y);
    return;
  }

  const progress = 1 - player.dashActiveTimer / DASH_DURATION;
  const eased = 1 - (1 - progress) * (1 - progress);
  player.pos.x =
    player.dashStartPos.x +
    (player.dashEndPos.x - player.dashStartPos.x) * eased;
  player.pos.y =
    player.dashStartPos.y +
    (player.dashEndPos.y - player.dashStartPos.y) * eased;

  player.dashAfterimageTimer -= dt;
  if (player.dashAfterimageTimer <= 0) {
    const ghost: DashAfterimage = {
      pos: { x: player.pos.x, y: player.pos.y },
      ttl: DASH_AFTERIMAGE_TTL,
      ttlMax: DASH_AFTERIMAGE_TTL,
      baseAlpha: DASH_AFTERIMAGE_BASE_ALPHA,
    };
    state.dashAfterimages.push(ghost);
    player.dashAfterimageTimer += DASH_AFTERIMAGE_INTERVAL;
    if (player.dashAfterimageTimer < 0) {
      player.dashAfterimageTimer = DASH_AFTERIMAGE_INTERVAL;
    }
  }
}

function triggerDash(state: GameState, axis: { x: number; y: number }): void {
  const player = state.player;
  let dx = axis.x;
  let dy = axis.y;
  if (dx === 0 && dy === 0) {
    dx = player.lastMovementDirection.x;
    dy = player.lastMovementDirection.y;
  }
  if (dx === 0 && dy === 0) {
    dy = -1;
  }
  const len = Math.hypot(dx, dy) || 1;
  const ux = dx / len;
  const uy = dy / len;

  player.dashStartPos.x = player.pos.x;
  player.dashStartPos.y = player.pos.y;
  player.dashEndPos.x = player.pos.x + ux * DASH_DISTANCE;
  player.dashEndPos.y = player.pos.y + uy * DASH_DISTANCE;
  player.dashActiveTimer = DASH_DURATION;
  player.dashAfterimageTimer = 0;
  player.dashIframeTimer = DASH_IFRAME_DURATION;
  player.dashCooldown = player.dashCooldownMax;

  spawnDashFlash(state, player.dashStartPos.x, player.dashStartPos.y);
}

function spawnDashFlash(state: GameState, x: number, y: number): void {
  const flash: DashFlash = {
    pos: { x, y },
    ttl: DASH_FLASH_TTL,
    ttlMax: DASH_FLASH_TTL,
  };
  state.dashFlashes.push(flash);
}

function decayDashEffects(state: GameState, dt: number): void {
  if (state.dashAfterimages.length > 0) {
    for (const a of state.dashAfterimages) a.ttl -= dt;
    if (state.dashAfterimages.some((a) => a.ttl <= 0)) {
      state.dashAfterimages = state.dashAfterimages.filter((a) => a.ttl > 0);
    }
  }
  if (state.dashFlashes.length > 0) {
    for (const f of state.dashFlashes) f.ttl -= dt;
    if (state.dashFlashes.some((f) => f.ttl <= 0)) {
      state.dashFlashes = state.dashFlashes.filter((f) => f.ttl > 0);
    }
  }
}

export function updateCamera(state: GameState): void {
  state.camera.prevPos.x = state.camera.pos.x;
  state.camera.prevPos.y = state.camera.pos.y;
  state.camera.pos.x = state.player.pos.x;
  state.camera.pos.y = state.player.pos.y;
}
