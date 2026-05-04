import type {
  Boomerang,
  Camera,
  Enemy,
  EnemyProjectile,
  Gem,
  LaserBeam,
  LightningBolt,
  Mine,
  Orb,
  Phase,
  Player,
  Projectile,
  Rocket,
} from "./types";
import {
  BG_COLOR,
  BUTTON_BG,
  BUTTON_BG_HOVER,
  BUTTON_BORDER,
  BUTTON_FONT,
  BUTTON_H,
  BUTTON_W,
  END_LOST_COLOR,
  END_STATS_FONT,
  END_TITLE_FONT,
  END_WON_COLOR,
  ENEMY_COLOR,
  GAME_TITLE,
  GEM_COLOR,
  GRID_COLOR,
  GRID_SIZE,
  GLOBAL_DAMAGE_MULT_DEFAULT,
  HUD_COLOR,
  HUD_FONT,
  LEVEL_XP_START,
  MODAL_BG,
  MODAL_CARD_BG,
  MODAL_CARD_BG_HOVER,
  MODAL_CARD_BORDER,
  MODAL_CARD_BORDER_HOVER,
  MODAL_DESC_FONT,
  MODAL_DESC_TEXT,
  MODAL_NAME_FONT,
  MODAL_TEXT,
  MODAL_TITLE_FONT,
  ORB_COLOR,
  PICKUP_RADIUS_DEFAULT,
  PICKUP_VIZ_COLOR,
  PICKUP_VIZ_DURATION,
  PLAYER_COLOR,
  PLAYER_FLASH_HZ,
  PLAYER_MAX_HP,
  PLAYER_RADIUS,
  PLAYER_SIZE,
  PLAYER_SPEED,
  REGEN_DEFAULT,
  XP_MULTIPLIER_DEFAULT,
  PROJECTILE_COLOR,
  PROJECTILE_RADIUS,
  RUN_DURATION,
  SHOOTER_COLOR,
  SHOOTER_PROJ_COLOR,
  SPAWN_INTERVAL_START,
  TITLE_FONT,
  WEAPONS,
  SCRAP_PER_KILL,
  SCRAP_PER_LEVEL,
  SCRAP_PER_SECOND,
  WIPE_SAVE_COLOR,
  WIPE_SAVE_FONT,
  WORKSHOP_BUY_BG,
  WORKSHOP_BUY_BG_DISABLED,
  WORKSHOP_BUY_BG_HOVER,
  WORKSHOP_BUY_H,
  WORKSHOP_BUY_TEXT,
  WORKSHOP_BUY_TEXT_DISABLED,
  WORKSHOP_BUY_W,
  WORKSHOP_CARD_GAP,
  WORKSHOP_CARD_H,
  WORKSHOP_CARD_W,
  WORKSHOP_COLS,
  WORKSHOP_DESC_FONT,
  WORKSHOP_NAME_FONT,
  WORKSHOP_SCRAP_COLOR,
  WORKSHOP_TITLE_FONT,
  WORKSHOP_VALUE_FONT,
  STARTER_WEAPON_IDS,
  STARTER_CARD_W,
  STARTER_CARD_H,
  STARTER_CARD_GAP,
  STARTER_COLS,
  STARTER_SELECT_BORDER,
  STARTER_LOCKED_BG,
  STARTER_LOCKED_TEXT,
  STARTER_TITLE_FONT,
  STARTER_NAME_FONT,
  STARTER_STATS_FONT,
  STARTER_LOCK_FONT,
  ACHIEVEMENTS_HEADER_FONT,
  ACHIEVEMENTS_ROW_FONT,
  ACHIEVEMENTS_DONE_COLOR,
  ACHIEVEMENTS_TODO_COLOR,
  UNLOCK_LINE_COLOR,
} from "./constants";
import { clearJustPressed, createInput, type InputState } from "./input";
import { updateCamera, updateMovement } from "./systems/movement";
import { updateSpawn } from "./systems/spawn";
import { updateEnemyAI } from "./systems/enemyAI";
import { updateCombat } from "./systems/combat";
import { updateWeapon } from "./systems/weapon";
import { updateProjectiles } from "./systems/projectile";
import { updateDeathDrops } from "./systems/deathDrops";
import { updateGems } from "./systems/gem";
import { updateEnemyShoot } from "./systems/enemyShoot";
import { updateEnemyProjectiles } from "./systems/enemyProjectile";
import { updateOrbs } from "./systems/orb";
import { updateRegen } from "./systems/regen";
import { updateBoomerangs } from "./systems/boomerang";
import { updateAura } from "./systems/aura";
import { updateLightning } from "./systems/lightning";
import { updateMines } from "./systems/mines";
import { updateLaser } from "./systems/laser";
import { updateMachineGun } from "./systems/mg";
import { updateRockets } from "./systems/rocket";
import {
  findAuraWeapon,
  findOrbWeapon,
  findProjectileWeapon,
  getOwnedWeaponDefs,
  projectileWeaponDef,
  WEAPON_DEFS,
  type WeaponDef,
} from "./weapons";
import { loadSave, type SaveData, wipeSave, writeSave } from "./save";
import {
  ACHIEVEMENT_DEFS,
  checkAchievements,
  getUnlockText,
  isWeaponUnlocked,
  type Achievement,
} from "./achievements";
import {
  applyUpgrades,
  getSalvageMultiplier,
  nextTierCost,
  UPGRADE_DEFS,
  type UpgradeDef,
} from "./upgrades";
import {
  getCardRects,
  getRerollButtonRect,
  handleLevelUpClick,
  maybeStartLevelUp,
} from "./systems/levelup";
import type { Mod } from "./mods";

export type GameState = {
  phase: Phase;
  time: number;
  nextEntityId: number;
  player: Player;
  enemies: Enemy[];
  projectiles: Projectile[];
  enemyProjectiles: EnemyProjectile[];
  gems: Gem[];
  orbs: Orb[];
  boomerangs: Boomerang[];
  mines: Mine[];
  lightningBolts: LightningBolt[];
  rockets: Rocket[];
  laserBeams: LaserBeam[];
  camera: Camera;
  input: InputState;
  viewport: { width: number; height: number };
  spawnTimer: number;
  pendingLevelUps: number;
  offer: Mod[] | null;
  killCount: number;
  pickupVizRemaining: number;
  glassCannonTaken: boolean;
  save: SaveData;
  scrapEarnedLastRun: number;
  unlocksThisRun: Achievement[];
  titleWipeRect: Rect | null;
};

export function initGame(viewport: { width: number; height: number }): GameState {
  const state: GameState = {
    phase: "title",
    time: 0,
    nextEntityId: 1,
    player: makeInitialPlayer(),
    enemies: [],
    projectiles: [],
    enemyProjectiles: [],
    gems: [],
    orbs: [],
    boomerangs: [],
    mines: [],
    lightningBolts: [],
    rockets: [],
    laserBeams: [],
    camera: { pos: { x: 0, y: 0 }, prevPos: { x: 0, y: 0 } },
    input: createInput(),
    viewport,
    spawnTimer: SPAWN_INTERVAL_START,
    pendingLevelUps: 0,
    offer: null,
    killCount: 0,
    pickupVizRemaining: 0,
    glassCannonTaken: false,
    save: loadSave(),
    scrapEarnedLastRun: 0,
    unlocksThisRun: [],
    titleWipeRect: null,
  };
  return state;
}

function makeInitialPlayer(): Player {
  return {
    kind: "player",
    id: 0,
    pos: { x: 0, y: 0 },
    prevPos: { x: 0, y: 0 },
    vel: { x: 0, y: 0 },
    radius: PLAYER_RADIUS,
    alive: true,
    hp: PLAYER_MAX_HP,
    maxHp: PLAYER_MAX_HP,
    moveSpeed: PLAYER_SPEED,
    pickupRadius: PICKUP_RADIUS_DEFAULT,
    regen: REGEN_DEFAULT,
    xpMultiplier: XP_MULTIPLIER_DEFAULT,
    iframeRemaining: 0,
    weapons: [projectileWeaponDef.create()],
    level: 1,
    xp: 0,
    xpToNext: LEVEL_XP_START,
    globalDamageMult: GLOBAL_DAMAGE_MULT_DEFAULT,
    rerollTokens: 0,
  };
}

function freshRun(state: GameState): void {
  state.time = 0;
  state.nextEntityId = 1;
  state.player = makeInitialPlayer();
  state.enemies = [];
  state.projectiles = [];
  state.enemyProjectiles = [];
  state.gems = [];
  state.orbs = [];
  state.boomerangs = [];
  state.mines = [];
  state.lightningBolts = [];
  state.rockets = [];
  state.laserBeams = [];
  state.camera = { pos: { x: 0, y: 0 }, prevPos: { x: 0, y: 0 } };
  state.spawnTimer = SPAWN_INTERVAL_START;
  state.pendingLevelUps = 0;
  state.offer = null;
  state.killCount = 0;
  state.pickupVizRemaining = 0;
  state.glassCannonTaken = false;
}

function findWeaponDefById(id: string): WeaponDef | undefined {
  return WEAPON_DEFS.find((d) => d.type === id);
}

function startNewRun(state: GameState): void {
  freshRun(state);
  const starter =
    findWeaponDefById(state.save.selectedStartingWeapon) ?? projectileWeaponDef;
  state.player.weapons = [starter.create()];
  applyUpgrades(state, state.save);
  state.scrapEarnedLastRun = 0;
  state.unlocksThisRun = [];
  state.phase = "playing";
}

function endRun(state: GameState, outcome: "won" | "lost"): void {
  const seconds = Math.min(state.time, RUN_DURATION);
  const base =
    state.killCount * SCRAP_PER_KILL +
    seconds * SCRAP_PER_SECOND +
    state.player.level * SCRAP_PER_LEVEL;
  const earned = Math.max(0, Math.floor(base * getSalvageMultiplier(state.save)));
  state.save.totalScrap += earned;
  state.scrapEarnedLastRun = earned;
  state.unlocksThisRun = checkAchievements(state);
  writeSave(state.save);
  state.phase = outcome;
}

export function updateGame(state: GameState, dt: number): void {
  switch (state.phase) {
    case "title":
      handleTitleClick(state);
      clearJustPressed(state.input);
      return;
    case "workshop":
      handleWorkshopClick(state);
      clearJustPressed(state.input);
      return;
    case "weapon-select":
      handleWeaponSelectClick(state);
      clearJustPressed(state.input);
      return;
    case "won":
    case "lost":
      handleEndScreenClick(state);
      clearJustPressed(state.input);
      return;
    case "levelup":
      handleLevelUpClick(state);
      clearJustPressed(state.input);
      return;
    case "playing":
      tickPlaying(state, dt);
      clearJustPressed(state.input);
      return;
  }
}

function tickPlaying(state: GameState, dt: number): void {
  state.time += dt;
  updateSpawn(state, dt);
  updateMovement(state, dt);
  updateEnemyAI(state, dt);
  updateEnemyShoot(state, dt);
  updateWeapon(state, dt);
  updateProjectiles(state, dt);
  updateEnemyProjectiles(state, dt);
  updateOrbs(state, dt);
  updateBoomerangs(state, dt);
  updateAura(state, dt);
  updateLightning(state, dt);
  updateMines(state, dt);
  updateLaser(state, dt);
  updateMachineGun(state, dt);
  updateRockets(state, dt);
  updateCombat(state, dt);
  updateRegen(state, dt);
  updateDeathDrops(state);
  updateGems(state, dt);
  updateCamera(state);
  pruneDead(state);

  if (state.player.hp <= 0) {
    endRun(state, "lost");
    return;
  }
  if (state.time >= RUN_DURATION) {
    state.time = RUN_DURATION;
    endRun(state, "won");
    return;
  }
  maybeStartLevelUp(state);
}

function handleEndScreenClick(state: GameState): void {
  if (!state.input.mouseClicked) return;
  const r = getPlayAgainRect(state);
  const m = state.input.mouse;
  if (m.x >= r.x && m.x <= r.x + r.w && m.y >= r.y && m.y <= r.y + r.h) {
    startNewRun(state);
  }
}

type Rect = { x: number; y: number; w: number; h: number };

function pointInRect(p: { x: number; y: number }, r: Rect): boolean {
  return p.x >= r.x && p.x <= r.x + r.w && p.y >= r.y && p.y <= r.y + r.h;
}

function getPlayAgainRect(state: GameState): Rect {
  const { width, height } = state.viewport;
  return {
    x: (width - BUTTON_W) / 2,
    y: height / 2 + 130,
    w: BUTTON_W,
    h: BUTTON_H,
  };
}

function getTitleStartRect(state: GameState): Rect {
  const { width, height } = state.viewport;
  return { x: (width - BUTTON_W) / 2, y: height / 2 + 40, w: BUTTON_W, h: BUTTON_H };
}

function getTitleWorkshopRect(state: GameState): Rect {
  const { width, height } = state.viewport;
  return { x: (width - BUTTON_W) / 2, y: height / 2 + 110, w: BUTTON_W, h: BUTTON_H };
}

function getWorkshopBackRect(state: GameState): Rect {
  const { width, height } = state.viewport;
  return {
    x: (width - BUTTON_W) / 2,
    y: height - BUTTON_H - 24,
    w: BUTTON_W,
    h: BUTTON_H,
  };
}

function getWorkshopCardRect(state: GameState, index: number): Rect {
  const totalRowW =
    WORKSHOP_COLS * WORKSHOP_CARD_W + (WORKSHOP_COLS - 1) * WORKSHOP_CARD_GAP;
  const rows = Math.ceil(UPGRADE_DEFS.length / WORKSHOP_COLS);
  const totalGridH = rows * WORKSHOP_CARD_H + (rows - 1) * WORKSHOP_CARD_GAP;
  const startX = (state.viewport.width - totalRowW) / 2;
  const startY = (state.viewport.height - totalGridH) / 2 - 20;
  const col = index % WORKSHOP_COLS;
  const row = Math.floor(index / WORKSHOP_COLS);
  return {
    x: startX + col * (WORKSHOP_CARD_W + WORKSHOP_CARD_GAP),
    y: startY + row * (WORKSHOP_CARD_H + WORKSHOP_CARD_GAP),
    w: WORKSHOP_CARD_W,
    h: WORKSHOP_CARD_H,
  };
}

function getWorkshopBuyRect(cardRect: Rect): Rect {
  return {
    x: cardRect.x + cardRect.w - WORKSHOP_BUY_W - 12,
    y: cardRect.y + cardRect.h - WORKSHOP_BUY_H - 12,
    w: WORKSHOP_BUY_W,
    h: WORKSHOP_BUY_H,
  };
}

function handleTitleClick(state: GameState): void {
  if (!state.input.mouseClicked) return;
  const m = state.input.mouse;

  if (pointInRect(m, getTitleStartRect(state))) {
    state.phase = "weapon-select";
    return;
  }
  if (pointInRect(m, getTitleWorkshopRect(state))) {
    state.phase = "workshop";
    return;
  }
  // Wipe Save uses canvas ctx, skip rect check here when ctx absent;
  // we re-test in render-loop free path via stored last-rect.
  if (state.titleWipeRect && pointInRect(m, state.titleWipeRect)) {
    if (window.confirm("Wipe save? This cannot be undone.")) {
      state.save = wipeSave();
    }
  }
}

function getStarterCardRect(state: GameState, index: number): Rect {
  const totalW = STARTER_COLS * STARTER_CARD_W + (STARTER_COLS - 1) * STARTER_CARD_GAP;
  const rows = Math.ceil(STARTER_WEAPON_IDS.length / STARTER_COLS);
  const totalH = rows * STARTER_CARD_H + (rows - 1) * STARTER_CARD_GAP;
  const startX = (state.viewport.width - totalW) / 2;
  const startY = (state.viewport.height - totalH) / 2 - 40;
  const col = index % STARTER_COLS;
  const row = Math.floor(index / STARTER_COLS);
  return {
    x: startX + col * (STARTER_CARD_W + STARTER_CARD_GAP),
    y: startY + row * (STARTER_CARD_H + STARTER_CARD_GAP),
    w: STARTER_CARD_W,
    h: STARTER_CARD_H,
  };
}

function getWeaponSelectStartRect(state: GameState): Rect {
  const totalW = 2 * BUTTON_W + 12;
  const startX = (state.viewport.width - totalW) / 2;
  return {
    x: startX + BUTTON_W + 12,
    y: state.viewport.height - BUTTON_H - 24,
    w: BUTTON_W,
    h: BUTTON_H,
  };
}

function getWeaponSelectBackRect(state: GameState): Rect {
  const totalW = 2 * BUTTON_W + 12;
  const startX = (state.viewport.width - totalW) / 2;
  return {
    x: startX,
    y: state.viewport.height - BUTTON_H - 24,
    w: BUTTON_W,
    h: BUTTON_H,
  };
}

function handleWeaponSelectClick(state: GameState): void {
  if (!state.input.mouseClicked) return;
  const m = state.input.mouse;

  if (pointInRect(m, getWeaponSelectBackRect(state))) {
    state.phase = "title";
    return;
  }

  if (pointInRect(m, getWeaponSelectStartRect(state))) {
    if (isWeaponUnlocked(state.save, state.save.selectedStartingWeapon)) {
      startNewRun(state);
    }
    return;
  }

  for (let i = 0; i < STARTER_WEAPON_IDS.length; i++) {
    const id = STARTER_WEAPON_IDS[i];
    if (!pointInRect(m, getStarterCardRect(state, i))) continue;
    if (!isWeaponUnlocked(state.save, id)) return;
    state.save.selectedStartingWeapon = id;
    writeSave(state.save);
    return;
  }
}

function handleWorkshopClick(state: GameState): void {
  if (!state.input.mouseClicked) return;
  const m = state.input.mouse;

  if (pointInRect(m, getWorkshopBackRect(state))) {
    state.phase = "title";
    return;
  }

  for (let i = 0; i < UPGRADE_DEFS.length; i++) {
    const def = UPGRADE_DEFS[i];
    const card = getWorkshopCardRect(state, i);
    const buy = getWorkshopBuyRect(card);
    if (!pointInRect(m, buy)) continue;
    const tier = state.save.upgrades[def.id] ?? 0;
    const cost = nextTierCost(def, tier);
    if (cost === null) return;
    if (state.save.totalScrap < cost) return;
    state.save.totalScrap -= cost;
    state.save.upgrades[def.id] = tier + 1;
    writeSave(state.save);
    return;
  }
}

function pruneDead(state: GameState): void {
  if (state.enemies.some((e) => !e.alive)) {
    state.enemies = state.enemies.filter((e) => e.alive);
  }
  if (state.projectiles.some((p) => !p.alive)) {
    state.projectiles = state.projectiles.filter((p) => p.alive);
  }
  if (state.enemyProjectiles.some((p) => !p.alive)) {
    state.enemyProjectiles = state.enemyProjectiles.filter((p) => p.alive);
  }
  if (state.gems.some((g) => !g.alive)) {
    state.gems = state.gems.filter((g) => g.alive);
  }
  if (state.boomerangs.some((b) => !b.alive)) {
    state.boomerangs = state.boomerangs.filter((b) => b.alive);
  }
  if (state.mines.some((m) => !m.alive)) {
    state.mines = state.mines.filter((m) => m.alive);
  }
  if (state.rockets.some((r) => !r.alive)) {
    state.rockets = state.rockets.filter((r) => r.alive);
  }
}

export function renderGame(
  ctx: CanvasRenderingContext2D,
  state: GameState,
  alpha: number
): void {
  const { width, height } = state.viewport;

  const camX =
    state.camera.prevPos.x + (state.camera.pos.x - state.camera.prevPos.x) * alpha;
  const camY =
    state.camera.prevPos.y + (state.camera.pos.y - state.camera.prevPos.y) * alpha;

  ctx.fillStyle = BG_COLOR;
  ctx.fillRect(0, 0, width, height);
  drawGrid(ctx, width, height, camX, camY);

  if (state.phase === "title") {
    drawTitle(ctx, state);
    return;
  }

  if (state.phase === "workshop") {
    drawWorkshop(ctx, state);
    return;
  }

  if (state.phase === "weapon-select") {
    drawWeaponSelect(ctx, state);
    return;
  }

  drawPickupViz(ctx, state, alpha, camX, camY);
  drawAura(ctx, state, alpha, camX, camY);
  drawMines(ctx, state, alpha, camX, camY);
  drawGems(ctx, state, alpha, camX, camY);
  drawEnemies(ctx, state, alpha, camX, camY);
  drawEnemyProjectiles(ctx, state, alpha, camX, camY);
  drawProjectiles(ctx, state, alpha, camX, camY);
  drawRockets(ctx, state, alpha, camX, camY);
  drawOrbs(ctx, state, alpha, camX, camY);
  drawBoomerangs(ctx, state, alpha, camX, camY);
  drawLightning(ctx, state, camX, camY);
  drawLaserBeams(ctx, state, camX, camY);
  drawPlayer(ctx, state, alpha, camX, camY);
  drawHud(ctx, state);

  if (state.phase === "levelup") drawLevelUpModal(ctx, state);
  else if (state.phase === "won") drawEndScreen(ctx, state, "won");
  else if (state.phase === "lost") drawEndScreen(ctx, state, "lost");
}

function drawGrid(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  camX: number,
  camY: number
): void {
  const halfW = width / 2;
  const halfH = height / 2;

  const offsetX = ((-camX % GRID_SIZE) + GRID_SIZE) % GRID_SIZE;
  const offsetY = ((-camY % GRID_SIZE) + GRID_SIZE) % GRID_SIZE;

  ctx.strokeStyle = GRID_COLOR;
  ctx.lineWidth = 1;
  ctx.beginPath();

  for (let x = (offsetX + halfW) % GRID_SIZE; x < width; x += GRID_SIZE) {
    const px = Math.round(x) + 0.5;
    ctx.moveTo(px, 0);
    ctx.lineTo(px, height);
  }
  for (let y = (offsetY + halfH) % GRID_SIZE; y < height; y += GRID_SIZE) {
    const py = Math.round(y) + 0.5;
    ctx.moveTo(0, py);
    ctx.lineTo(width, py);
  }

  ctx.stroke();
}

function drawPlayer(
  ctx: CanvasRenderingContext2D,
  state: GameState,
  alpha: number,
  camX: number,
  camY: number
): void {
  const { width, height } = state.viewport;
  const p = state.player;
  const px = p.prevPos.x + (p.pos.x - p.prevPos.x) * alpha;
  const py = p.prevPos.y + (p.pos.y - p.prevPos.y) * alpha;

  const sx = Math.round(width / 2 + (px - camX) - PLAYER_SIZE / 2);
  const sy = Math.round(height / 2 + (py - camY) - PLAYER_SIZE / 2);

  const flashing =
    p.iframeRemaining > 0 &&
    Math.floor(state.time * PLAYER_FLASH_HZ * 2) % 2 === 0;

  if (flashing) ctx.globalAlpha = 0.35;
  ctx.fillStyle = PLAYER_COLOR;
  ctx.fillRect(sx, sy, PLAYER_SIZE, PLAYER_SIZE);
  ctx.globalAlpha = 1;
}

function drawEnemies(
  ctx: CanvasRenderingContext2D,
  state: GameState,
  alpha: number,
  camX: number,
  camY: number
): void {
  const { width, height } = state.viewport;
  for (const e of state.enemies) {
    if (!e.alive) continue;
    const ex = e.prevPos.x + (e.pos.x - e.prevPos.x) * alpha;
    const ey = e.prevPos.y + (e.pos.y - e.prevPos.y) * alpha;
    const sx = width / 2 + (ex - camX);
    const sy = height / 2 + (ey - camY);
    ctx.fillStyle = e.species === "shooter" ? SHOOTER_COLOR : ENEMY_COLOR;
    ctx.beginPath();
    ctx.arc(sx, sy, e.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawEnemyProjectiles(
  ctx: CanvasRenderingContext2D,
  state: GameState,
  alpha: number,
  camX: number,
  camY: number
): void {
  const { width, height } = state.viewport;
  ctx.fillStyle = SHOOTER_PROJ_COLOR;
  for (const p of state.enemyProjectiles) {
    if (!p.alive) continue;
    const px = p.prevPos.x + (p.pos.x - p.prevPos.x) * alpha;
    const py = p.prevPos.y + (p.pos.y - p.prevPos.y) * alpha;
    const sx = width / 2 + (px - camX);
    const sy = height / 2 + (py - camY);
    ctx.beginPath();
    ctx.arc(sx, sy, p.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawProjectiles(
  ctx: CanvasRenderingContext2D,
  state: GameState,
  alpha: number,
  camX: number,
  camY: number
): void {
  const { width, height } = state.viewport;
  ctx.fillStyle = PROJECTILE_COLOR;
  for (const p of state.projectiles) {
    if (!p.alive) continue;
    const px = p.prevPos.x + (p.pos.x - p.prevPos.x) * alpha;
    const py = p.prevPos.y + (p.pos.y - p.prevPos.y) * alpha;
    const sx = width / 2 + (px - camX);
    const sy = height / 2 + (py - camY);
    ctx.beginPath();
    ctx.arc(sx, sy, PROJECTILE_RADIUS, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawOrbs(
  ctx: CanvasRenderingContext2D,
  state: GameState,
  alpha: number,
  camX: number,
  camY: number
): void {
  const { width, height } = state.viewport;
  ctx.fillStyle = ORB_COLOR;
  for (const orb of state.orbs) {
    const ox = orb.prevPos.x + (orb.pos.x - orb.prevPos.x) * alpha;
    const oy = orb.prevPos.y + (orb.pos.y - orb.prevPos.y) * alpha;
    const sx = width / 2 + (ox - camX);
    const sy = height / 2 + (oy - camY);
    ctx.beginPath();
    ctx.arc(sx, sy, orb.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawBoomerangs(
  ctx: CanvasRenderingContext2D,
  state: GameState,
  alpha: number,
  camX: number,
  camY: number
): void {
  const { width, height } = state.viewport;
  ctx.fillStyle = WEAPONS.BOOMERANG.COLOR;
  for (const b of state.boomerangs) {
    if (!b.alive) continue;
    const bx = b.prevPos.x + (b.pos.x - b.prevPos.x) * alpha;
    const by = b.prevPos.y + (b.pos.y - b.prevPos.y) * alpha;
    const sx = width / 2 + (bx - camX);
    const sy = height / 2 + (by - camY);
    const angle = state.time * 14;
    ctx.save();
    ctx.translate(sx, sy);
    ctx.rotate(angle);
    ctx.fillRect(-b.radius, -b.radius * 0.35, b.radius * 2, b.radius * 0.7);
    ctx.fillRect(-b.radius * 0.35, -b.radius, b.radius * 0.7, b.radius * 2);
    ctx.restore();
  }
}

function drawAura(
  ctx: CanvasRenderingContext2D,
  state: GameState,
  _alpha: number,
  camX: number,
  camY: number
): void {
  const w = findAuraWeapon(state);
  if (!w) return;
  const { width, height } = state.viewport;
  const p = state.player;
  const sx = width / 2 + (p.pos.x - camX);
  const sy = height / 2 + (p.pos.y - camY);

  const pulse = w.pulseTtl > 0 ? w.pulseTtl / WEAPONS.AURA.PULSE_DURATION : 0;
  const baseAlpha = 0.10;
  const pulseAlpha = 0.30 * pulse;

  const prev = ctx.globalAlpha;
  ctx.fillStyle = WEAPONS.AURA.COLOR;
  ctx.globalAlpha = baseAlpha + pulseAlpha;
  ctx.beginPath();
  ctx.arc(sx, sy, w.radius, 0, Math.PI * 2);
  ctx.fill();

  ctx.globalAlpha = 0.5 + 0.5 * pulse;
  ctx.lineWidth = 2;
  ctx.strokeStyle = WEAPONS.AURA.COLOR;
  ctx.beginPath();
  ctx.arc(sx, sy, w.radius, 0, Math.PI * 2);
  ctx.stroke();
  ctx.globalAlpha = prev;
}

function drawLightning(
  ctx: CanvasRenderingContext2D,
  state: GameState,
  camX: number,
  camY: number
): void {
  if (state.lightningBolts.length === 0) return;
  const { width, height } = state.viewport;
  const halfW = width / 2;
  const halfH = height / 2;

  ctx.strokeStyle = WEAPONS.LIGHTNING.COLOR;
  ctx.lineWidth = 3;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  const prev = ctx.globalAlpha;
  for (const b of state.lightningBolts) {
    const fade = b.ttl / b.ttlMax;
    if (fade <= 0) continue;
    ctx.globalAlpha = fade;
    ctx.beginPath();
    for (let i = 0; i < b.points.length; i++) {
      const p = b.points[i];
      const sx = halfW + (p.x - camX);
      const sy = halfH + (p.y - camY);
      if (i === 0) ctx.moveTo(sx, sy);
      else ctx.lineTo(sx, sy);
    }
    ctx.stroke();
  }
  ctx.globalAlpha = prev;
}

function drawLaserBeams(
  ctx: CanvasRenderingContext2D,
  state: GameState,
  camX: number,
  camY: number
): void {
  if (state.laserBeams.length === 0) return;
  const { width, height } = state.viewport;
  const halfW = width / 2;
  const halfH = height / 2;

  ctx.strokeStyle = WEAPONS.LASER.COLOR;
  ctx.lineWidth = WEAPONS.LASER.BEAM_WIDTH;
  ctx.lineCap = "round";

  const prev = ctx.globalAlpha;
  for (const b of state.laserBeams) {
    if (b.ttl <= 0) continue;
    ctx.globalAlpha = b.ttl / b.ttlMax;
    ctx.beginPath();
    ctx.moveTo(halfW + (b.start.x - camX), halfH + (b.start.y - camY));
    ctx.lineTo(halfW + (b.end.x - camX), halfH + (b.end.y - camY));
    ctx.stroke();
  }
  ctx.globalAlpha = prev;
}

function drawRockets(
  ctx: CanvasRenderingContext2D,
  state: GameState,
  alpha: number,
  camX: number,
  camY: number
): void {
  if (state.rockets.length === 0) return;
  const { width, height } = state.viewport;
  const halfW = width / 2;
  const halfH = height / 2;

  for (const r of state.rockets) {
    if (!r.alive) continue;
    const sx = halfW + (r.pos.x - camX);
    const sy = halfH + (r.pos.y - camY);

    if (r.exploded) {
      const t = 1 - r.explosionTtl / WEAPONS.ROCKET.EXPLOSION_TTL;
      const radius = r.explosionRadius * t;
      const prev = ctx.globalAlpha;
      ctx.globalAlpha = Math.max(0, r.explosionTtl / WEAPONS.ROCKET.EXPLOSION_TTL);
      ctx.fillStyle = WEAPONS.ROCKET.BLAST_COLOR;
      ctx.beginPath();
      ctx.arc(sx, sy, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = WEAPONS.ROCKET.COLOR;
      ctx.beginPath();
      ctx.arc(sx, sy, radius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.globalAlpha = prev;
      continue;
    }

    const px = r.prevPos.x + (r.pos.x - r.prevPos.x) * alpha;
    const py = r.prevPos.y + (r.pos.y - r.prevPos.y) * alpha;
    const ix = halfW + (px - camX);
    const iy = halfH + (py - camY);
    const tx = halfW + (r.prevPos.x - camX);
    const ty = halfH + (r.prevPos.y - camY);

    ctx.strokeStyle = WEAPONS.ROCKET.COLOR;
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(tx, ty);
    ctx.lineTo(ix, iy);
    ctx.stroke();

    ctx.fillStyle = WEAPONS.ROCKET.COLOR;
    ctx.beginPath();
    ctx.arc(ix, iy, r.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawMines(
  ctx: CanvasRenderingContext2D,
  state: GameState,
  _alpha: number,
  camX: number,
  camY: number
): void {
  if (state.mines.length === 0) return;
  const { width, height } = state.viewport;
  const halfW = width / 2;
  const halfH = height / 2;

  for (const m of state.mines) {
    if (!m.alive) continue;
    const sx = halfW + (m.pos.x - camX);
    const sy = halfH + (m.pos.y - camY);

    if (m.exploded) {
      const t = 1 - m.explosionTtl / WEAPONS.MINES.EXPLOSION_TTL;
      const radius = m.explosionRadius * t;
      const prev = ctx.globalAlpha;
      ctx.globalAlpha = Math.max(0, m.explosionTtl / WEAPONS.MINES.EXPLOSION_TTL);
      ctx.fillStyle = WEAPONS.MINES.COLOR_BLAST;
      ctx.beginPath();
      ctx.arc(sx, sy, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = WEAPONS.MINES.COLOR_ARMED;
      ctx.beginPath();
      ctx.arc(sx, sy, radius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.globalAlpha = prev;
      continue;
    }

    const armed = m.armTimer <= 0;
    ctx.fillStyle = armed ? WEAPONS.MINES.COLOR_ARMED : WEAPONS.MINES.COLOR_UNARMED;
    ctx.beginPath();
    ctx.arc(sx, sy, m.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawPickupViz(
  ctx: CanvasRenderingContext2D,
  state: GameState,
  alpha: number,
  camX: number,
  camY: number
): void {
  if (state.pickupVizRemaining <= 0) return;
  const { width, height } = state.viewport;
  const p = state.player;
  const px = p.prevPos.x + (p.pos.x - p.prevPos.x) * alpha;
  const py = p.prevPos.y + (p.pos.y - p.prevPos.y) * alpha;
  const sx = width / 2 + (px - camX);
  const sy = height / 2 + (py - camY);

  const fade = Math.max(0, Math.min(1, state.pickupVizRemaining / PICKUP_VIZ_DURATION));
  const prevAlpha = ctx.globalAlpha;
  ctx.globalAlpha = fade;
  ctx.strokeStyle = PICKUP_VIZ_COLOR;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(sx, sy, p.pickupRadius, 0, Math.PI * 2);
  ctx.stroke();
  ctx.globalAlpha = prevAlpha;
}

function drawGems(
  ctx: CanvasRenderingContext2D,
  state: GameState,
  alpha: number,
  camX: number,
  camY: number
): void {
  const { width, height } = state.viewport;
  ctx.fillStyle = GEM_COLOR;
  for (const g of state.gems) {
    if (!g.alive) continue;
    const gx = g.prevPos.x + (g.pos.x - g.prevPos.x) * alpha;
    const gy = g.prevPos.y + (g.pos.y - g.prevPos.y) * alpha;
    const sx = width / 2 + (gx - camX);
    const sy = height / 2 + (gy - camY);
    ctx.beginPath();
    ctx.arc(sx, sy, g.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawHud(ctx: CanvasRenderingContext2D, state: GameState): void {
  ctx.font = HUD_FONT;
  ctx.fillStyle = HUD_COLOR;
  ctx.textBaseline = "top";

  ctx.textAlign = "left";
  ctx.fillText(`HP ${state.player.hp}/${state.player.maxHp}`, 12, 12);
  ctx.fillText(
    `LV ${state.player.level}  XP ${state.player.xp}/${state.player.xpToNext}`,
    12,
    32
  );
  ctx.fillText(`DMG x${state.player.globalDamageMult.toFixed(2)}`, 12, 52);

  const remaining = Math.max(0, RUN_DURATION - state.time);
  ctx.textAlign = "center";
  ctx.fillText(formatTime(remaining), state.viewport.width / 2, 12);
  ctx.fillText(`Threat: ${Math.floor(state.time / 60)}`, state.viewport.width / 2, 32);

  drawWeaponStats(ctx, state);
  drawWeaponList(ctx, state);
}

function drawWeaponList(ctx: CanvasRenderingContext2D, state: GameState): void {
  const defs = getOwnedWeaponDefs(state);
  if (defs.length === 0) return;

  const SWATCH = 14;
  const GAP = 8;
  const ROW_H = 22;
  const PAD = 12;
  const rightX = state.viewport.width - PAD;
  const bottomY = state.viewport.height - PAD;

  ctx.font = HUD_FONT;
  ctx.textBaseline = "middle";
  ctx.textAlign = "left";

  const rows = defs.map((def) => {
    const w = state.player.weapons.find((x) => x.type === def.type)!;
    const text = `${def.name.padEnd(5)}  ${def.getStats(w)}`;
    return { def, text };
  });

  let maxTextW = 0;
  for (const r of rows) {
    const w = ctx.measureText(r.text).width;
    if (w > maxTextW) maxTextW = w;
  }
  const startX = rightX - SWATCH - GAP - maxTextW;

  for (let i = 0; i < rows.length; i++) {
    const rowY = bottomY - (rows.length - i) * ROW_H + ROW_H / 2;
    ctx.fillStyle = rows[i].def.color;
    ctx.fillRect(startX, rowY - SWATCH / 2, SWATCH, SWATCH);
    ctx.fillStyle = HUD_COLOR;
    ctx.fillText(rows[i].text, startX + SWATCH + GAP, rowY);
  }
}

function drawWeaponStats(ctx: CanvasRenderingContext2D, state: GameState): void {
  const lines: string[] = [];
  const proj = findProjectileWeapon(state);
  if (proj) {
    lines.push("PROJECTILE");
    lines.push(`  DMG    ${proj.damage.toFixed(1)}`);
    lines.push(`  RATE   ${proj.fireRate.toFixed(2)}`);
    lines.push(`  COUNT  ${proj.projectileCount}`);
    lines.push(`  PIERCE ${proj.pierce}`);
    lines.push(`  HOMING ${proj.homingStrength.toFixed(2)}`);
  }
  const orb = findOrbWeapon(state);
  if (orb) {
    if (lines.length > 0) lines.push("");
    lines.push("ORB");
    lines.push(`  DMG    ${orb.damage.toFixed(1)}`);
    lines.push(`  SPIN   ${orb.rotationSpeed.toFixed(2)}`);
    lines.push(`  COUNT  ${orb.orbCount}`);
  }

  ctx.font = HUD_FONT;
  ctx.fillStyle = HUD_COLOR;
  ctx.textAlign = "left";
  ctx.textBaseline = "bottom";
  const lineH = 18;
  const baseY = state.viewport.height - 12;
  for (let i = 0; i < lines.length; i++) {
    ctx.fillText(lines[i], 12, baseY - (lines.length - 1 - i) * lineH);
  }
}

function formatTime(seconds: number): string {
  const total = Math.ceil(seconds);
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function drawTitle(ctx: CanvasRenderingContext2D, state: GameState): void {
  const { width, height } = state.viewport;
  ctx.font = TITLE_FONT;
  ctx.fillStyle = MODAL_TEXT;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(GAME_TITLE, width / 2, height / 2 - 60);

  drawScrapHud(ctx, state);

  const m = state.input.mouse;
  drawButton(ctx, getTitleStartRect(state), "Start Run", m, false);
  drawButton(ctx, getTitleWorkshopRect(state), "Workshop", m, false);

  // Wipe Save debug link bottom-left
  ctx.font = WIPE_SAVE_FONT;
  const label = "Wipe Save";
  const w = ctx.measureText(label).width;
  const PAD = 12;
  const rect: Rect = { x: PAD, y: height - PAD - 14, w, h: 14 };
  state.titleWipeRect = rect;
  const hover = pointInRect(m, rect);
  ctx.fillStyle = hover ? MODAL_TEXT : WIPE_SAVE_COLOR;
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText(label, rect.x, rect.y);
}

function drawScrapHud(ctx: CanvasRenderingContext2D, state: GameState): void {
  ctx.font = HUD_FONT;
  ctx.fillStyle = WORKSHOP_SCRAP_COLOR;
  ctx.textAlign = "right";
  ctx.textBaseline = "top";
  ctx.fillText(`Scrap: ${state.save.totalScrap}`, state.viewport.width - 12, 12);
}

function drawButton(
  ctx: CanvasRenderingContext2D,
  rect: Rect,
  label: string,
  mouse: { x: number; y: number },
  disabled: boolean
): void {
  const hover = !disabled && pointInRect(mouse, rect);
  ctx.fillStyle = disabled
    ? WORKSHOP_BUY_BG_DISABLED
    : hover
    ? WORKSHOP_BUY_BG_HOVER
    : WORKSHOP_BUY_BG;
  ctx.fillRect(rect.x, rect.y, rect.w, rect.h);
  ctx.lineWidth = 2;
  ctx.strokeStyle = disabled ? MODAL_CARD_BORDER : MODAL_CARD_BORDER_HOVER;
  ctx.strokeRect(rect.x + 1, rect.y + 1, rect.w - 2, rect.h - 2);
  ctx.font = BUTTON_FONT;
  ctx.fillStyle = disabled ? WORKSHOP_BUY_TEXT_DISABLED : WORKSHOP_BUY_TEXT;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(label, rect.x + rect.w / 2, rect.y + rect.h / 2);
}

function drawWorkshop(ctx: CanvasRenderingContext2D, state: GameState): void {
  const { width } = state.viewport;

  ctx.font = WORKSHOP_TITLE_FONT;
  ctx.fillStyle = MODAL_TEXT;
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  ctx.fillText("WORKSHOP", width / 2, 24);

  drawScrapHud(ctx, state);
  drawAchievementsSection(ctx, state);

  for (let i = 0; i < UPGRADE_DEFS.length; i++) {
    drawUpgradeCard(ctx, state, UPGRADE_DEFS[i], i);
  }

  drawButton(ctx, getWorkshopBackRect(state), "Back", state.input.mouse, false);
}

function drawAchievementsSection(
  ctx: CanvasRenderingContext2D,
  state: GameState
): void {
  const { width } = state.viewport;
  const headerY = 72;
  ctx.font = ACHIEVEMENTS_HEADER_FONT;
  ctx.fillStyle = MODAL_TEXT;
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  ctx.fillText("Achievements", width / 2, headerY);

  ctx.font = ACHIEVEMENTS_ROW_FONT;
  ctx.textAlign = "left";
  const rowH = 20;
  let maxLineW = 0;
  const lines = ACHIEVEMENT_DEFS.map((a) => {
    const done = !!state.save.achievements[a.id];
    const mark = done ? "✓" : "·";
    const text = `${mark}  ${a.desc} — unlocks ${a.weaponName}`;
    return { text, done };
  });
  for (const l of lines) {
    const w = ctx.measureText(l.text).width;
    if (w > maxLineW) maxLineW = w;
  }
  const startX = (width - maxLineW) / 2;
  for (let i = 0; i < lines.length; i++) {
    ctx.fillStyle = lines[i].done ? ACHIEVEMENTS_DONE_COLOR : ACHIEVEMENTS_TODO_COLOR;
    ctx.fillText(lines[i].text, startX, headerY + 26 + i * rowH);
  }
}

function drawWeaponSelect(ctx: CanvasRenderingContext2D, state: GameState): void {
  const { width } = state.viewport;

  ctx.font = STARTER_TITLE_FONT;
  ctx.fillStyle = MODAL_TEXT;
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  ctx.fillText("Choose Starter", width / 2, 24);

  for (let i = 0; i < STARTER_WEAPON_IDS.length; i++) {
    drawStarterCard(ctx, state, i);
  }

  const selected = state.save.selectedStartingWeapon;
  const canStart = isWeaponUnlocked(state.save, selected);
  drawButton(ctx, getWeaponSelectBackRect(state), "Back", state.input.mouse, false);
  drawButton(
    ctx,
    getWeaponSelectStartRect(state),
    "Start Run",
    state.input.mouse,
    !canStart
  );
}

function drawStarterCard(
  ctx: CanvasRenderingContext2D,
  state: GameState,
  index: number
): void {
  const id = STARTER_WEAPON_IDS[index];
  const def = WEAPON_DEFS.find((d) => d.type === id);
  if (!def) return;
  const card = getStarterCardRect(state, index);
  const unlocked = isWeaponUnlocked(state.save, id);
  const selected = state.save.selectedStartingWeapon === id;

  ctx.fillStyle = unlocked ? MODAL_CARD_BG : STARTER_LOCKED_BG;
  ctx.fillRect(card.x, card.y, card.w, card.h);

  ctx.lineWidth = selected ? 3 : 2;
  ctx.strokeStyle = selected
    ? STARTER_SELECT_BORDER
    : unlocked
    ? MODAL_CARD_BORDER
    : MODAL_CARD_BORDER;
  ctx.strokeRect(card.x + 1, card.y + 1, card.w - 2, card.h - 2);

  // Icon
  const cx = card.x + card.w / 2;
  const iconY = card.y + 36;
  ctx.fillStyle = unlocked ? def.color : STARTER_LOCKED_TEXT;
  ctx.beginPath();
  ctx.arc(cx, iconY, 18, 0, Math.PI * 2);
  ctx.fill();

  // Name
  ctx.font = STARTER_NAME_FONT;
  ctx.fillStyle = unlocked ? MODAL_TEXT : STARTER_LOCKED_TEXT;
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  ctx.fillText(def.name, cx, card.y + 70);

  // Stats — built fresh from the def's create() snapshot so the screen
  // shows the unmodded baseline numbers, not whatever any active run had.
  ctx.font = STARTER_STATS_FONT;
  ctx.fillStyle = unlocked ? MODAL_DESC_TEXT : STARTER_LOCKED_TEXT;
  const blank = def.create();
  ctx.fillText(def.getStats(blank), cx, card.y + 100);

  // Status
  if (!unlocked) {
    ctx.font = STARTER_LOCK_FONT;
    ctx.fillStyle = STARTER_LOCKED_TEXT;
    ctx.fillText(`Locked — ${getUnlockText(id)}`, cx, card.y + card.h - 32);
  } else if (selected) {
    ctx.font = STARTER_LOCK_FONT;
    ctx.fillStyle = STARTER_SELECT_BORDER;
    ctx.fillText("SELECTED", cx, card.y + card.h - 28);
  } else {
    ctx.font = STARTER_LOCK_FONT;
    ctx.fillStyle = MODAL_DESC_TEXT;
    ctx.fillText("Click to select", cx, card.y + card.h - 28);
  }
}

function drawUpgradeCard(
  ctx: CanvasRenderingContext2D,
  state: GameState,
  def: UpgradeDef,
  index: number
): void {
  const card = getWorkshopCardRect(state, index);
  const tier = state.save.upgrades[def.id] ?? 0;
  const cost = nextTierCost(def, tier);
  const isMaxed = cost === null;
  const canAfford = !isMaxed && state.save.totalScrap >= cost!;

  ctx.fillStyle = MODAL_CARD_BG;
  ctx.fillRect(card.x, card.y, card.w, card.h);
  ctx.lineWidth = 2;
  ctx.strokeStyle = MODAL_CARD_BORDER;
  ctx.strokeRect(card.x + 1, card.y + 1, card.w - 2, card.h - 2);

  ctx.textAlign = "left";
  ctx.textBaseline = "top";

  ctx.font = WORKSHOP_NAME_FONT;
  ctx.fillStyle = MODAL_TEXT;
  ctx.fillText(def.name, card.x + 12, card.y + 12);

  ctx.font = WORKSHOP_DESC_FONT;
  ctx.fillStyle = MODAL_DESC_TEXT;
  ctx.fillText(def.desc, card.x + 12, card.y + 36);

  ctx.font = WORKSHOP_VALUE_FONT;
  ctx.fillStyle = MODAL_TEXT;
  ctx.fillText(`Tier ${tier}/${def.maxTier}`, card.x + 12, card.y + 70);

  ctx.fillStyle = WORKSHOP_SCRAP_COLOR;
  if (isMaxed) ctx.fillText("MAXED", card.x + 12, card.y + 92);
  else ctx.fillText(`Cost: ${cost}`, card.x + 12, card.y + 92);

  const buy = getWorkshopBuyRect(card);
  const buyLabel = isMaxed ? "MAX" : "Buy";
  drawButton(ctx, buy, buyLabel, state.input.mouse, isMaxed || !canAfford);
}

function drawLevelUpModal(ctx: CanvasRenderingContext2D, state: GameState): void {
  const offer = state.offer;
  if (!offer) return;
  const { width, height } = state.viewport;

  ctx.fillStyle = MODAL_BG;
  ctx.fillRect(0, 0, width, height);

  ctx.font = MODAL_TITLE_FONT;
  ctx.fillStyle = MODAL_TEXT;
  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";
  ctx.fillText(`LEVEL ${state.player.level}`, width / 2, height / 2 - 200);

  const rects = getCardRects(state);
  const mx = state.input.mouse.x;
  const my = state.input.mouse.y;

  for (let i = 0; i < offer.length; i++) {
    const r = rects[i];
    const hover = mx >= r.x && mx <= r.x + r.w && my >= r.y && my <= r.y + r.h;

    ctx.fillStyle = hover ? MODAL_CARD_BG_HOVER : MODAL_CARD_BG;
    ctx.fillRect(r.x, r.y, r.w, r.h);
    ctx.lineWidth = 2;
    ctx.strokeStyle = hover ? MODAL_CARD_BORDER_HOVER : MODAL_CARD_BORDER;
    ctx.strokeRect(r.x + 1, r.y + 1, r.w - 2, r.h - 2);

    const cx = r.x + r.w / 2;
    ctx.font = MODAL_NAME_FONT;
    ctx.fillStyle = MODAL_TEXT;
    ctx.fillText(offer[i].name, cx, r.y + 60);

    ctx.font = MODAL_DESC_FONT;
    ctx.fillStyle = MODAL_DESC_TEXT;
    ctx.fillText(offer[i].desc, cx, r.y + 100);
  }

  const reroll = getRerollButtonRect(state);
  if (reroll) {
    drawButton(
      ctx,
      reroll,
      `Reroll (${state.player.rerollTokens})`,
      state.input.mouse,
      false
    );
  }
}

function drawEndScreen(
  ctx: CanvasRenderingContext2D,
  state: GameState,
  outcome: "won" | "lost"
): void {
  const { width, height } = state.viewport;

  ctx.fillStyle = MODAL_BG;
  ctx.fillRect(0, 0, width, height);

  ctx.font = END_TITLE_FONT;
  ctx.fillStyle = outcome === "won" ? END_WON_COLOR : END_LOST_COLOR;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(outcome === "won" ? "SURVIVED" : "DEAD", width / 2, height / 2 - 80);

  ctx.font = END_STATS_FONT;
  ctx.fillStyle = MODAL_TEXT;
  const elapsed = Math.min(state.time, RUN_DURATION);
  ctx.fillText(
    `Time ${formatTime(elapsed)}   LV ${state.player.level}   Kills ${state.killCount}`,
    width / 2,
    height / 2
  );

  ctx.fillStyle = WORKSHOP_SCRAP_COLOR;
  ctx.fillText(
    `Earned ${state.scrapEarnedLastRun} scrap (${state.save.totalScrap} total)`,
    width / 2,
    height / 2 + 40
  );

  if (state.unlocksThisRun.length > 0) {
    ctx.fillStyle = UNLOCK_LINE_COLOR;
    for (let i = 0; i < state.unlocksThisRun.length; i++) {
      const a = state.unlocksThisRun[i];
      ctx.fillText(
        `UNLOCKED: ${a.weaponName} (${a.desc})`,
        width / 2,
        height / 2 + 75 + i * 28
      );
    }
  }

  const r = getPlayAgainRect(state);
  const mx = state.input.mouse.x;
  const my = state.input.mouse.y;
  const hover = mx >= r.x && mx <= r.x + r.w && my >= r.y && my <= r.y + r.h;
  ctx.fillStyle = hover ? BUTTON_BG_HOVER : BUTTON_BG;
  ctx.fillRect(r.x, r.y, r.w, r.h);
  ctx.lineWidth = 2;
  ctx.strokeStyle = BUTTON_BORDER;
  ctx.strokeRect(r.x + 1, r.y + 1, r.w - 2, r.h - 2);
  ctx.font = BUTTON_FONT;
  ctx.fillStyle = MODAL_TEXT;
  ctx.fillText("Play Again", r.x + r.w / 2, r.y + r.h / 2);
}
