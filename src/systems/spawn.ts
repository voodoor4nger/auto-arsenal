import type { GameState } from "../game";
import type { Chaser, Enemy, Shooter } from "../types";
import {
  ENEMY_HP,
  ENEMY_HP_SCALE_PER_MIN,
  ENEMY_RADIUS,
  ENEMY_SPEED,
  ENEMY_SPEED_SCALE_PER_MIN,
  ENEMY_CONTACT_DAMAGE,
  SHOOTER_CONTACT_DAMAGE,
  SHOOTER_FIRE_INTERVAL,
  SHOOTER_HP_MULT,
  SHOOTER_RADIUS,
  SHOOTER_SPAWN_RAMP_DURATION,
  SHOOTER_SPAWN_WEIGHT_MAX,
  SHOOTER_SPEED_MULT,
  SPAWN_COUNT_END,
  SPAWN_COUNT_START,
  SPAWN_INTERVAL_END,
  SPAWN_INTERVAL_START,
  SPAWN_OFFSCREEN_MARGIN,
  SPAWN_RAMP_DURATION,
} from "../constants";

export function updateSpawn(state: GameState, dt: number): void {
  state.spawnTimer -= dt;
  if (state.spawnTimer > 0) return;

  const t = Math.min(1, state.time / SPAWN_RAMP_DURATION);
  const interval = lerp(SPAWN_INTERVAL_START, SPAWN_INTERVAL_END, t);
  const count = Math.round(lerp(SPAWN_COUNT_START, SPAWN_COUNT_END, t));

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
  const hp = Math.round(ENEMY_HP * (1 + minutes * ENEMY_HP_SCALE_PER_MIN));
  const speed = ENEMY_SPEED * (1 + minutes * ENEMY_SPEED_SCALE_PER_MIN);
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
  };
}

function makeShooter(state: GameState, x: number, y: number): Shooter {
  const minutes = state.time / 60;
  const baseHp = ENEMY_HP * SHOOTER_HP_MULT;
  const baseSpeed = ENEMY_SPEED * SHOOTER_SPEED_MULT;
  const hp = Math.round(baseHp * (1 + minutes * ENEMY_HP_SCALE_PER_MIN));
  const speed = baseSpeed * (1 + minutes * ENEMY_SPEED_SCALE_PER_MIN);
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
    fireCooldown: SHOOTER_FIRE_INTERVAL,
  };
}
