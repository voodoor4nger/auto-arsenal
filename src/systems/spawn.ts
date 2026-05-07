import type { GameState } from "../game";
import type { Chaser, Enemy, Shooter } from "../types";
import {
  ENEMY_HP,
  ENEMY_RADIUS,
  ENEMY_SPEED,
  ENEMY_CONTACT_DAMAGE,
  SCALING,
  SHOOTER_CONTACT_DAMAGE,
  SHOOTER_FIRE_INTERVAL,
  SHOOTER_HP_MULT,
  SHOOTER_RADIUS,
  SHOOTER_SPAWN_RAMP_DURATION,
  SHOOTER_SPAWN_WEIGHT_MAX,
  SHOOTER_SPEED_MULT,
  SPAWN_OFFSCREEN_MARGIN,
} from "../constants";

export function updateSpawn(state: GameState, dt: number): void {
  state.spawnTimer -= dt;
  if (state.spawnTimer > 0) return;

  const minutes = state.time / 60;
  const interval = currentSpawnInterval(minutes);
  const count = Math.round(currentSpawnCount(minutes));

  const shooterChance = shooterSpawnChance(state.time);

  for (let i = 0; i < count; i++) {
    state.enemies.push(makeEdgeEnemy(state, shooterChance));
  }

  state.spawnTimer += interval;
  if (state.spawnTimer < 0) state.spawnTimer = interval;
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function clamp01(x: number): number {
  if (x < 0) return 0;
  if (x > 1) return 1;
  return x;
}

function currentSpawnCount(minutes: number): number {
  const cfg = SCALING.spawnCount;
  if (minutes <= cfg.kneeMinutes) {
    return lerp(cfg.startCount, cfg.midCount, clamp01(minutes / cfg.kneeMinutes));
  }
  return lerp(
    cfg.midCount,
    cfg.endCount,
    clamp01((minutes - cfg.kneeMinutes) / cfg.secondPhaseDurationMinutes)
  );
}

function currentSpawnInterval(minutes: number): number {
  const cfg = SCALING.spawnInterval;
  if (minutes <= cfg.kneeMinutes) {
    return lerp(cfg.startSeconds, cfg.kneeSeconds, clamp01(minutes / cfg.kneeMinutes));
  }
  return cfg.kneeSeconds;
}

function enemyHpMultiplier(minutes: number): number {
  const cfg = SCALING.enemyHp;
  if (minutes <= cfg.kneeMinutes) {
    return 1 + minutes * cfg.earlyRatePerMin;
  }
  const earlyScale = 1 + cfg.kneeMinutes * cfg.earlyRatePerMin;
  const lateScale = (minutes - cfg.kneeMinutes) * cfg.lateRatePerMin;
  return earlyScale + lateScale;
}

function enemySpeedMultiplier(minutes: number): number {
  const cfg = SCALING.enemySpeed;
  const cappedMinutes = Math.min(minutes, cfg.kneeMinutes);
  return 1 + cappedMinutes * cfg.earlyRatePerMin;
}

function shooterSpawnChance(time: number): number {
  const ramp = Math.min(1, time / SHOOTER_SPAWN_RAMP_DURATION);
  return ramp * SHOOTER_SPAWN_WEIGHT_MAX;
}

function makeEdgeEnemy(state: GameState, shooterChance: number): Enemy {
  const { x, y } = randomEdgePosition(state);
  const isShooter = Math.random() < shooterChance;
  return isShooter ? makeShooter(state, x, y) : makeChaser(state, x, y);
}

function randomEdgePosition(state: GameState): { x: number; y: number } {
  const { width, height } = state.viewport;
  const margin = SPAWN_OFFSCREEN_MARGIN;
  const halfW = width / 2 + margin;
  const halfH = height / 2 + margin;

  const edge = Math.floor(Math.random() * 4);
  let lx = 0;
  let ly = 0;
  switch (edge) {
    case 0:
      lx = (Math.random() * 2 - 1) * halfW;
      ly = -halfH;
      break;
    case 1:
      lx = halfW;
      ly = (Math.random() * 2 - 1) * halfH;
      break;
    case 2:
      lx = (Math.random() * 2 - 1) * halfW;
      ly = halfH;
      break;
    default:
      lx = -halfW;
      ly = (Math.random() * 2 - 1) * halfH;
  }
  return { x: state.camera.pos.x + lx, y: state.camera.pos.y + ly };
}

function makeChaser(state: GameState, x: number, y: number): Chaser {
  const minutes = state.time / 60;
  const hp = Math.round(ENEMY_HP * enemyHpMultiplier(minutes));
  const speed = ENEMY_SPEED * enemySpeedMultiplier(minutes);
  return {
    kind: "enemy",
    species: "chaser",
    id: state.nextEntityId++,
    pos: { x, y },
    prevPos: { x, y },
    vel: { x: 0, y: 0 },
    radius: ENEMY_RADIUS,
    alive: true,
    hp,
    damage: ENEMY_CONTACT_DAMAGE,
    speed,
    critFlashTtl: 0,
    burnTtl: 0,
    burnDps: 0,
    dropsLoot: true,
    freezeTtl: 0,
  };
}

function makeShooter(state: GameState, x: number, y: number): Shooter {
  const minutes = state.time / 60;
  const baseHp = ENEMY_HP * SHOOTER_HP_MULT;
  const baseSpeed = ENEMY_SPEED * SHOOTER_SPEED_MULT;
  const hp = Math.round(baseHp * enemyHpMultiplier(minutes));
  const speed = baseSpeed * enemySpeedMultiplier(minutes);
  return {
    kind: "enemy",
    species: "shooter",
    id: state.nextEntityId++,
    pos: { x, y },
    prevPos: { x, y },
    vel: { x: 0, y: 0 },
    radius: SHOOTER_RADIUS,
    alive: true,
    hp,
    damage: SHOOTER_CONTACT_DAMAGE,
    speed,
    critFlashTtl: 0,
    burnTtl: 0,
    burnDps: 0,
    dropsLoot: true,
    freezeTtl: 0,
    fireCooldown: SHOOTER_FIRE_INTERVAL,
  };
}
