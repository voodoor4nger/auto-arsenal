import type {
  BestMoment,
  Boomerang,
  Camera,
  ClusterBomb,
  DamageTakenSample,
  DashAfterimage,
  DashFlash,
  Drone,
  Enemy,
  EnemyProjectile,
  Explosion,
  ExtractionZone,
  FloatingText,
  Gem,
  GravityWell,
  LaserBeam,
  LightningBolt,
  Mine,
  Orb,
  Phase,
  PlasmaField,
  Pickup,
  Player,
  Projectile,
  RicochetProjectile,
  RicochetSpark,
  Rocket,
  WorstMoment,
} from "./types";
import {
  BG_COLOR,
  BUTTON_FONT,
  BUTTON_H,
  BUTTON_W,
  END_LOST_COLOR,
  END_STATS_FONT,
  END_TITLE_FONT,
  END_WON_COLOR,
  ENEMY_COLOR,
  GAME_TITLE,
  GRID_COLOR,
  GRID_SIZE,
  GLOBAL_DAMAGE_MULT_DEFAULT,
  GEM_COLOR,
  HUD_COLOR,
  HUD_FONT,
  LEVEL_XP_START,
  LEVELUP_OFFER_COUNT,
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
  PICKUP_RENDER_SIZE,
  PICKUP_BOB_AMPLITUDE,
  SCRAP_BAG_VALUE_MIN,
  SCRAP_BAG_TIER_MEDIUM_THRESHOLD,
  SCRAP_BAG_TIER_LARGE_THRESHOLD,
  SCRAP_BAG_SCALE_MEDIUM,
  SCRAP_BAG_SCALE_LARGE,
  SCRAP_BAG_LARGE_BAG_COLOR,
  SCRAP_BAG_LARGE_ACCENT_COLOR,
  SCRAP_BAG_MEDIUM_ACCENT_COLOR,
  SCRAP_BAG_SPARKLE_PERIOD,
  SCRAP_BAG_SPARKLE_COLOR,
  PICKUP_BOB_PERIOD,
  PICKUP_GLOW_PERIOD,
  PICKUP_GLOW_MIN_ALPHA,
  PICKUP_GLOW_MAX_ALPHA,
  BOMB_FLASH_DURATION,
  BOMB_FLASH_ALPHA,
  BOMB_SHOCKWAVE_DURATION,
  BOMB_SHOCKWAVE_MAX_RADIUS,
  MAGNET_PULSE_DURATION,
  MAGNET_PULSE_RADIUS,
  HEART_VIGNETTE_DURATION,
  HEART_VIGNETTE_INNER,
  HEART_VIGNETTE_OUTER,
  CLOCK_TINT_COLOR,
  CLOCK_VIGNETTE_DURATION,
  CLOCK_VIGNETTE_INNER,
  CLOCK_VIGNETTE_OUTER,
  CLOCK_FROZEN_TINT,
  CLOCK_FROZEN_RING_COLOR,
  FLOATING_TEXT_FONT,
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
  SHOOTER_COLOR,
  SHOOTER_PROJ_COLOR,
  SCALING,
  BOSS_COLOR,
  BOSS_OUTLINE,
  BOSS_PLATING_COLOR,
  BOSS_ENRAGED_COLOR,
  BOSS_ENRAGED_OUTLINE,
  BOSS_ENRAGED_PLATING_COLOR,
  BOSS_HP_BAR_BG_COLOR,
  BOSS_HP_BAR_BORDER,
  BOSS_HP_BAR_FULL,
  BOSS_HP_BAR_HALF,
  BOSS_HP_BAR_HEIGHT,
  BOSS_HP_BAR_LABEL_FONT,
  BOSS_HP_BAR_LOW,
  BOSS_HP_BAR_WIDTH_FRAC,
  BOSS_SLAM_RADIUS,
  BOSS_SLAM_TELEGRAPH_FILL,
  BOSS_SLAM_TELEGRAPH_RING,
  BOSS_SLAM_WINDUP,
  TREASURE_CHEST_BODY_COLOR,
  TREASURE_CHEST_GLOW_COLOR,
  TREASURE_CHEST_OUTLINE_COLOR,
  TREASURE_CHEST_TRIM_COLOR,
  BRUTE_COLOR,
  BRUTE_OUTLINE,
  BRUTE_PLATING_COLOR,
  BRUTE_SLAM_RADIUS,
  BRUTE_SLAM_TELEGRAPH_FILL,
  BRUTE_SLAM_TELEGRAPH_RING,
  BRUTE_SLAM_WINDUP,
  BOMBER_COLOR,
  BOMBER_HIGHLIGHT_COLOR,
  BOMBER_ARMED_DIM,
  BOMBER_PULSE_HZ,
  BOMBER_VIGNETTE_DURATION,
  BOMBER_VIGNETTE_INNER,
  BOMBER_VIGNETTE_OUTER,
  SHIELDED_COLOR,
  SHIELDED_OUTLINE,
  SHIELDED_SHIELD_FULL_COLOR,
  SHIELDED_SHIELD_LOW_COLOR,
  SHIELDED_SHARD_COLOR,
  SHIELDED_SHARD_COUNT,
  SHIELDED_SHARD_LENGTH,
  SHIELDED_SHIELD_OFFSET,
  SHIELDED_SHIELD_WIDTH,
  SHIELDED_BREAK_TTL,
  CASTER_COLOR,
  CASTER_OUTLINE,
  CASTER_CORE_COLOR,
  CASTER_GLOW_COLOR,
  CASTER_AOE_FILL_COLOR,
  CASTER_AOE_RADIUS,
  CASTER_AOE_RING_COLOR,
  CASTER_AOE_STRIKE_COLOR,
  CASTER_CHANNEL_TIME,
  CASTER_FLASH_DURATION,
  TITLE_FONT,
  WEAPONS,
  SCRAP_PER_SECOND,
  SCRAP_LOST_COLOR,
  EXTRACT_ARROW_MARGIN,
  EXTRACT_ARROW_SIZE,
  EXTRACT_ACTIVE_FONT,
  EXTRACT_COLOR,
  EXTRACT_INNER_RADIUS_MAX,
  EXTRACT_INNER_RADIUS_MIN,
  EXTRACT_PULSE_HZ,
  EXTRACT_PULSE_PERIOD,
  PAUSE_BUTTON_BG,
  PAUSE_BUTTON_BG_HOVER,
  PAUSE_BUTTON_BORDER,
  PAUSE_BUTTON_ICON,
  PAUSE_BUTTON_SIZE,
  PAUSE_HINT_FONT,
  MOD_TAG_HEIGHT,
  MOD_TAG_FONT,
  MOD_TAG_PASSIVE_BG,
  MOD_TAG_PASSIVE_TEXT,
  MOD_TAG_SUMMON_BG,
  MOD_TAG_SUMMON_TEXT,
  MOD_TAG_WEAPON_TEXT,
  EVOLUTIONS,
  EVOLUTION_BORDER_COLOR,
  SINGULARITY_DURATION,
  SINGULARITY_FADE_DURATION,
  SINGULARITY_PROJECTILE_COLOR,
  SINGULARITY_PROJECTILE_GLOW,
  SINGULARITY_PROJECTILE_RADIUS,
  SINGULARITY_TINT_COLOR,
  SINGULARITY_WELL_INNER,
  SINGULARITY_WELL_RING,
  EVOLUTION_NAME_COLOR,
  EVOLUTION_SUBLINE_FONT,
  EVOLUTION_TAG_BG,
  EVOLUTION_TAG_TEXT,
  BERSERKER_HP_THRESHOLD,
  BERSERKER_VIGNETTE_INNER,
  BERSERKER_VIGNETTE_OUTER,
  CRIT_CHANCE_DEFAULT,
  CRIT_FLASH_COLOR,
  CRIT_FLASH_RADIUS_MULT,
  CRIT_MULT_DEFAULT,
  DASH_BASE_COOLDOWN,
  DASH_HUD_DIMMED_COLOR,
  DASH_HUD_ICON_RADIUS,
  DASH_HUD_LABEL_COLOR,
  DASH_HUD_PROGRESS_COLOR,
  DASH_HUD_READY_COLOR,
  DASH_FLASH_COLOR,
  DASH_IFRAME_DURATION,
  DASH_OUTLINE_COLOR,
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
  STARTER_HEADER_TOP_PADDING,
  STARTER_HEADER_BOTTOM_MARGIN,
  STARTER_HEADER_HEIGHT,
  STARTER_BUTTONS_BOTTOM_MARGIN,
  DAMAGE_SOURCE_COLORS,
  DAMAGE_SOURCE_LABELS,
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
import { gemValueForTime, updateDeathDrops } from "./systems/deathDrops";
import { updateGems } from "./systems/gem";
import { updateEnemyShoot } from "./systems/enemyShoot";
import { updateEnemyProjectiles } from "./systems/enemyProjectile";
import { updateOrbs } from "./systems/orb";
import { updateRegen } from "./systems/regen";
import { updateBoomerangs } from "./systems/boomerang";
import { updateAura } from "./systems/aura";
import { updateLightning } from "./systems/lightning";
import { updateMines, updatePlasmaFields } from "./systems/mines";
import { updatePickups } from "./systems/pickup";
import { updateLaser } from "./systems/laser";
import { updateMachineGun } from "./systems/mg";
import { updateRockets } from "./systems/rocket";
import { updateClusterBombs } from "./systems/clusterBomb";
import { updateGravityWells, updateRepulsor } from "./systems/repulsor";
import { updateBombers } from "./systems/bomber";
import { updateSword } from "./systems/sword";
import { updateRicochet } from "./systems/ricochet";
import { updateDrones } from "./systems/drone";
import { updateFrostNova } from "./systems/frostNova";
import { updateStats, liveDps } from "./systems/stats";
import {
  despawnActiveBoss,
  getExtractMultiplier,
  nextWindowOpenTime,
  updateExtraction,
} from "./systems/extract";
import {
  findAuraWeapon,
  findFrostNovaWeapon,
  findLaserWeapon,
  findMachineGunWeapon,
  findOrbWeapon,
  findPistolWeapon,
  findRepulsorWeapon,
  findSwordWeapon,
  getOwnedWeaponDefs,
  getWeaponDefForMod,
  pistolWeaponDef,
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
import { PASSIVE_MODS, rollOffer } from "./mods";

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
  clusterBombs: ClusterBomb[];
  plasmaFields: PlasmaField[];
  pickups: Pickup[];
  gravityWells: GravityWell[];
  explosions: Explosion[];
  ricochetProjectiles: RicochetProjectile[];
  ricochetSparks: RicochetSpark[];
  drones: Drone[];
  dashAfterimages: DashAfterimage[];
  dashFlashes: DashFlash[];
  floatingTexts: FloatingText[];
  bombFlashTtl: number;
  bombShockwaveTtl: number;
  bombShockwaveOriginX: number;
  bombShockwaveOriginY: number;
  magnetPulseTtl: number;
  heartVignetteTtl: number;
  clockTintTtl: number;
  clockVignetteTtl: number;
  bomberVignetteTtl: number;
  camera: Camera;
  input: InputState;
  viewport: { width: number; height: number };
  spawnTimer: number;
  pendingLevelUps: number;
  offer: Mod[] | null;
  killCount: number;
  brutesKilled: number;
  totalDamageDealt: number;
  totalDamageTaken: number;
  damageBySource: Record<string, number>;
  killsByType: Record<string, number>;
  frameDamageDealt: number;
  frameDamageTaken: Record<string, number>;
  dpsWindow: number[];
  damageDealtBuckets: number[];
  damageTakenBuckets: DamageTakenSample[];
  bestMoment: BestMoment;
  worstMoment: WorstMoment;
  causeOfDeath: string | null;
  modStacks: Record<string, number>;
  pendingChestRolls: number;
  pendingModalSource: "levelup" | "chest" | "first-pick" | null;
  pickupVizRemaining: number;
  glassCannonTaken: boolean;
  save: SaveData;
  scrapEarnedLastRun: number;
  scrapLostLastRun: number;
  unlocksThisRun: Achievement[];
  titleWipeRect: Rect | null;
  extraction: ExtractionZone | null;
  nextExtractWindow: number;
  extractMultiplierLastRun: number;
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
    clusterBombs: [],
    plasmaFields: [],
    pickups: [],
    gravityWells: [],
    explosions: [],
    ricochetProjectiles: [],
    ricochetSparks: [],
    drones: [],
    dashAfterimages: [],
    dashFlashes: [],
    floatingTexts: [],
    bombFlashTtl: 0,
    bombShockwaveTtl: 0,
    bombShockwaveOriginX: 0,
    bombShockwaveOriginY: 0,
    magnetPulseTtl: 0,
    heartVignetteTtl: 0,
    clockTintTtl: 0,
    clockVignetteTtl: 0,
    bomberVignetteTtl: 0,
    camera: { pos: { x: 0, y: 0 }, prevPos: { x: 0, y: 0 } },
    input: createInput(),
    viewport,
    spawnTimer: SCALING.spawnInterval.startSeconds,
    pendingLevelUps: 0,
    offer: null,
    killCount: 0,
    brutesKilled: 0,
    totalDamageDealt: 0,
    totalDamageTaken: 0,
    damageBySource: {},
    killsByType: {},
    frameDamageDealt: 0,
    frameDamageTaken: {},
    dpsWindow: [],
    damageDealtBuckets: [],
    damageTakenBuckets: [],
    bestMoment: { dps: 0, time: 0, dealt: 0 },
    worstMoment: { damage: 0, time: 0, dominantSource: "" },
    causeOfDeath: null,
    modStacks: {},
    pendingChestRolls: 0,
    pendingModalSource: null,
    pickupVizRemaining: 0,
    glassCannonTaken: false,
    save: loadSave(),
    scrapEarnedLastRun: 0,
    scrapLostLastRun: 0,
    unlocksThisRun: [],
    titleWipeRect: null,
    extraction: null,
    nextExtractWindow: 1,
    extractMultiplierLastRun: 0,
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
    weapons: [pistolWeaponDef.create()],
    level: 1,
    xp: 0,
    xpToNext: LEVEL_XP_START,
    globalDamageMult: GLOBAL_DAMAGE_MULT_DEFAULT,
    rerollTokens: 0,
    runScrap: 0,
    critChance: CRIT_CHANCE_DEFAULT,
    critMult: CRIT_MULT_DEFAULT,
    berserkerStacks: 0,
    thornsStacks: 0,
    ironSkinStacks: 0,
    dashCooldown: 0,
    dashCooldownMax: DASH_BASE_COOLDOWN,
    dashIframeTimer: 0,
    dashActiveTimer: 0,
    dashStartPos: { x: 0, y: 0 },
    dashEndPos: { x: 0, y: 0 },
    dashAfterimageTimer: 0,
    lastMovementDirection: { x: 0, y: 0 },
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
  state.clusterBombs = [];
  state.plasmaFields = [];
  state.pickups = [];
  state.gravityWells = [];
  state.explosions = [];
  state.ricochetProjectiles = [];
  state.ricochetSparks = [];
  state.drones = [];
  state.dashAfterimages = [];
  state.dashFlashes = [];
  state.floatingTexts = [];
  state.bombFlashTtl = 0;
  state.bombShockwaveTtl = 0;
  state.bombShockwaveOriginX = 0;
  state.bombShockwaveOriginY = 0;
  state.magnetPulseTtl = 0;
  state.heartVignetteTtl = 0;
  state.clockTintTtl = 0;
  state.clockVignetteTtl = 0;
  state.bomberVignetteTtl = 0;
  state.camera = { pos: { x: 0, y: 0 }, prevPos: { x: 0, y: 0 } };
  state.spawnTimer = SCALING.spawnInterval.startSeconds;
  state.pendingLevelUps = 0;
  state.offer = null;
  state.killCount = 0;
  state.brutesKilled = 0;
  state.totalDamageDealt = 0;
  state.totalDamageTaken = 0;
  state.damageBySource = {};
  state.killsByType = {};
  state.frameDamageDealt = 0;
  state.frameDamageTaken = {};
  state.dpsWindow = [];
  state.damageDealtBuckets = [];
  state.damageTakenBuckets = [];
  state.bestMoment = { dps: 0, time: 0, dealt: 0 };
  state.worstMoment = { damage: 0, time: 0, dominantSource: "" };
  state.causeOfDeath = null;
  state.modStacks = {};
  state.pendingChestRolls = 0;
  state.pendingModalSource = null;
  state.pickupVizRemaining = 0;
  state.glassCannonTaken = false;
  state.extraction = null;
  state.nextExtractWindow = 1;
}

function findWeaponDefById(id: string): WeaponDef | undefined {
  return WEAPON_DEFS.find((d) => d.type === id);
}

function startNewRun(state: GameState): void {
  freshRun(state);
  const starter =
    findWeaponDefById(state.save.selectedStartingWeapon) ?? pistolWeaponDef;
  state.player.weapons = [starter.create()];
  const primary = state.player.weapons[0];
  if (
    primary.type === "pistol" ||
    primary.type === "laser" ||
    primary.type === "mg" ||
    primary.type === "rocket"
  ) {
    primary.isPrimary = true;
  }
  applyUpgrades(state, state.save);
  state.scrapEarnedLastRun = 0;
  state.scrapLostLastRun = 0;
  state.extractMultiplierLastRun = 0;
  state.unlocksThisRun = [];
  state.offer = rollOffer(state, LEVELUP_OFFER_COUNT);
  state.pendingModalSource = "first-pick";
  state.phase = "first-pick";
}

function handleFirstPickClick(state: GameState): void {
  if (!state.offer) return;
  if (!state.input.mouseClicked) return;
  const m = state.input.mouse;

  const reroll = getRerollButtonRect(state);
  if (reroll && pointInRect(m, reroll)) {
    state.player.rerollTokens -= 1;
    state.offer = rollOffer(state, LEVELUP_OFFER_COUNT);
    return;
  }

  const rects = getCardRects(state);
  for (let i = 0; i < rects.length; i++) {
    if (!pointInRect(m, rects[i])) continue;
    const picked = state.offer[i];
    picked.apply(state);
    state.modStacks[picked.id] = (state.modStacks[picked.id] ?? 0) + 1;
    state.offer = null;
    state.pendingModalSource = null;
    state.phase = "playing";
    return;
  }
}

function extractRun(state: GameState): void {
  const zone = state.extraction;
  const mult = zone ? zone.multiplier : 0;
  const banked = Math.max(
    0,
    Math.floor(state.player.runScrap * mult * getSalvageMultiplier(state.save))
  );
  state.save.totalScrap += banked;
  state.scrapEarnedLastRun = banked;
  state.scrapLostLastRun = 0;
  state.extractMultiplierLastRun = mult;
  state.unlocksThisRun = checkAchievements(state);
  state.extraction = null;
  despawnActiveBoss(state);
  writeSave(state.save);
  state.phase = "extracted";
}

function loseRun(state: GameState): void {
  const lost = Math.max(
    0,
    Math.floor(state.player.runScrap * getSalvageMultiplier(state.save))
  );
  state.scrapEarnedLastRun = 0;
  state.scrapLostLastRun = lost;
  state.extractMultiplierLastRun = 0;
  state.unlocksThisRun = [];
  writeSave(state.save);
  state.phase = "lost";
}

export function updateGame(state: GameState, dt: number): void {
  if (
    (state.input.justPressed.has("KeyP") || state.input.justPressed.has("Escape")) &&
    (state.phase === "playing" || state.phase === "paused")
  ) {
    state.phase = state.phase === "playing" ? "paused" : "playing";
  }

  if (state.input.justPressed.has("Tab")) {
    if (state.phase === "playing") state.phase = "paused-summary";
    else if (state.phase === "paused-summary") state.phase = "playing";
  } else if (
    state.input.justPressed.has("Escape") &&
    state.phase === "paused-summary"
  ) {
    state.phase = "playing";
  }

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
    case "first-pick":
      handleFirstPickClick(state);
      clearJustPressed(state.input);
      return;
    case "extracted":
    case "lost":
      handleEndScreenClick(state);
      clearJustPressed(state.input);
      return;
    case "levelup":
      handleLevelUpClick(state);
      clearJustPressed(state.input);
      return;
    case "playing":
      if (
        state.input.mouseClicked &&
        pointInRect(state.input.mouse, getPauseButtonRect(state))
      ) {
        state.phase = "paused";
        clearJustPressed(state.input);
        return;
      }
      tickPlaying(state, dt);
      clearJustPressed(state.input);
      return;
    case "paused":
      handlePauseClick(state);
      clearJustPressed(state.input);
      return;
    case "paused-summary":
      clearJustPressed(state.input);
      return;
  }
}

function getPauseButtonRect(state: GameState): Rect {
  return {
    x: state.viewport.width - PAUSE_BUTTON_SIZE - 12,
    y: 12,
    w: PAUSE_BUTTON_SIZE,
    h: PAUSE_BUTTON_SIZE,
  };
}

function getResumeButtonRect(state: GameState): Rect {
  const { width, height } = state.viewport;
  return {
    x: (width - BUTTON_W) / 2,
    y: height / 2 + 40,
    w: BUTTON_W,
    h: BUTTON_H,
  };
}

function handlePauseClick(state: GameState): void {
  if (!state.input.mouseClicked) return;
  const m = state.input.mouse;
  if (pointInRect(m, getResumeButtonRect(state)) || pointInRect(m, getPauseButtonRect(state))) {
    state.phase = "playing";
  }
}

function tickPlaying(state: GameState, dt: number): void {
  state.time += dt;
  state.player.runScrap += SCRAP_PER_SECOND * dt;

  updateSpawn(state, dt);
  updateMovement(state, dt);
  updatePickups(state, dt);
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
  updatePlasmaFields(state, dt);
  updateLaser(state, dt);
  updateMachineGun(state, dt);
  updateRockets(state, dt);
  updateClusterBombs(state, dt);
  updateRepulsor(state, dt);
  updateGravityWells(state, dt);
  updateSword(state, dt);
  updateRicochet(state, dt);
  updateDrones(state, dt);
  updateFrostNova(state, dt);

  const extracting = updateExtraction(state, dt);
  if (extracting) {
    extractRun(state);
    return;
  }

  updateCombat(state, dt);
  updateBombers(state, dt);
  updateRegen(state, dt);
  updateDeathDrops(state);
  updateGems(state, dt);
  updateCamera(state);
  updateStats(state);
  pruneDead(state);

  if (state.player.hp <= 0) {
    loseRun(state);
    return;
  }
  maybeStartLevelUp(state);
}

function handleEndScreenClick(state: GameState): void {
  if (!state.input.mouseClicked) return;
  const m = state.input.mouse;
  if (pointInRect(m, getPlayAgainRect(state))) {
    startNewRun(state);
    return;
  }
  if (pointInRect(m, getEndScreenWorkshopRect(state))) {
    state.phase = "workshop";
  }
}

type Rect = { x: number; y: number; w: number; h: number };

function pointInRect(p: { x: number; y: number }, r: Rect): boolean {
  return p.x >= r.x && p.x <= r.x + r.w && p.y >= r.y && p.y <= r.y + r.h;
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
): string[] {
  if (!text) return [];
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    const candidate = current ? current + " " + word : word;
    if (ctx.measureText(candidate).width <= maxWidth) {
      current = candidate;
    } else {
      if (current) lines.push(current);
      // word itself overflows; truncate it
      current = ctx.measureText(word).width > maxWidth ? truncateText(ctx, word, maxWidth) : word;
    }
  }
  if (current) lines.push(current);
  return lines;
}

function truncateText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
): string {
  if (ctx.measureText(text).width <= maxWidth) return text;
  const ellipsis = "…";
  let lo = 0;
  let hi = text.length;
  while (lo < hi) {
    const mid = Math.floor((lo + hi + 1) / 2);
    if (ctx.measureText(text.slice(0, mid) + ellipsis).width <= maxWidth) lo = mid;
    else hi = mid - 1;
  }
  return text.slice(0, lo) + ellipsis;
}

function drawModCardTag(
  ctx: CanvasRenderingContext2D,
  card: Rect,
  mod: import("./mods").Mod
): void {
  let bg: string;
  let textColor: string;
  let label: string;

  if (mod.isEvolution) {
    bg = EVOLUTION_TAG_BG;
    textColor = EVOLUTION_TAG_TEXT;
    label = "EVOLUTION";
  } else if (mod.isSummon) {
    bg = MOD_TAG_SUMMON_BG;
    textColor = MOD_TAG_SUMMON_TEXT;
    label = "NEW WEAPON";
  } else if (mod.category === "weapon") {
    const def = getWeaponDefForMod(mod.id);
    bg = def ? def.color : MOD_TAG_PASSIVE_BG;
    textColor = MOD_TAG_WEAPON_TEXT;
    label = def ? def.name : "WEAPON";
  } else {
    bg = MOD_TAG_PASSIVE_BG;
    textColor = MOD_TAG_PASSIVE_TEXT;
    label = "PASSIVE";
  }

  ctx.fillStyle = bg;
  ctx.fillRect(card.x, card.y, card.w, MOD_TAG_HEIGHT);

  ctx.font = MOD_TAG_FONT;
  ctx.fillStyle = textColor;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  const innerW = card.w - 16;
  ctx.fillText(
    truncateText(ctx, label, innerW),
    card.x + card.w / 2,
    card.y + MOD_TAG_HEIGHT / 2
  );
}

function getPlayAgainRect(state: GameState): Rect {
  const { width, height } = state.viewport;
  const totalW = 2 * BUTTON_W + 12;
  const startX = (width - totalW) / 2;
  return {
    x: startX + BUTTON_W + 12,
    y: height / 2 + 130,
    w: BUTTON_W,
    h: BUTTON_H,
  };
}

function getEndScreenWorkshopRect(state: GameState): Rect {
  const { width, height } = state.viewport;
  const totalW = 2 * BUTTON_W + 12;
  const startX = (width - totalW) / 2;
  return {
    x: startX,
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
  const total = STARTER_WEAPON_IDS.length;
  const cols = STARTER_COLS;
  const totalRows = Math.ceil(total / cols);
  const row = Math.floor(index / cols);
  const col = index % cols;
  const isLastRow = row === totalRows - 1;
  const lastRowCount = total - (totalRows - 1) * cols;
  const colsThisRow = isLastRow ? lastRowCount : cols;
  const rowWidth =
    colsThisRow * STARTER_CARD_W + (colsThisRow - 1) * STARTER_CARD_GAP;
  const startX = (state.viewport.width - rowWidth) / 2;
  const gridTop =
    STARTER_HEADER_TOP_PADDING + STARTER_HEADER_HEIGHT + STARTER_HEADER_BOTTOM_MARGIN;
  return {
    x: startX + col * (STARTER_CARD_W + STARTER_CARD_GAP),
    y: gridTop + row * (STARTER_CARD_H + STARTER_CARD_GAP),
    w: STARTER_CARD_W,
    h: STARTER_CARD_H,
  };
}

function getWeaponSelectStartRect(state: GameState): Rect {
  const totalW = 2 * BUTTON_W + 12;
  const startX = (state.viewport.width - totalW) / 2;
  return {
    x: startX + BUTTON_W + 12,
    y: state.viewport.height - BUTTON_H - STARTER_BUTTONS_BOTTOM_MARGIN,
    w: BUTTON_W,
    h: BUTTON_H,
  };
}

function getWeaponSelectBackRect(state: GameState): Rect {
  const totalW = 2 * BUTTON_W + 12;
  const startX = (state.viewport.width - totalW) / 2;
  return {
    x: startX,
    y: state.viewport.height - BUTTON_H - STARTER_BUTTONS_BOTTOM_MARGIN,
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
  if (state.clusterBombs.some((b) => !b.alive)) {
    state.clusterBombs = state.clusterBombs.filter((b) => b.alive);
  }
  if (state.pickups.some((p) => !p.alive)) {
    state.pickups = state.pickups.filter((p) => p.alive);
  }
  if (state.gravityWells.some((w) => !w.alive)) {
    state.gravityWells = state.gravityWells.filter((w) => w.alive);
  }
  if (state.ricochetProjectiles.some((p) => !p.alive)) {
    state.ricochetProjectiles = state.ricochetProjectiles.filter((p) => p.alive);
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

  if (state.phase === "first-pick") {
    drawFirstPick(ctx, state);
    return;
  }

  drawPickupViz(ctx, state, alpha, camX, camY);
  drawExtractionZone(ctx, state, camX, camY);
  drawAura(ctx, state, alpha, camX, camY);
  drawPlasmaFields(ctx, state, camX, camY);
  drawMines(ctx, state, alpha, camX, camY);
  drawPickups(ctx, state, camX, camY);
  drawGems(ctx, state, alpha, camX, camY);
  drawEnemies(ctx, state, alpha, camX, camY);
  drawEnemyProjectiles(ctx, state, alpha, camX, camY);
  drawProjectiles(ctx, state, alpha, camX, camY);
  drawRockets(ctx, state, alpha, camX, camY);
  drawClusterBombs(ctx, state, alpha, camX, camY);
  drawOrbs(ctx, state, alpha, camX, camY);
  drawBoomerangs(ctx, state, alpha, camX, camY);
  drawLightning(ctx, state, camX, camY);
  drawLaserBeams(ctx, state, camX, camY);
  drawSolarBeam(ctx, state, camX, camY);
  drawRepulsorPulse(ctx, state, camX, camY);
  drawGravityWells(ctx, state, alpha, camX, camY);
  drawSwordSwing(ctx, state, camX, camY);
  drawDrones(ctx, state, alpha, camX, camY);
  drawRicochetProjectiles(ctx, state, alpha, camX, camY);
  drawFrostPulse(ctx, state, alpha, camX, camY);
  drawExplosions(ctx, state, camX, camY);
  drawDashAfterimages(ctx, state, camX, camY);
  drawDashFlashes(ctx, state, camX, camY);
  drawPlayer(ctx, state, alpha, camX, camY);
  drawDashIframeOutline(ctx, state, alpha, camX, camY);
  drawMinigunIndicator(ctx, state, camX, camY);
  drawBombShockwave(ctx, state, camX, camY);
  drawMagnetPulse(ctx, state, camX, camY);
  drawFloatingTexts(ctx, state, camX, camY);
  drawClockTint(ctx, state);
  drawClockVignette(ctx, state);
  drawHeartVignette(ctx, state);
  drawBomberVignette(ctx, state);
  drawBombFlash(ctx, state);
  drawBerserkerVignette(ctx, state);
  drawExtractionArrow(ctx, state, camX, camY);
  drawHud(ctx, state);

  if (state.phase === "playing" || state.phase === "paused") {
    drawPauseButton(ctx, state);
  }

  if (state.phase === "levelup") drawLevelUpModal(ctx, state);
  else if (state.phase === "paused") drawPauseOverlay(ctx, state);
  else if (state.phase === "paused-summary") drawBuildSummary(ctx, state);
  else if (state.phase === "extracted") drawEndScreen(ctx, state, "extracted");
  else if (state.phase === "lost") drawEndScreen(ctx, state, "lost");
}

function drawBerserkerVignette(
  ctx: CanvasRenderingContext2D,
  state: GameState
): void {
  const p = state.player;
  if (p.berserkerStacks <= 0) return;
  if (p.maxHp <= 0) return;
  if (p.hp / p.maxHp >= BERSERKER_HP_THRESHOLD) return;

  const { width, height } = state.viewport;
  const cx = width / 2;
  const cy = height / 2;
  const radius = Math.max(width, height) * 0.7;
  const grad = ctx.createRadialGradient(cx, cy, radius * 0.4, cx, cy, radius);
  grad.addColorStop(0, BERSERKER_VIGNETTE_INNER);
  grad.addColorStop(1, BERSERKER_VIGNETTE_OUTER);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);
}

function drawHeartVignette(
  ctx: CanvasRenderingContext2D,
  state: GameState
): void {
  if (state.heartVignetteTtl <= 0) return;
  const fade = state.heartVignetteTtl / HEART_VIGNETTE_DURATION;
  const { width, height } = state.viewport;
  const cx = width / 2;
  const cy = height / 2;
  const r = Math.max(width, height) * 0.7;
  const grad = ctx.createRadialGradient(cx, cy, r * 0.4, cx, cy, r);
  grad.addColorStop(0, HEART_VIGNETTE_INNER);
  grad.addColorStop(1, HEART_VIGNETTE_OUTER);
  const prev = ctx.globalAlpha;
  ctx.globalAlpha = fade;
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);
  ctx.globalAlpha = prev;
}

function drawClockTint(ctx: CanvasRenderingContext2D, state: GameState): void {
  if (state.clockTintTtl <= 0) return;
  const { width, height } = state.viewport;
  ctx.fillStyle = CLOCK_TINT_COLOR;
  ctx.fillRect(0, 0, width, height);
}

function drawClockVignette(
  ctx: CanvasRenderingContext2D,
  state: GameState
): void {
  if (state.clockVignetteTtl <= 0) return;
  const fade = state.clockVignetteTtl / CLOCK_VIGNETTE_DURATION;
  const { width, height } = state.viewport;
  const cx = width / 2;
  const cy = height / 2;
  const r = Math.max(width, height) * 0.7;
  const grad = ctx.createRadialGradient(cx, cy, r * 0.4, cx, cy, r);
  grad.addColorStop(0, CLOCK_VIGNETTE_INNER);
  grad.addColorStop(1, CLOCK_VIGNETTE_OUTER);
  const prev = ctx.globalAlpha;
  ctx.globalAlpha = fade;
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);
  ctx.globalAlpha = prev;
}

function drawBombFlash(ctx: CanvasRenderingContext2D, state: GameState): void {
  if (state.bombFlashTtl <= 0) return;
  const { width, height } = state.viewport;
  const fade = state.bombFlashTtl / BOMB_FLASH_DURATION;
  const prev = ctx.globalAlpha;
  ctx.globalAlpha = BOMB_FLASH_ALPHA * fade;
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, height);
  ctx.globalAlpha = prev;
}

function drawBombShockwave(
  ctx: CanvasRenderingContext2D,
  state: GameState,
  camX: number,
  camY: number
): void {
  if (state.bombShockwaveTtl <= 0) return;
  const { width, height } = state.viewport;
  const t = 1 - state.bombShockwaveTtl / BOMB_SHOCKWAVE_DURATION;
  const radius = BOMB_SHOCKWAVE_MAX_RADIUS * t;
  const sx = width / 2 + (state.bombShockwaveOriginX - camX);
  const sy = height / 2 + (state.bombShockwaveOriginY - camY);
  const prev = ctx.globalAlpha;
  ctx.globalAlpha = state.bombShockwaveTtl / BOMB_SHOCKWAVE_DURATION;
  ctx.lineWidth = 4;
  ctx.strokeStyle = "#ffffff";
  ctx.beginPath();
  ctx.arc(sx, sy, radius, 0, Math.PI * 2);
  ctx.stroke();
  ctx.globalAlpha = prev;
}

function drawMagnetPulse(
  ctx: CanvasRenderingContext2D,
  state: GameState,
  camX: number,
  camY: number
): void {
  if (state.magnetPulseTtl <= 0) return;
  const { width, height } = state.viewport;
  const t = 1 - state.magnetPulseTtl / MAGNET_PULSE_DURATION;
  const sx = width / 2 + (state.player.pos.x - camX);
  const sy = height / 2 + (state.player.pos.y - camY);
  const prev = ctx.globalAlpha;
  ctx.globalAlpha = state.magnetPulseTtl / MAGNET_PULSE_DURATION;
  ctx.lineWidth = 3;
  ctx.strokeStyle = "#a8e0ff";
  ctx.beginPath();
  ctx.arc(sx, sy, MAGNET_PULSE_RADIUS * t, 0, Math.PI * 2);
  ctx.stroke();
  ctx.globalAlpha = prev;
}

function drawFloatingTexts(
  ctx: CanvasRenderingContext2D,
  state: GameState,
  camX: number,
  camY: number
): void {
  if (state.floatingTexts.length === 0) return;
  const { width, height } = state.viewport;
  ctx.font = FLOATING_TEXT_FONT;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  const prev = ctx.globalAlpha;
  for (const f of state.floatingTexts) {
    if (f.ttl <= 0) continue;
    ctx.globalAlpha = Math.max(0, Math.min(1, f.ttl / f.ttlMax));
    ctx.fillStyle = f.color;
    ctx.fillText(f.text, width / 2 + (f.pos.x - camX), height / 2 + (f.pos.y - camY));
  }
  ctx.globalAlpha = prev;
}

function drawPickups(
  ctx: CanvasRenderingContext2D,
  state: GameState,
  camX: number,
  camY: number
): void {
  if (state.pickups.length === 0) return;
  const { width, height } = state.viewport;
  const halfW = width / 2;
  const halfH = height / 2;
  const now = state.time;
  for (const pu of state.pickups) {
    if (!pu.alive) continue;
    const bob =
      Math.sin(((now - pu.spawnTime) / PICKUP_BOB_PERIOD) * Math.PI * 2) *
      PICKUP_BOB_AMPLITUDE;
    const sx = halfW + (pu.pos.x - camX);
    const sy = halfH + (pu.pos.y - camY) + bob;
    drawPickupGlow(ctx, sx, sy, now);
    drawPickupIcon(ctx, pu, sx, sy, now);
  }
}

function drawPickupGlow(
  ctx: CanvasRenderingContext2D,
  sx: number,
  sy: number,
  now: number
): void {
  const phase = 0.5 + 0.5 * Math.sin((now / PICKUP_GLOW_PERIOD) * Math.PI * 2);
  const alpha = PICKUP_GLOW_MIN_ALPHA + (PICKUP_GLOW_MAX_ALPHA - PICKUP_GLOW_MIN_ALPHA) * phase;
  const r = PICKUP_RENDER_SIZE * 0.85;
  const grad = ctx.createRadialGradient(sx, sy, r * 0.2, sx, sy, r);
  grad.addColorStop(0, `rgba(255, 255, 255, ${alpha})`);
  grad.addColorStop(1, "rgba(255, 255, 255, 0)");
  ctx.fillStyle = grad;
  ctx.fillRect(sx - r, sy - r, r * 2, r * 2);
}

function drawPickupIcon(
  ctx: CanvasRenderingContext2D,
  pu: import("./types").Pickup,
  sx: number,
  sy: number,
  now: number
): void {
  const type = pu.pickupType;
  let half = PICKUP_RENDER_SIZE / 2;
  if (type === "scrap_bag") {
    const v = pu.scrapValue ?? SCRAP_BAG_VALUE_MIN;
    if (v >= SCRAP_BAG_TIER_LARGE_THRESHOLD) half *= SCRAP_BAG_SCALE_LARGE;
    else if (v >= SCRAP_BAG_TIER_MEDIUM_THRESHOLD) half *= SCRAP_BAG_SCALE_MEDIUM;
  }
  switch (type) {
    case "bomb":
      ctx.fillStyle = "#3a3a3a";
      ctx.beginPath();
      ctx.arc(sx, sy, half * 0.78, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#1a1a1a";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(sx, sy - half * 0.78);
      ctx.lineTo(sx + half * 0.4, sy - half * 1.05);
      ctx.stroke();
      ctx.fillStyle = "#ff5a3a";
      ctx.beginPath();
      ctx.arc(sx + half * 0.4, sy - half * 1.05, 3, 0, Math.PI * 2);
      ctx.fill();
      return;
    case "magnet":
      ctx.fillStyle = "#e23b3b";
      ctx.fillRect(sx - half * 0.7, sy - half * 0.5, half * 0.45, half * 0.9);
      ctx.fillRect(sx + half * 0.25, sy - half * 0.5, half * 0.45, half * 0.9);
      ctx.fillStyle = "#cccccc";
      ctx.fillRect(sx - half * 0.7, sy + half * 0.4 - 4, half * 1.4, half * 0.4);
      ctx.fillStyle = "#cccccc";
      ctx.fillRect(sx - half * 0.7, sy - half * 0.55, half * 0.45, 4);
      ctx.fillRect(sx + half * 0.25, sy - half * 0.55, half * 0.45, 4);
      return;
    case "heart":
      ctx.fillStyle = "#ff7bc8";
      ctx.beginPath();
      const hx = sx;
      const hy = sy + half * 0.2;
      const w = half * 1.05;
      const hh = half * 1.0;
      ctx.moveTo(hx, hy + hh * 0.4);
      ctx.bezierCurveTo(hx, hy, hx - w, hy, hx - w, hy - hh * 0.3);
      ctx.bezierCurveTo(hx - w, hy - hh * 0.85, hx, hy - hh * 0.85, hx, hy - hh * 0.4);
      ctx.bezierCurveTo(hx, hy - hh * 0.85, hx + w, hy - hh * 0.85, hx + w, hy - hh * 0.3);
      ctx.bezierCurveTo(hx + w, hy, hx, hy, hx, hy + hh * 0.4);
      ctx.fill();
      return;
    case "scrap_bag": {
      const v = pu.scrapValue ?? SCRAP_BAG_VALUE_MIN;
      const isLarge = v >= SCRAP_BAG_TIER_LARGE_THRESHOLD;
      const isMedium = !isLarge && v >= SCRAP_BAG_TIER_MEDIUM_THRESHOLD;
      const bagColor = isLarge ? SCRAP_BAG_LARGE_BAG_COLOR : "#7a4a2a";
      const accentColor = isLarge
        ? SCRAP_BAG_LARGE_ACCENT_COLOR
        : isMedium
        ? SCRAP_BAG_MEDIUM_ACCENT_COLOR
        : "#f5d76e";
      ctx.fillStyle = bagColor;
      ctx.fillRect(sx - half * 0.7, sy - half * 0.5, half * 1.4, half * 1.2);
      ctx.fillStyle = "#3a2010";
      ctx.fillRect(sx - half * 0.5, sy - half * 0.7, half * 1.0, half * 0.3);
      ctx.fillStyle = accentColor;
      ctx.beginPath();
      ctx.arc(sx - half * 0.25, sy + half * 0.05, 2.5, 0, Math.PI * 2);
      ctx.arc(sx + half * 0.2, sy + half * 0.25, 2.5, 0, Math.PI * 2);
      ctx.arc(sx + half * 0.05, sy - half * 0.1, 2, 0, Math.PI * 2);
      ctx.fill();
      if (isLarge) drawScrapBagSparkles(ctx, pu, sx, sy, half, now);
      return;
    }
    case "clock":
      ctx.fillStyle = "#f5f5f5";
      ctx.beginPath();
      ctx.arc(sx, sy, half * 0.85, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#5ad7ff";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(sx, sy, half * 0.85, 0, Math.PI * 2);
      ctx.stroke();
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(sx, sy);
      ctx.lineTo(sx, sy - half * 0.55);
      ctx.moveTo(sx, sy);
      ctx.lineTo(sx + half * 0.4, sy);
      ctx.stroke();
      return;
    case "treasure_chest": {
      // Pulsing gold glow
      const pulse = 0.5 + 0.5 * Math.sin(now * Math.PI * 2 * 1.4);
      const glowR = half * (1.6 + pulse * 0.4);
      const grad = ctx.createRadialGradient(sx, sy, half * 0.4, sx, sy, glowR);
      grad.addColorStop(0, TREASURE_CHEST_GLOW_COLOR);
      grad.addColorStop(1, "rgba(245, 215, 110, 0)");
      ctx.fillStyle = grad;
      ctx.fillRect(sx - glowR, sy - glowR, glowR * 2, glowR * 2);

      // Chest body
      const bw = half * 1.5;
      const bh = half * 1.1;
      ctx.fillStyle = TREASURE_CHEST_OUTLINE_COLOR;
      ctx.fillRect(sx - bw / 2 - 2, sy - bh / 2 - 2, bw + 4, bh + 4);
      ctx.fillStyle = TREASURE_CHEST_BODY_COLOR;
      ctx.fillRect(sx - bw / 2, sy - bh / 2, bw, bh);

      // Lid line
      ctx.strokeStyle = TREASURE_CHEST_OUTLINE_COLOR;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(sx - bw / 2, sy - bh * 0.1);
      ctx.lineTo(sx + bw / 2, sy - bh * 0.1);
      ctx.stroke();

      // Gold trim straps
      ctx.fillStyle = TREASURE_CHEST_TRIM_COLOR;
      ctx.fillRect(sx - bw / 2, sy - bh / 2, bw, 3);
      ctx.fillRect(sx - bw / 2, sy + bh / 2 - 3, bw, 3);
      // Lock
      ctx.fillRect(sx - 3, sy - bh * 0.18, 6, 8);
      return;
    }
  }
}

function drawFrostPulse(
  ctx: CanvasRenderingContext2D,
  state: GameState,
  alpha: number,
  camX: number,
  camY: number
): void {
  const w = findFrostNovaWeapon(state);
  if (!w || w.pulseVizTtl <= 0) return;
  const { width, height } = state.viewport;
  const p = state.player;
  const px = p.prevPos.x + (p.pos.x - p.prevPos.x) * alpha;
  const py = p.prevPos.y + (p.pos.y - p.prevPos.y) * alpha;
  const sx = width / 2 + (px - camX);
  const sy = height / 2 + (py - camY);

  const total = WEAPONS.FROST_NOVA.PULSE_VIZ_DURATION;
  const t = 1 - Math.max(0, w.pulseVizTtl / total);
  const r = w.pulseVizRadius * t;
  const fade = 1 - t;

  const prev = ctx.globalAlpha;
  ctx.globalAlpha = fade * 0.85;
  ctx.fillStyle = WEAPONS.FROST_NOVA.PLAYER_FLASH_COLOR;
  ctx.beginPath();
  ctx.arc(sx, sy, p.radius * 1.6 * (0.3 + fade * 0.7), 0, Math.PI * 2);
  ctx.fill();

  ctx.globalAlpha = fade;
  ctx.lineWidth = w.evolved ? WEAPONS.FROST_NOVA.RING_WIDTH_EVOLVED : WEAPONS.FROST_NOVA.RING_WIDTH;
  ctx.strokeStyle = WEAPONS.FROST_NOVA.RING_OUTER_COLOR;
  ctx.beginPath();
  ctx.arc(sx, sy, r, 0, Math.PI * 2);
  ctx.stroke();
  ctx.strokeStyle = WEAPONS.FROST_NOVA.RING_INNER_COLOR;
  ctx.lineWidth = Math.max(1, ctx.lineWidth - 2);
  ctx.beginPath();
  ctx.arc(sx, sy, r * 0.95, 0, Math.PI * 2);
  ctx.stroke();

  if (w.evolved) {
    ctx.fillStyle = WEAPONS.FROST_NOVA.SNOWFLAKE_COLOR;
    const N = WEAPONS.FROST_NOVA.SNOWFLAKE_COUNT;
    for (let i = 0; i < N; i++) {
      const a = (i * 137.5 + state.time * 60) % 360;
      const ang = (a * Math.PI) / 180;
      const dist = (((i * 53 + Math.floor(state.time * 4)) % 100) / 100) * w.pulseVizRadius * fade;
      ctx.globalAlpha = fade * 0.6;
      const fx = sx + Math.cos(ang) * dist;
      const fy = sy + Math.sin(ang) * dist;
      ctx.beginPath();
      ctx.arc(fx, fy, 1.6, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  ctx.globalAlpha = prev;
}

function drawDrones(
  ctx: CanvasRenderingContext2D,
  state: GameState,
  alpha: number,
  camX: number,
  camY: number
): void {
  if (state.drones.length === 0) return;
  const { width, height } = state.viewport;
  const halfW = width / 2;
  const halfH = height / 2;
  const prev = ctx.globalAlpha;

  // Trails first (only when evolved — system clears trail otherwise)
  for (const d of state.drones) {
    if (d.trailHistory.length < 2) continue;
    ctx.strokeStyle = WEAPONS.DRONE.TRAIL_COLOR;
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    for (let i = 1; i < d.trailHistory.length; i++) {
      const a = d.trailHistory[i - 1];
      const b = d.trailHistory[i];
      const fade = Math.max(0, b.ttl / b.ttlMax);
      ctx.globalAlpha = fade * 0.55;
      ctx.beginPath();
      ctx.moveTo(halfW + (a.x - camX), halfH + (a.y - camY));
      ctx.lineTo(halfW + (b.x - camX), halfH + (b.y - camY));
      ctx.stroke();
    }
  }

  ctx.globalAlpha = 1;
  for (const d of state.drones) {
    const dx = d.prevPos.x + (d.pos.x - d.prevPos.x) * alpha;
    const dy = d.prevPos.y + (d.pos.y - d.prevPos.y) * alpha;
    const bob =
      Math.sin((d.bobPhase / WEAPONS.DRONE.BOB_PERIOD) * Math.PI * 2) *
      WEAPONS.DRONE.BOB_AMPLITUDE;
    const sx = halfW + (dx - camX);
    const sy = halfH + (dy - camY) + bob;
    const r = d.radius;

    // Glow
    const grad = ctx.createRadialGradient(sx, sy, r * 0.3, sx, sy, r * 1.8);
    grad.addColorStop(0, WEAPONS.DRONE.BODY_GLOW_COLOR);
    grad.addColorStop(1, "rgba(90, 240, 255, 0)");
    ctx.fillStyle = grad;
    ctx.fillRect(sx - r * 2, sy - r * 2, r * 4, r * 4);

    // Engine trail (small line behind)
    ctx.strokeStyle = WEAPONS.DRONE.BODY_ACCENT_COLOR;
    ctx.lineWidth = 2;
    ctx.beginPath();
    const tailX = sx - Math.cos(d.lastFireAngle) * (r + 4);
    const tailY = sy - Math.sin(d.lastFireAngle) * (r + 4);
    ctx.moveTo(sx - Math.cos(d.lastFireAngle) * (r * 0.4), sy - Math.sin(d.lastFireAngle) * (r * 0.4));
    ctx.lineTo(tailX, tailY);
    ctx.stroke();

    // Triangle body pointing along lastFireAngle
    ctx.save();
    ctx.translate(sx, sy);
    ctx.rotate(d.lastFireAngle);
    ctx.fillStyle = WEAPONS.DRONE.BODY_OUTLINE_COLOR;
    ctx.beginPath();
    ctx.moveTo(r + 1, 0);
    ctx.lineTo(-r - 1, -r * 0.75 - 1);
    ctx.lineTo(-r - 1, r * 0.75 + 1);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = WEAPONS.DRONE.BODY_FILL_COLOR;
    ctx.beginPath();
    ctx.moveTo(r, 0);
    ctx.lineTo(-r, -r * 0.7);
    ctx.lineTo(-r, r * 0.7);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
  ctx.globalAlpha = prev;
}

function drawRicochetProjectiles(
  ctx: CanvasRenderingContext2D,
  state: GameState,
  alpha: number,
  camX: number,
  camY: number
): void {
  if (state.ricochetProjectiles.length === 0 && state.ricochetSparks.length === 0) return;
  const { width, height } = state.viewport;
  const halfW = width / 2;
  const halfH = height / 2;
  const prev = ctx.globalAlpha;

  // Trails first
  for (const p of state.ricochetProjectiles) {
    if (!p.alive) continue;
    const trailColor = pickRicochetTrailColor(p);
    const trailWidth = p.evolved
      ? EVOLUTIONS.RICOCHET.TRAIL_WIDTH
      : WEAPONS.RICOCHET.TRAIL_WIDTH;
    ctx.lineWidth = trailWidth;
    ctx.strokeStyle = trailColor;
    ctx.lineCap = "round";
    for (let i = 1; i < p.trail.length; i++) {
      const a = p.trail[i - 1];
      const b = p.trail[i];
      const fade = Math.max(0, b.ttl / b.ttlMax);
      ctx.globalAlpha = fade * 0.7;
      ctx.beginPath();
      ctx.moveTo(halfW + (a.x - camX), halfH + (a.y - camY));
      ctx.lineTo(halfW + (b.x - camX), halfH + (b.y - camY));
      ctx.stroke();
    }
  }

  // Projectiles
  for (const p of state.ricochetProjectiles) {
    if (!p.alive) continue;
    const px = p.prevPos.x + (p.pos.x - p.prevPos.x) * alpha;
    const py = p.prevPos.y + (p.pos.y - p.prevPos.y) * alpha;
    const sx = halfW + (px - camX);
    const sy = halfH + (py - camY);
    ctx.globalAlpha = 1;
    ctx.fillStyle = WEAPONS.RICOCHET.PROJECTILE_COLOR_PRIMARY;
    ctx.beginPath();
    ctx.arc(sx, sy, p.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = WEAPONS.RICOCHET.PROJECTILE_COLOR_SECONDARY;
    ctx.beginPath();
    ctx.arc(sx, sy, p.radius * 0.55, 0, Math.PI * 2);
    ctx.fill();
  }

  // Sparks on bounce
  for (const s of state.ricochetSparks) {
    const t = 1 - Math.max(0, s.ttl / s.ttlMax);
    const sx = halfW + (s.pos.x - camX);
    const sy = halfH + (s.pos.y - camY);
    ctx.globalAlpha = 1 - t;
    ctx.strokeStyle = WEAPONS.RICOCHET.SPARK_COLOR;
    ctx.lineWidth = 1.5;
    const r = 3 + t * 9;
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(sx + Math.cos(a) * 2, sy + Math.sin(a) * 2);
      ctx.lineTo(sx + Math.cos(a) * r, sy + Math.sin(a) * r);
      ctx.stroke();
    }
  }

  ctx.globalAlpha = prev;
}

function pickRicochetTrailColor(p: RicochetProjectile): string {
  if (!p.evolved) return WEAPONS.RICOCHET.PROJECTILE_TRAIL_COLOR;
  if (p.bounceIndex <= 1) return EVOLUTIONS.RICOCHET.EARLY_COLOR;
  if (p.bounceIndex <= 3) return EVOLUTIONS.RICOCHET.MID_COLOR;
  return EVOLUTIONS.RICOCHET.LATE_COLOR;
}

function drawDashAfterimages(
  ctx: CanvasRenderingContext2D,
  state: GameState,
  camX: number,
  camY: number
): void {
  if (state.dashAfterimages.length === 0) return;
  const { width, height } = state.viewport;
  const prev = ctx.globalAlpha;
  ctx.fillStyle = PLAYER_COLOR;
  for (const a of state.dashAfterimages) {
    const fade = Math.max(0, a.ttl / a.ttlMax);
    ctx.globalAlpha = a.baseAlpha * fade;
    const sx = Math.round(width / 2 + (a.pos.x - camX) - PLAYER_SIZE / 2);
    const sy = Math.round(height / 2 + (a.pos.y - camY) - PLAYER_SIZE / 2);
    ctx.fillRect(sx, sy, PLAYER_SIZE, PLAYER_SIZE);
  }
  ctx.globalAlpha = prev;
}

function drawDashFlashes(
  ctx: CanvasRenderingContext2D,
  state: GameState,
  camX: number,
  camY: number
): void {
  if (state.dashFlashes.length === 0) return;
  const { width, height } = state.viewport;
  const prev = ctx.globalAlpha;
  for (const f of state.dashFlashes) {
    const t = 1 - Math.max(0, f.ttl / f.ttlMax);
    const sx = width / 2 + (f.pos.x - camX);
    const sy = height / 2 + (f.pos.y - camY);
    const r = PLAYER_SIZE * 0.4 + t * PLAYER_SIZE * 0.9;
    ctx.globalAlpha = (1 - t) * 0.85;
    ctx.fillStyle = DASH_FLASH_COLOR;
    ctx.beginPath();
    ctx.arc(sx, sy, r, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = prev;
}

function drawDashIframeOutline(
  ctx: CanvasRenderingContext2D,
  state: GameState,
  alpha: number,
  camX: number,
  camY: number
): void {
  const p = state.player;
  if (p.dashIframeTimer <= 0) return;
  const px = p.prevPos.x + (p.pos.x - p.prevPos.x) * alpha;
  const py = p.prevPos.y + (p.pos.y - p.prevPos.y) * alpha;
  const sx = state.viewport.width / 2 + (px - camX);
  const sy = state.viewport.height / 2 + (py - camY);
  const t = p.dashIframeTimer / DASH_IFRAME_DURATION;
  const pulse = Math.sin((1 - t) * Math.PI);
  const prev = ctx.globalAlpha;
  ctx.globalAlpha = 0.5 * (0.5 + 0.5 * pulse);
  ctx.strokeStyle = DASH_OUTLINE_COLOR;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(sx, sy, p.radius + 4, 0, Math.PI * 2);
  ctx.stroke();
  ctx.globalAlpha = prev;
}

function drawScrapBagSparkles(
  ctx: CanvasRenderingContext2D,
  pu: import("./types").Pickup,
  sx: number,
  sy: number,
  half: number,
  now: number
): void {
  const elapsed = now - pu.spawnTime;
  const cycle = Math.floor(elapsed / SCRAP_BAG_SPARKLE_PERIOD);
  const t = (elapsed % SCRAP_BAG_SPARKLE_PERIOD) / SCRAP_BAG_SPARKLE_PERIOD;
  const fade = 1 - t;
  const N = 5;
  const seedBase = (cycle * 73 + pu.id * 17) % 360;
  const prev = ctx.globalAlpha;
  ctx.fillStyle = SCRAP_BAG_SPARKLE_COLOR;
  for (let i = 0; i < N; i++) {
    const angle = ((seedBase + i * 67) % 360) * (Math.PI / 180);
    const distSeed = ((cycle * 31 + i * 41 + pu.id * 7) % 100) / 100;
    const dist = half * (0.85 + distSeed * 0.45);
    const driftY = -t * half * 0.6;
    const px = sx + Math.cos(angle) * dist;
    const py = sy + Math.sin(angle) * dist + driftY;
    ctx.globalAlpha = fade * 0.85;
    ctx.beginPath();
    ctx.arc(px, py, 1.6, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = prev;
}

function drawPauseButton(ctx: CanvasRenderingContext2D, state: GameState): void {
  const r = getPauseButtonRect(state);
  const hover = pointInRect(state.input.mouse, r);
  ctx.fillStyle = hover ? PAUSE_BUTTON_BG_HOVER : PAUSE_BUTTON_BG;
  ctx.fillRect(r.x, r.y, r.w, r.h);
  ctx.lineWidth = 2;
  ctx.strokeStyle = PAUSE_BUTTON_BORDER;
  ctx.strokeRect(r.x + 1, r.y + 1, r.w - 2, r.h - 2);

  ctx.fillStyle = PAUSE_BUTTON_ICON;
  if (state.phase === "paused") {
    // Play triangle
    const cx = r.x + r.w / 2;
    const cy = r.y + r.h / 2;
    const s = r.w * 0.28;
    ctx.beginPath();
    ctx.moveTo(cx - s * 0.6, cy - s);
    ctx.lineTo(cx + s, cy);
    ctx.lineTo(cx - s * 0.6, cy + s);
    ctx.closePath();
    ctx.fill();
  } else {
    // Pause bars
    const cx = r.x + r.w / 2;
    const cy = r.y + r.h / 2;
    const w = 4;
    const h = r.h * 0.42;
    ctx.fillRect(cx - 7, cy - h / 2, w, h);
    ctx.fillRect(cx + 3, cy - h / 2, w, h);
  }
}

function drawPauseOverlay(ctx: CanvasRenderingContext2D, state: GameState): void {
  const { width, height } = state.viewport;

  ctx.fillStyle = MODAL_BG;
  ctx.fillRect(0, 0, width, height);

  ctx.font = END_TITLE_FONT;
  ctx.fillStyle = MODAL_TEXT;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("PAUSED", width / 2, height / 2 - 40);

  ctx.font = PAUSE_HINT_FONT;
  ctx.fillStyle = MODAL_DESC_TEXT;
  ctx.fillText("Press P or Esc to resume", width / 2, height / 2 + 8);

  drawButton(ctx, getResumeButtonRect(state), "Resume", state.input.mouse, false);
}

function drawBuildSummary(ctx: CanvasRenderingContext2D, state: GameState): void {
  const { width, height } = state.viewport;

  // 50% black overlay over the frozen play field
  ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
  ctx.fillRect(0, 0, width, height);

  // Panel
  const panelW = Math.min(width - 80, 720);
  const panelH = Math.min(height - 80, 660);
  const panelX = (width - panelW) / 2;
  const panelY = (height - panelH) / 2;
  const primary = state.player.weapons[0];
  const primaryDef = primary
    ? WEAPON_DEFS.find((d) => d.type === primary.type)
    : undefined;
  const borderColor = primaryDef?.color ?? MODAL_CARD_BORDER;

  ctx.fillStyle = "rgba(0, 0, 0, 0.75)";
  ctx.fillRect(panelX, panelY, panelW, panelH);
  ctx.lineWidth = 2;
  ctx.strokeStyle = borderColor;
  ctx.strokeRect(panelX + 1, panelY + 1, panelW - 2, panelH - 2);

  const PAD = 18;
  const innerX = panelX + PAD;
  const innerW = panelW - PAD * 2;
  let y = panelY + PAD;

  // Header
  ctx.font = "bold 18px ui-monospace, Menlo, monospace";
  ctx.fillStyle = MODAL_TEXT;
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText("BUILD SUMMARY", innerX, y);
  ctx.font = "13px ui-monospace, Menlo, monospace";
  ctx.fillStyle = MODAL_DESC_TEXT;
  ctx.textAlign = "right";
  ctx.fillText(
    `Time ${formatTime(state.time)}   LV ${state.player.level}   Kills ${state.killCount}`,
    innerX + innerW,
    y + 4
  );
  y += 32;
  ctx.strokeStyle = MODAL_CARD_BORDER;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(innerX, y);
  ctx.lineTo(innerX + innerW, y);
  ctx.stroke();
  y += 12;

  // Section 1: Weapons
  ctx.font = "bold 14px ui-monospace, Menlo, monospace";
  ctx.fillStyle = MODAL_TEXT;
  ctx.textAlign = "left";
  ctx.fillText("WEAPONS", innerX, y);
  y += 22;
  ctx.font = "13px ui-monospace, Menlo, monospace";
  for (const weapon of state.player.weapons) {
    const def = WEAPON_DEFS.find((d) => d.type === weapon.type);
    if (!def) continue;
    const evolved = "evolved" in weapon && (weapon as { evolved: boolean }).evolved;
    const displayName = evolved && def.evolutionMod ? def.evolutionMod.name : def.name;

    ctx.fillStyle = evolved ? EVOLUTION_NAME_COLOR : MODAL_TEXT;
    ctx.textAlign = "left";
    ctx.fillText(displayName, innerX, y);

    ctx.fillStyle = MODAL_DESC_TEXT;
    ctx.textAlign = "right";
    ctx.fillText(def.getStats(weapon), innerX + innerW, y);
    y += 18;

    // Mod stacks for this weapon
    const ownedMods = def.mods
      .map((m) => ({ m, n: state.modStacks[m.id] ?? 0 }))
      .filter((x) => x.n > 0)
      .map((x) => `${x.m.name} x${x.n}`);
    if (ownedMods.length > 0) {
      ctx.fillStyle = MODAL_DESC_TEXT;
      ctx.textAlign = "left";
      const text = "  " + ownedMods.join(", ");
      const lines = wrapText(ctx, text, innerW);
      for (const line of lines) {
        ctx.fillText(line, innerX, y);
        y += 16;
      }
    }
    y += 6;
  }

  // Section 2: Passives
  y += 6;
  ctx.font = "bold 14px ui-monospace, Menlo, monospace";
  ctx.fillStyle = MODAL_TEXT;
  ctx.textAlign = "left";
  ctx.fillText("PASSIVES", innerX, y);
  y += 22;
  ctx.font = "13px ui-monospace, Menlo, monospace";
  ctx.fillStyle = MODAL_DESC_TEXT;
  const passiveLines: string[] = [];
  for (const m of PASSIVE_MODS) {
    const n = state.modStacks[m.id] ?? 0;
    if (n <= 0) continue;
    const effect = describePassive(state, m);
    passiveLines.push(effect ? `${m.name} x${n} (${effect})` : `${m.name} x${n}`);
  }
  if (passiveLines.length === 0) {
    ctx.fillText("None picked yet", innerX, y);
    y += 18;
  } else {
    for (const line of passiveLines) {
      ctx.fillText(line, innerX, y);
      y += 18;
    }
  }

  // Section 3: Player Stats (two-column)
  y += 8;
  ctx.font = "bold 14px ui-monospace, Menlo, monospace";
  ctx.fillStyle = MODAL_TEXT;
  ctx.fillText("PLAYER STATS", innerX, y);
  y += 22;
  ctx.font = "13px ui-monospace, Menlo, monospace";
  const p = state.player;
  const speedMult = p.moveSpeed / PLAYER_SPEED;
  const stats: { label: string; value: string }[] = [
    { label: "HP", value: `${Math.round(p.hp)} / ${p.maxHp}` },
    {
      label: "Move Speed",
      value: `${Math.round(p.moveSpeed)} (x${speedMult.toFixed(2)})`,
    },
    {
      label: "Damage Mult",
      value: `x${p.globalDamageMult.toFixed(2)}`,
    },
    {
      label: "Crit Chance",
      value: `${Math.round(p.critChance * 100)}% (x${p.critMult.toFixed(1)})`,
    },
    { label: "Pickup Radius", value: `${Math.round(p.pickupRadius)}px` },
    { label: "HP Regen", value: `${p.regen.toFixed(2)}/sec` },
    {
      label: "Dash Cooldown",
      value: `${p.dashCooldown.toFixed(1)} / ${p.dashCooldownMax.toFixed(1)}s`,
    },
    { label: "Reroll Tokens", value: `${p.rerollTokens}` },
  ];
  const colW = innerW / 2 - 8;
  for (let i = 0; i < stats.length; i++) {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const cellX = innerX + col * (colW + 16);
    const cellY = y + row * 20;
    ctx.fillStyle = MODAL_DESC_TEXT;
    ctx.textAlign = "left";
    ctx.fillText(stats[i].label, cellX, cellY);
    ctx.fillStyle = MODAL_TEXT;
    ctx.textAlign = "right";
    ctx.fillText(stats[i].value, cellX + colW, cellY);
  }

  // Footer
  ctx.font = PAUSE_HINT_FONT;
  ctx.fillStyle = MODAL_DESC_TEXT;
  ctx.textAlign = "center";
  ctx.fillText("TAB or ESC to resume", panelX + panelW / 2, panelY + panelH - PAD - 8);
}

function describePassive(state: GameState, m: Mod): string {
  const p = state.player;
  switch (m.id) {
    case "vitality":
      return `+${p.maxHp - PLAYER_MAX_HP} max HP`;
    case "swift":
      return `+${Math.round((p.moveSpeed / PLAYER_SPEED - 1) * 100)}% move speed`;
    case "magnet":
      return `+${Math.round(p.pickupRadius - PICKUP_RADIUS_DEFAULT)}px pickup`;
    case "regen":
      return `+${p.regen.toFixed(2)}/sec`;
    case "greed":
      return `+${Math.round((p.xpMultiplier - 1) * 100)}% XP from gems`;
    case "glass_cannon":
      return "active";
    case "crit":
      return `${Math.round(p.critChance * 100)}% chance`;
    case "berserker":
      return `+${Math.round(p.berserkerStacks * 0.15 * 100)}% damage <50% hp`;
    case "thorns":
      return `${Math.round(p.thornsStacks * 0.25 * 100)}% reflect`;
    case "iron_skin":
      return `-${Math.round(p.ironSkinStacks * 0.10 * 100)}% damage taken`;
    default:
      return "";
  }
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

    if (e.species === "caster") {
      drawCasterTelegraph(ctx, e, width, height, camX, camY);
    }

    if (e.species === "brute" && e.slamPhase === "windup") {
      drawBruteSlamTelegraph(ctx, e, sx, sy);
    }

    if (e.species === "boss_brute_lord" && e.slamPhase === "windup") {
      drawBossSlamTelegraph(ctx, e, sx, sy);
    }

    if (e.burnTtl > 0) {
      const prev = ctx.globalAlpha;
      ctx.globalAlpha = 0.55 + 0.25 * Math.sin(state.time * 12 + e.id);
      ctx.strokeStyle = EVOLUTIONS.AURA.FLAME_RING_COLOR;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(sx, sy + EVOLUTIONS.AURA.FLAME_RING_OFFSET * 0.4, e.radius * 0.9, 0, Math.PI * 2);
      ctx.stroke();
      ctx.globalAlpha = prev;
    }

    const flashing = e.critFlashTtl > 0;
    const r = flashing ? e.radius * CRIT_FLASH_RADIUS_MULT : e.radius;

    if (flashing) {
      ctx.fillStyle = CRIT_FLASH_COLOR;
      ctx.beginPath();
      ctx.arc(sx, sy, r, 0, Math.PI * 2);
      ctx.fill();
    } else {
      drawEnemyBody(ctx, state, e, sx, sy, r);
    }

    if (e.species === "shielded") {
      drawShield(ctx, e, sx, sy);
    }

    if (e.frostFlashTtl > 0) {
      const prev = ctx.globalAlpha;
      ctx.globalAlpha = e.frostFlashTtl / WEAPONS.FROST_NOVA.FROST_FLASH_DURATION;
      ctx.fillStyle = WEAPONS.FROST_NOVA.FROST_FLASH_COLOR;
      ctx.beginPath();
      ctx.arc(sx, sy, r, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = prev;
    }

    if (e.slowTimer > 0) {
      const prev = ctx.globalAlpha;
      ctx.globalAlpha = 0.5;
      ctx.fillStyle = WEAPONS.FROST_NOVA.SLOW_TINT_COLOR;
      ctx.beginPath();
      ctx.arc(sx, sy, r, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 0.7;
      ctx.fillStyle = WEAPONS.FROST_NOVA.ICE_PARTICLE_COLOR;
      const t = state.time * 1.5 + e.id * 0.7;
      for (let i = 0; i < 3; i++) {
        const phase = t + i * 2.1;
        const fx = sx + Math.sin(phase) * r * 0.6;
        const fy = sy + (Math.cos(phase * 0.5) - 1) * r * 0.6;
        ctx.beginPath();
        ctx.arc(fx, fy, 1.2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = prev;
    }

    if (e.freezeTtl > 0) {
      const prev = ctx.globalAlpha;
      ctx.globalAlpha = 0.55;
      ctx.fillStyle = CLOCK_FROZEN_TINT;
      ctx.beginPath();
      ctx.arc(sx, sy, r, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 0.85;
      ctx.strokeStyle = CLOCK_FROZEN_RING_COLOR;
      ctx.lineWidth = 1;
      const spike = r * 0.45;
      for (let i = 0; i < 4; i++) {
        const a = (state.time * 0.6 + (i * Math.PI) / 2) % (Math.PI * 2);
        ctx.beginPath();
        ctx.moveTo(sx + Math.cos(a) * (r * 0.3), sy + Math.sin(a) * (r * 0.3));
        ctx.lineTo(sx + Math.cos(a) * (r * 0.3 + spike), sy + Math.sin(a) * (r * 0.3 + spike));
        ctx.stroke();
      }
      ctx.globalAlpha = prev;
    }
  }
}

function drawEnemyBody(
  ctx: CanvasRenderingContext2D,
  state: GameState,
  e: Enemy,
  sx: number,
  sy: number,
  r: number
): void {
  switch (e.species) {
    case "shooter":
      ctx.fillStyle = SHOOTER_COLOR;
      ctx.beginPath();
      ctx.arc(sx, sy, r, 0, Math.PI * 2);
      ctx.fill();
      return;
    case "brute": {
      const side = r * 1.7;
      ctx.fillStyle = BRUTE_OUTLINE;
      ctx.fillRect(sx - side / 2 - 2, sy - side / 2 - 2, side + 4, side + 4);
      ctx.fillStyle = BRUTE_COLOR;
      ctx.fillRect(sx - side / 2, sy - side / 2, side, side);
      ctx.fillStyle = BRUTE_PLATING_COLOR;
      const inner = side * 0.55;
      ctx.fillRect(sx - inner / 2, sy - inner / 2, inner, inner);
      return;
    }
    case "boss_brute_lord": {
      const side = r * 1.7;
      const outline = e.enraged ? BOSS_ENRAGED_OUTLINE : BOSS_OUTLINE;
      const body = e.enraged ? BOSS_ENRAGED_COLOR : BOSS_COLOR;
      const plating = e.enraged ? BOSS_ENRAGED_PLATING_COLOR : BOSS_PLATING_COLOR;
      ctx.fillStyle = outline;
      ctx.fillRect(sx - side / 2 - 4, sy - side / 2 - 4, side + 8, side + 8);
      ctx.fillStyle = body;
      ctx.fillRect(sx - side / 2, sy - side / 2, side, side);
      ctx.fillStyle = plating;
      const inner = side * 0.6;
      ctx.fillRect(sx - inner / 2, sy - inner / 2, inner, inner);
      // Crown-like notches on top
      ctx.fillStyle = outline;
      const notchH = 6;
      const notchW = 6;
      for (let i = -1; i <= 1; i++) {
        ctx.fillRect(sx + i * notchW * 1.6 - notchW / 2, sy - side / 2 - notchH, notchW, notchH);
      }
      return;
    }
    case "bomber": {
      const armed = e.armed;
      const phase = e.pulsePhase * BOMBER_PULSE_HZ;
      const pulseOn = armed && Math.floor(phase) % 2 === 0;
      ctx.fillStyle = pulseOn ? BOMBER_HIGHLIGHT_COLOR : armed ? BOMBER_ARMED_DIM : BOMBER_COLOR;
      ctx.beginPath();
      ctx.arc(sx, sy, r, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = BOMBER_HIGHLIGHT_COLOR;
      ctx.beginPath();
      ctx.arc(sx - r * 0.25, sy - r * 0.25, r * 0.3, 0, Math.PI * 2);
      ctx.fill();
      return;
    }
    case "shielded":
      ctx.fillStyle = SHIELDED_OUTLINE;
      ctx.beginPath();
      ctx.arc(sx, sy, r + 1, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = SHIELDED_COLOR;
      ctx.beginPath();
      ctx.arc(sx, sy, r, 0, Math.PI * 2);
      ctx.fill();
      return;
    case "caster": {
      ctx.fillStyle = CASTER_OUTLINE;
      ctx.beginPath();
      ctx.arc(sx, sy, r + 1, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = CASTER_COLOR;
      ctx.beginPath();
      ctx.arc(sx, sy, r, 0, Math.PI * 2);
      ctx.fill();
      const corePulse = 0.6 + 0.4 * Math.sin(state.time * 6 + e.id);
      const coreR = r * 0.45 * corePulse;
      const prev = ctx.globalAlpha;
      ctx.globalAlpha = 0.85;
      ctx.fillStyle = CASTER_CORE_COLOR;
      ctx.beginPath();
      ctx.arc(sx, sy, coreR, 0, Math.PI * 2);
      ctx.fill();
      if (e.castPhase === "channeling") {
        ctx.globalAlpha = 0.55;
        ctx.fillStyle = CASTER_GLOW_COLOR;
        ctx.beginPath();
        ctx.arc(sx, sy, r * 1.3, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = prev;
      return;
    }
    case "chaser":
    default:
      ctx.fillStyle = ENEMY_COLOR;
      ctx.beginPath();
      ctx.arc(sx, sy, r, 0, Math.PI * 2);
      ctx.fill();
      return;
  }
}

function drawShield(
  ctx: CanvasRenderingContext2D,
  e: Enemy & { species: "shielded" },
  sx: number,
  sy: number
): void {
  const shieldR = e.radius + SHIELDED_SHIELD_OFFSET;
  const prev = ctx.globalAlpha;

  if (e.shieldHp > 0 && e.shieldHpMax > 0) {
    const frac = e.shieldHp / e.shieldHpMax;
    const sweep = Math.PI * 2 * frac;
    const start = -Math.PI / 2;
    const end = start + sweep;
    const blend = 1 - frac;
    const color = lerpHexColor(SHIELDED_SHIELD_FULL_COLOR, SHIELDED_SHIELD_LOW_COLOR, blend);
    ctx.globalAlpha = 0.9;
    ctx.strokeStyle = color;
    ctx.lineWidth = SHIELDED_SHIELD_WIDTH;
    ctx.beginPath();
    ctx.arc(sx, sy, shieldR, start, end);
    ctx.stroke();
  }

  if (e.shieldBreakTtl > 0) {
    const f = e.shieldBreakTtl / SHIELDED_BREAK_TTL;
    ctx.globalAlpha = f;
    ctx.strokeStyle = SHIELDED_SHARD_COLOR;
    ctx.lineWidth = 2;
    const grow = (1 - f) * SHIELDED_SHARD_LENGTH;
    for (let i = 0; i < SHIELDED_SHARD_COUNT; i++) {
      const a = (Math.PI * 2 * i) / SHIELDED_SHARD_COUNT;
      const x1 = sx + Math.cos(a) * (shieldR + 2);
      const y1 = sy + Math.sin(a) * (shieldR + 2);
      const x2 = sx + Math.cos(a) * (shieldR + 2 + grow);
      const y2 = sy + Math.sin(a) * (shieldR + 2 + grow);
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }
  }
  ctx.globalAlpha = prev;
}

function drawBossSlamTelegraph(
  ctx: CanvasRenderingContext2D,
  e: Enemy & { species: "boss_brute_lord" },
  sx: number,
  sy: number
): void {
  const t = 1 - Math.max(0, e.slamWindupTimer / BOSS_SLAM_WINDUP);
  const prev = ctx.globalAlpha;
  ctx.globalAlpha = 0.25 + 0.6 * t;
  ctx.fillStyle = BOSS_SLAM_TELEGRAPH_FILL;
  ctx.beginPath();
  ctx.arc(sx, sy, BOSS_SLAM_RADIUS * (0.4 + 0.6 * t), 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 0.7 + 0.3 * t;
  ctx.strokeStyle = BOSS_SLAM_TELEGRAPH_RING;
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(sx, sy, BOSS_SLAM_RADIUS * (0.4 + 0.6 * t), 0, Math.PI * 2);
  ctx.stroke();
  ctx.globalAlpha = prev;
}

function drawBossHpBar(ctx: CanvasRenderingContext2D, state: GameState): void {
  let boss: (Enemy & { species: "boss_brute_lord" }) | null = null;
  for (const e of state.enemies) {
    if (e.species === "boss_brute_lord" && e.alive) {
      boss = e;
      break;
    }
  }
  if (!boss) return;

  const { width } = state.viewport;
  const barW = Math.round(width * BOSS_HP_BAR_WIDTH_FRAC);
  const barH = BOSS_HP_BAR_HEIGHT;
  const barX = Math.round((width - barW) / 2);
  const barY = 24;

  const frac = Math.max(0, Math.min(1, boss.hp / boss.maxHp));
  let fill = BOSS_HP_BAR_FULL;
  if (frac < 0.25) fill = BOSS_HP_BAR_LOW;
  else if (frac < 0.5) fill = BOSS_HP_BAR_HALF;

  ctx.fillStyle = BOSS_HP_BAR_BG_COLOR;
  ctx.fillRect(barX - 2, barY - 2, barW + 4, barH + 4);
  ctx.strokeStyle = BOSS_HP_BAR_BORDER;
  ctx.lineWidth = 2;
  ctx.strokeRect(barX - 2, barY - 2, barW + 4, barH + 4);

  ctx.fillStyle = "#1a0707";
  ctx.fillRect(barX, barY, barW, barH);
  ctx.fillStyle = fill;
  ctx.fillRect(barX, barY, Math.max(0, Math.round(barW * frac)), barH);

  ctx.font = BOSS_HP_BAR_LABEL_FONT;
  ctx.fillStyle = "#e6e9ef";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(
    `BRUTE LORD - WINDOW ${boss.windowIndex}    ${Math.max(0, Math.round(boss.hp))} / ${boss.maxHp}`,
    barX + barW / 2,
    barY + barH / 2
  );
}

function drawBruteSlamTelegraph(
  ctx: CanvasRenderingContext2D,
  e: Enemy & { species: "brute" },
  sx: number,
  sy: number
): void {
  const t = 1 - Math.max(0, e.slamWindupTimer / BRUTE_SLAM_WINDUP);
  const prev = ctx.globalAlpha;
  ctx.globalAlpha = 0.2 + 0.55 * t;
  ctx.fillStyle = BRUTE_SLAM_TELEGRAPH_FILL;
  ctx.beginPath();
  ctx.arc(sx, sy, BRUTE_SLAM_RADIUS * (0.4 + 0.6 * t), 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 0.6 + 0.4 * t;
  ctx.strokeStyle = BRUTE_SLAM_TELEGRAPH_RING;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(sx, sy, BRUTE_SLAM_RADIUS * (0.4 + 0.6 * t), 0, Math.PI * 2);
  ctx.stroke();
  ctx.globalAlpha = prev;
}

function lerpHexColor(a: string, b: string, t: number): string {
  const ar = parseInt(a.slice(1, 3), 16);
  const ag = parseInt(a.slice(3, 5), 16);
  const ab = parseInt(a.slice(5, 7), 16);
  const br = parseInt(b.slice(1, 3), 16);
  const bg = parseInt(b.slice(3, 5), 16);
  const bb = parseInt(b.slice(5, 7), 16);
  const r = Math.round(ar + (br - ar) * t);
  const g = Math.round(ag + (bg - ag) * t);
  const bl = Math.round(ab + (bb - ab) * t);
  return `rgb(${r}, ${g}, ${bl})`;
}

function drawCasterTelegraph(
  ctx: CanvasRenderingContext2D,
  e: Enemy & { species: "caster" },
  width: number,
  height: number,
  camX: number,
  camY: number
): void {
  if (e.castPhase === "channeling") {
    const t = 1 - Math.max(0, e.castPhaseTimer / CASTER_CHANNEL_TIME);
    const cx = width / 2 + (e.castTargetX - camX);
    const cy = height / 2 + (e.castTargetY - camY);
    const prev = ctx.globalAlpha;
    ctx.globalAlpha = 0.18 + 0.55 * t;
    ctx.fillStyle = CASTER_AOE_FILL_COLOR;
    ctx.beginPath();
    ctx.arc(cx, cy, CASTER_AOE_RADIUS, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 0.7 + 0.3 * t;
    ctx.strokeStyle = CASTER_AOE_RING_COLOR;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(cx, cy, CASTER_AOE_RADIUS, 0, Math.PI * 2);
    ctx.stroke();
    ctx.globalAlpha = prev;
  }

  if (e.attackFlashTtl > 0) {
    const cx = width / 2 + (e.castTargetX - camX);
    const cy = height / 2 + (e.castTargetY - camY);
    const f = e.attackFlashTtl / CASTER_FLASH_DURATION;
    const prev = ctx.globalAlpha;
    ctx.globalAlpha = f;
    ctx.fillStyle = CASTER_AOE_STRIKE_COLOR;
    ctx.beginPath();
    ctx.arc(cx, cy, CASTER_AOE_RADIUS * (0.85 + (1 - f) * 0.5), 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = prev;
  }
}

function drawExplosions(
  ctx: CanvasRenderingContext2D,
  state: GameState,
  camX: number,
  camY: number
): void {
  if (state.explosions.length === 0) return;
  const { width, height } = state.viewport;
  for (const ex of state.explosions) {
    const t = 1 - Math.max(0, ex.ttl / ex.ttlMax);
    const sx = width / 2 + (ex.pos.x - camX);
    const sy = height / 2 + (ex.pos.y - camY);
    const r = ex.radius * (0.4 + 0.6 * t);
    const prev = ctx.globalAlpha;
    ctx.globalAlpha = 1 - t;
    ctx.fillStyle = ex.innerColor;
    ctx.beginPath();
    ctx.arc(sx, sy, r * 0.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = ex.outerColor;
    ctx.lineWidth = ex.ringWidth;
    ctx.beginPath();
    ctx.arc(sx, sy, r, 0, Math.PI * 2);
    ctx.stroke();
    ctx.globalAlpha = prev;
  }
}

function drawBomberVignette(
  ctx: CanvasRenderingContext2D,
  state: GameState
): void {
  if (state.bomberVignetteTtl <= 0) return;
  const { width, height } = state.viewport;
  const t = state.bomberVignetteTtl / BOMBER_VIGNETTE_DURATION;
  const grad = ctx.createRadialGradient(
    width / 2,
    height / 2,
    Math.min(width, height) * 0.25,
    width / 2,
    height / 2,
    Math.max(width, height) * 0.6
  );
  grad.addColorStop(0, BOMBER_VIGNETTE_INNER);
  grad.addColorStop(1, BOMBER_VIGNETTE_OUTER);
  const prev = ctx.globalAlpha;
  ctx.globalAlpha = t;
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);
  ctx.globalAlpha = prev;
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
  for (const p of state.projectiles) {
    if (!p.alive) continue;
    ctx.fillStyle = p.color ?? PROJECTILE_COLOR;
    const px = p.prevPos.x + (p.pos.x - p.prevPos.x) * alpha;
    const py = p.prevPos.y + (p.pos.y - p.prevPos.y) * alpha;
    const sx = width / 2 + (px - camX);
    const sy = height / 2 + (py - camY);
    ctx.beginPath();
    ctx.arc(sx, sy, p.radius || PROJECTILE_RADIUS, 0, Math.PI * 2);
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
  const halfW = width / 2;
  const halfH = height / 2;

  // Trails first so the orb itself draws on top.
  const orbWeapon = findOrbWeapon(state);
  if (orbWeapon && orbWeapon.evolved) {
    const prev = ctx.globalAlpha;
    ctx.strokeStyle = EVOLUTIONS.ORB.TRAIL_COLOR;
    ctx.lineWidth = EVOLUTIONS.ORB.TRAIL_WIDTH;
    ctx.lineCap = "round";
    const cutoff = state.time - EVOLUTIONS.ORB.TRAIL_DURATION;
    for (const orb of state.orbs) {
      if (orb.trailHistory.length < 2) continue;
      for (let i = 1; i < orb.trailHistory.length; i++) {
        const a = orb.trailHistory[i - 1];
        const b = orb.trailHistory[i];
        const age = state.time - b.t;
        if (age <= 0) continue;
        const t =
          1 - (b.t - cutoff) / EVOLUTIONS.ORB.TRAIL_DURATION;
        ctx.globalAlpha = Math.max(0, 1 - t);
        ctx.beginPath();
        ctx.moveTo(halfW + (a.x - camX), halfH + (a.y - camY));
        ctx.lineTo(halfW + (b.x - camX), halfH + (b.y - camY));
        ctx.stroke();
      }
    }
    ctx.globalAlpha = prev;
  }

  ctx.fillStyle = ORB_COLOR;
  for (const orb of state.orbs) {
    const ox = orb.prevPos.x + (orb.pos.x - orb.prevPos.x) * alpha;
    const oy = orb.prevPos.y + (orb.pos.y - orb.prevPos.y) * alpha;
    const sx = halfW + (ox - camX);
    const sy = halfH + (oy - camY);
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
  const auraColor = w.evolved ? EVOLUTIONS.AURA.TINT_COLOR : WEAPONS.AURA.COLOR;

  const prev = ctx.globalAlpha;
  ctx.fillStyle = auraColor;
  ctx.globalAlpha = baseAlpha + pulseAlpha;
  ctx.beginPath();
  ctx.arc(sx, sy, w.radius, 0, Math.PI * 2);
  ctx.fill();

  ctx.globalAlpha = 0.5 + 0.5 * pulse;
  ctx.lineWidth = 2;
  ctx.strokeStyle = auraColor;
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

function drawSolarBeam(
  ctx: CanvasRenderingContext2D,
  state: GameState,
  camX: number,
  camY: number
): void {
  const w = findLaserWeapon(state);
  if (!w || !w.evolved || w.beams.length === 0) return;
  const { width, height } = state.viewport;
  const halfW = width / 2;
  const halfH = height / 2;
  const sx = halfW + (state.player.pos.x - camX);
  const sy = halfH + (state.player.pos.y - camY);

  ctx.lineCap = "round";
  const prev = ctx.globalAlpha;
  for (const beam of w.beams) {
    const ex = halfW + (beam.endX - camX);
    const ey = halfH + (beam.endY - camY);

    ctx.strokeStyle = WEAPONS.LASER.COLOR;
    ctx.lineWidth = EVOLUTIONS.LASER.BEAM_WIDTH + 4;
    ctx.globalAlpha = 0.35;
    ctx.beginPath();
    ctx.moveTo(sx, sy);
    ctx.lineTo(ex, ey);
    ctx.stroke();

    ctx.globalAlpha = 1;
    ctx.lineWidth = EVOLUTIONS.LASER.BEAM_WIDTH;
    ctx.strokeStyle = "#ffffff";
    ctx.beginPath();
    ctx.moveTo(sx, sy);
    ctx.lineTo(ex, ey);
    ctx.stroke();
  }
  ctx.globalAlpha = prev;
}

function drawMinigunIndicator(
  ctx: CanvasRenderingContext2D,
  state: GameState,
  camX: number,
  camY: number
): void {
  const w = findMachineGunWeapon(state);
  if (!w || !w.evolved) return;
  if (w.spinUp <= 0.05) return;

  const { width, height } = state.viewport;
  const sx = width / 2 + (state.player.pos.x - camX);
  const sy = height / 2 + (state.player.pos.y - camY);

  const spinSpeed =
    EVOLUTIONS.MG.INDICATOR_SPIN_BASE +
    (EVOLUTIONS.MG.INDICATOR_SPIN_MAX - EVOLUTIONS.MG.INDICATOR_SPIN_BASE) * w.spinUp;
  const baseAngle = state.time * spinSpeed;
  const radius = EVOLUTIONS.MG.INDICATOR_RADIUS;

  const prev = ctx.globalAlpha;
  ctx.globalAlpha = 0.4 + 0.6 * w.spinUp;
  ctx.fillStyle = WEAPONS.MG.COLOR;
  for (let i = 0; i < 3; i++) {
    const a = baseAngle + (i * Math.PI * 2) / 3;
    const dx = sx + Math.cos(a) * radius;
    const dy = sy + Math.sin(a) * radius;
    ctx.beginPath();
    ctx.arc(dx, dy, EVOLUTIONS.MG.INDICATOR_DOT_RADIUS, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = prev;
}

function drawClusterBombs(
  ctx: CanvasRenderingContext2D,
  state: GameState,
  alpha: number,
  camX: number,
  camY: number
): void {
  if (state.clusterBombs.length === 0) return;
  const { width, height } = state.viewport;
  const halfW = width / 2;
  const halfH = height / 2;
  ctx.fillStyle = WEAPONS.CLUSTER.COLOR;
  for (const b of state.clusterBombs) {
    if (!b.alive) continue;
    const bx = b.prevPos.x + (b.pos.x - b.prevPos.x) * alpha;
    const by = b.prevPos.y + (b.pos.y - b.prevPos.y) * alpha;
    const sx = halfW + (bx - camX);
    const sy = halfH + (by - camY);
    ctx.beginPath();
    ctx.arc(sx, sy, b.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawGravityWells(
  ctx: CanvasRenderingContext2D,
  state: GameState,
  alpha: number,
  camX: number,
  camY: number
): void {
  if (state.gravityWells.length === 0) return;
  const { width, height } = state.viewport;
  const halfW = width / 2;
  const halfH = height / 2;

  for (const well of state.gravityWells) {
    if (!well.alive) continue;

    if (well.phase === "flying") {
      const wx = well.prevPos.x + (well.pos.x - well.prevPos.x) * alpha;
      const wy = well.prevPos.y + (well.pos.y - well.prevPos.y) * alpha;
      const sx = halfW + (wx - camX);
      const sy = halfH + (wy - camY);

      const pulse = 0.6 + 0.4 * Math.sin(state.time * 12);
      const prev = ctx.globalAlpha;
      ctx.globalAlpha = 0.45 * pulse;
      ctx.fillStyle = SINGULARITY_PROJECTILE_GLOW;
      ctx.beginPath();
      ctx.arc(sx, sy, SINGULARITY_PROJECTILE_RADIUS * 1.7, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.fillStyle = SINGULARITY_PROJECTILE_COLOR;
      ctx.beginPath();
      ctx.arc(sx, sy, SINGULARITY_PROJECTILE_RADIUS, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = prev;
      continue;
    }

    // Active or fading -- stationary swirl.
    const sx = halfW + (well.pos.x - camX);
    const sy = halfH + (well.pos.y - camY);
    const fadeFactor =
      well.phase === "fading" ? Math.max(0, well.fadeTtl / SINGULARITY_FADE_DURATION) : 1;
    const radius = well.radius * fadeFactor;
    const lifeT =
      well.phase === "active" ? 1 - well.ttl / SINGULARITY_DURATION : 1;

    const prev = ctx.globalAlpha;

    // Outer dark fill.
    ctx.globalAlpha = 0.45 * fadeFactor;
    ctx.fillStyle = SINGULARITY_WELL_INNER;
    ctx.beginPath();
    ctx.arc(sx, sy, radius, 0, Math.PI * 2);
    ctx.fill();

    // Tint overlay.
    ctx.globalAlpha = 0.5 * fadeFactor;
    ctx.fillStyle = SINGULARITY_TINT_COLOR;
    ctx.beginPath();
    ctx.arc(sx, sy, radius * 0.7, 0, Math.PI * 2);
    ctx.fill();

    // Rotating ring at radius edge: 4 short arcs.
    ctx.globalAlpha = 0.85 * fadeFactor;
    ctx.lineWidth = 2;
    ctx.strokeStyle = SINGULARITY_WELL_RING;
    const baseAngle = state.time * 4 + lifeT * 2;
    for (let i = 0; i < 4; i++) {
      const start = baseAngle + (i * Math.PI) / 2;
      ctx.beginPath();
      ctx.arc(sx, sy, radius, start, start + Math.PI / 4);
      ctx.stroke();
    }

    // Inner spinning rune lines pulled inward.
    ctx.globalAlpha = 0.6 * fadeFactor;
    ctx.lineWidth = 1.5;
    for (let i = 0; i < 6; i++) {
      const a = baseAngle * -1.7 + (i * Math.PI) / 3;
      const r1 = radius * 0.65;
      const r2 = radius * 0.4;
      ctx.beginPath();
      ctx.moveTo(sx + Math.cos(a) * r1, sy + Math.sin(a) * r1);
      ctx.lineTo(sx + Math.cos(a) * r2, sy + Math.sin(a) * r2);
      ctx.stroke();
    }

    ctx.globalAlpha = prev;
  }
}

function drawRepulsorPulse(
  ctx: CanvasRenderingContext2D,
  state: GameState,
  camX: number,
  camY: number
): void {
  const w = findRepulsorWeapon(state);
  if (!w || w.pulseVizTtl <= 0) return;
  const { width, height } = state.viewport;
  const sx = width / 2 + (state.player.pos.x - camX);
  const sy = height / 2 + (state.player.pos.y - camY);

  const t = 1 - w.pulseVizTtl / WEAPONS.REPULSOR.VIZ_DURATION;
  const radius = w.pulseVizRadius * t;
  const alpha = w.pulseVizTtl / WEAPONS.REPULSOR.VIZ_DURATION;

  const prev = ctx.globalAlpha;
  ctx.globalAlpha = alpha;
  ctx.lineWidth = 3;
  ctx.strokeStyle = WEAPONS.REPULSOR.COLOR;
  ctx.beginPath();
  ctx.arc(sx, sy, radius, 0, Math.PI * 2);
  ctx.stroke();
  ctx.globalAlpha = prev;
}

function drawSwordSwing(
  ctx: CanvasRenderingContext2D,
  state: GameState,
  camX: number,
  camY: number
): void {
  const w = findSwordWeapon(state);
  if (!w || w.swingTtl <= 0) return;
  const { width, height } = state.viewport;
  const sx = width / 2 + (state.player.pos.x - camX);
  const sy = height / 2 + (state.player.pos.y - camY);

  const dur = WEAPONS.SWORD.SWING_DURATION;
  const progress = 1 - w.swingTtl / dur;
  const leadingAngle =
    w.swingFromAngle + (w.swingToAngle - w.swingFromAngle) * progress;
  const alpha = Math.min(1, (w.swingTtl / dur) * 1.6);

  const fillColor = w.evolved ? EVOLUTIONS.SWORD.BEAM_GLOW : WEAPONS.SWORD.COLOR;
  const lineColor = w.evolved ? EVOLUTIONS.SWORD.BEAM_COLOR : WEAPONS.SWORD.COLOR;

  const prev = ctx.globalAlpha;
  ctx.globalAlpha = alpha * 0.55;
  ctx.fillStyle = fillColor;
  ctx.beginPath();
  ctx.moveTo(sx, sy);
  ctx.arc(sx, sy, w.swingRange, w.swingFromAngle, leadingAngle);
  ctx.closePath();
  ctx.fill();

  ctx.globalAlpha = alpha;
  ctx.lineWidth = w.evolved ? 5 : 3;
  ctx.strokeStyle = lineColor;
  ctx.beginPath();
  ctx.moveTo(sx, sy);
  ctx.lineTo(
    sx + Math.cos(leadingAngle) * w.swingRange,
    sy + Math.sin(leadingAngle) * w.swingRange
  );
  ctx.stroke();
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

function drawPlasmaFields(
  ctx: CanvasRenderingContext2D,
  state: GameState,
  camX: number,
  camY: number
): void {
  if (state.plasmaFields.length === 0) return;
  const { width, height } = state.viewport;
  const halfW = width / 2;
  const halfH = height / 2;

  const prev = ctx.globalAlpha;
  for (const f of state.plasmaFields) {
    if (f.ttl <= 0) continue;
    const fade = Math.max(0, Math.min(1, f.ttl / f.ttlMax));
    const sx = halfW + (f.pos.x - camX);
    const sy = halfH + (f.pos.y - camY);
    const pulse = 0.5 + 0.5 * Math.sin(state.time * 8);

    ctx.fillStyle = EVOLUTIONS.MINES.FIELD_COLOR;
    ctx.globalAlpha = 0.18 * fade;
    ctx.beginPath();
    ctx.arc(sx, sy, f.radius, 0, Math.PI * 2);
    ctx.fill();

    ctx.lineWidth = 2;
    ctx.strokeStyle = EVOLUTIONS.MINES.FIELD_COLOR;
    ctx.globalAlpha = 0.6 * fade;
    ctx.beginPath();
    ctx.arc(sx, sy, f.radius, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = EVOLUTIONS.MINES.FIELD_INNER_COLOR;
    ctx.globalAlpha = (0.25 + 0.25 * pulse) * fade;
    ctx.beginPath();
    ctx.arc(sx, sy, f.radius * 0.55, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = prev;
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

function drawExtractionZone(
  ctx: CanvasRenderingContext2D,
  state: GameState,
  camX: number,
  camY: number
): void {
  const z = state.extraction;
  if (!z) return;
  const { width, height } = state.viewport;
  const sx = width / 2 + (z.pos.x - camX);
  const sy = height / 2 + (z.pos.y - camY);

  const wave = 0.5 + 0.5 * Math.sin((state.time / EXTRACT_PULSE_PERIOD) * Math.PI * 2);
  const innerR =
    EXTRACT_INNER_RADIUS_MIN + (EXTRACT_INNER_RADIUS_MAX - EXTRACT_INNER_RADIUS_MIN) * wave;

  const prev = ctx.globalAlpha;
  ctx.fillStyle = EXTRACT_COLOR;
  ctx.globalAlpha = 0.18;
  ctx.beginPath();
  ctx.arc(sx, sy, z.radius, 0, Math.PI * 2);
  ctx.fill();

  ctx.globalAlpha = 0.85;
  ctx.lineWidth = 3;
  ctx.strokeStyle = EXTRACT_COLOR;
  ctx.beginPath();
  ctx.arc(sx, sy, z.radius, 0, Math.PI * 2);
  ctx.stroke();

  ctx.globalAlpha = 0.5 + 0.4 * wave;
  ctx.beginPath();
  ctx.arc(sx, sy, innerR, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = prev;
}

function drawExtractionArrow(
  ctx: CanvasRenderingContext2D,
  state: GameState,
  camX: number,
  camY: number
): void {
  const z = state.extraction;
  if (!z) return;
  const { width, height } = state.viewport;
  const halfW = width / 2;
  const halfH = height / 2;
  const sx = halfW + (z.pos.x - camX);
  const sy = halfH + (z.pos.y - camY);

  const onScreen = sx >= 0 && sx <= width && sy >= 0 && sy <= height;
  if (onScreen) return;

  const dx = sx - halfW;
  const dy = sy - halfH;
  const len = Math.hypot(dx, dy);
  if (len < 1) return;

  const margin = EXTRACT_ARROW_MARGIN;
  const maxX = width - margin - halfW;
  const minX = margin - halfW;
  const maxY = height - margin - halfH;
  const minY = margin - halfH;

  let t = Infinity;
  if (dx > 0) t = Math.min(t, maxX / dx);
  else if (dx < 0) t = Math.min(t, minX / dx);
  if (dy > 0) t = Math.min(t, maxY / dy);
  else if (dy < 0) t = Math.min(t, minY / dy);

  const ax = halfW + dx * t;
  const ay = halfH + dy * t;
  const angle = Math.atan2(dy, dx);

  ctx.save();
  ctx.translate(ax, ay);
  ctx.rotate(angle);
  ctx.fillStyle = EXTRACT_COLOR;
  ctx.beginPath();
  const s = EXTRACT_ARROW_SIZE;
  ctx.moveTo(s, 0);
  ctx.lineTo(-s * 0.6, s * 0.6);
  ctx.lineTo(-s * 0.6, -s * 0.6);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  const dist = Math.round(
    Math.hypot(z.pos.x - state.player.pos.x, z.pos.y - state.player.pos.y)
  );
  ctx.fillStyle = EXTRACT_COLOR;
  ctx.font = HUD_FONT;
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  ctx.fillText(`${dist}px`, ax, ay + s + 4);
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
  const prevFont = ctx.font;
  ctx.font = "12px ui-monospace, Menlo, monospace";
  ctx.fillStyle = "#8a93a6";
  ctx.fillText(`+${gemValueForTime(state.time)} XP/gem`, 12, 50);
  ctx.font = prevFont;
  ctx.fillStyle = HUD_COLOR;
  ctx.fillText(`DMG x${state.player.globalDamageMult.toFixed(2)}`, 12, 68);
  ctx.fillText(`Kills: ${state.killCount}`, 12, 88);
  const salvageMult = getSalvageMultiplier(state.save);
  const displayScrap = Math.floor(state.player.runScrap * salvageMult);
  ctx.fillStyle = WORKSHOP_SCRAP_COLOR;
  ctx.fillText(`Run Scrap: ${displayScrap}`, 12, 108);
  ctx.fillStyle = HUD_COLOR;

  ctx.textAlign = "center";
  ctx.fillText(formatTime(state.time), state.viewport.width / 2, 12);
  ctx.fillText(`Threat: ${currentThreatLevel(state.time)}`, state.viewport.width / 2, 32);

  drawExtractionStatus(ctx, state);
  drawWeaponStats(ctx, state);
  drawWeaponList(ctx, state);
  drawDashHud(ctx, state);
  drawLiveDps(ctx, state);
  drawBossHpBar(ctx, state);
}

function drawLiveDps(ctx: CanvasRenderingContext2D, state: GameState): void {
  const { width, height } = state.viewport;
  const dps = Math.round(liveDps(state));
  const text = `DPS: ${dps}`;
  ctx.font = "12px ui-monospace, Menlo, monospace";
  ctx.fillStyle = "#a8b1c2";
  ctx.textAlign = "right";
  ctx.textBaseline = "top";
  ctx.fillText(text, width - 12, height - 14 - 14);
}

function drawDashHud(ctx: CanvasRenderingContext2D, state: GameState): void {
  const { height } = state.viewport;
  const p = state.player;
  const cx = 12 + DASH_HUD_ICON_RADIUS;
  const cy = height - 14 - DASH_HUD_ICON_RADIUS;
  const ready = p.dashCooldown <= 0;

  ctx.fillStyle = "#1a1f29";
  ctx.beginPath();
  ctx.arc(cx, cy, DASH_HUD_ICON_RADIUS, 0, Math.PI * 2);
  ctx.fill();

  if (ready) {
    ctx.fillStyle = DASH_HUD_READY_COLOR;
    ctx.beginPath();
    ctx.arc(cx, cy, DASH_HUD_ICON_RADIUS - 2, 0, Math.PI * 2);
    ctx.fill();
  } else if (p.dashCooldownMax > 0) {
    const frac = 1 - p.dashCooldown / p.dashCooldownMax;
    const start = -Math.PI / 2;
    const end = start + Math.PI * 2 * frac;
    ctx.fillStyle = DASH_HUD_PROGRESS_COLOR;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, DASH_HUD_ICON_RADIUS - 2, start, end);
    ctx.closePath();
    ctx.fill();
  }

  ctx.font = HUD_FONT;
  ctx.textBaseline = "middle";
  ctx.textAlign = "left";
  const labelX = cx + DASH_HUD_ICON_RADIUS + 8;
  ctx.fillStyle = ready ? DASH_HUD_LABEL_COLOR : DASH_HUD_DIMMED_COLOR;
  ctx.fillText("DASH [SPACE]", labelX, cy);

  if (!ready) {
    const labelW = ctx.measureText("DASH [SPACE]").width;
    ctx.fillStyle = DASH_HUD_LABEL_COLOR;
    ctx.fillText(`${p.dashCooldown.toFixed(1)}s`, labelX + labelW + 10, cy);
  }
}

function drawExtractionStatus(
  ctx: CanvasRenderingContext2D,
  state: GameState
): void {
  const cx = state.viewport.width / 2;
  if (state.extraction) {
    const z = state.extraction;
    const pulse = 0.7 + 0.3 * Math.sin(state.time * EXTRACT_PULSE_HZ * Math.PI * 2);
    const prev = ctx.globalAlpha;
    ctx.globalAlpha = pulse;
    ctx.font = EXTRACT_ACTIVE_FONT;
    ctx.fillStyle = EXTRACT_COLOR;
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillText(
      `EXTRACT! ${Math.ceil(z.ttl)}s   ${z.multiplier.toFixed(1)}x`,
      cx,
      56
    );
    ctx.globalAlpha = prev;
    ctx.font = HUD_FONT;
    return;
  }
  const nextOpen = nextWindowOpenTime(state);
  const remaining = Math.max(0, nextOpen - state.time);
  const nextMult = getExtractMultiplier(state.nextExtractWindow);
  ctx.font = HUD_FONT;
  ctx.fillStyle = EXTRACT_COLOR;
  ctx.textAlign = "center";
  ctx.fillText(
    `Next extract: ${nextMult.toFixed(1)}x in ${formatTime(remaining)}`,
    cx,
    56
  );
  ctx.fillStyle = HUD_COLOR;
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
    const evolved = "evolved" in w && (w as { evolved: boolean }).evolved;
    const displayName =
      evolved && def.evolutionMod ? def.evolutionMod.name : def.name;
    const text = `${displayName.padEnd(5)}  ${def.getStats(w)}`;
    return { def, text, evolved };
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
    ctx.fillStyle = rows[i].evolved ? EVOLUTION_NAME_COLOR : HUD_COLOR;
    ctx.fillText(rows[i].text, startX + SWATCH + GAP, rowY);
  }
}

function drawWeaponStats(ctx: CanvasRenderingContext2D, state: GameState): void {
  const lines: string[] = [];
  const proj = findPistolWeapon(state);
  if (proj) {
    lines.push("PISTOL");
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

  const p = state.player;
  const passiveParts: string[] = [];
  if (p.critChance > 0) passiveParts.push(`Crit ${Math.round(p.critChance * 100)}%`);
  if (p.berserkerStacks > 0) passiveParts.push(`Berserker ${p.berserkerStacks}`);
  if (p.thornsStacks > 0) passiveParts.push(`Thorns ${p.thornsStacks}`);
  if (p.ironSkinStacks > 0) passiveParts.push(`Iron ${p.ironSkinStacks}`);
  if (passiveParts.length > 0) {
    if (lines.length > 0) lines.push("");
    lines.push(passiveParts.join(" / "));
  }

  ctx.font = HUD_FONT;
  ctx.fillStyle = HUD_COLOR;
  ctx.textAlign = "left";
  ctx.textBaseline = "bottom";
  const lineH = 18;
  const baseY = state.viewport.height - 12 - (DASH_HUD_ICON_RADIUS * 2 + 12);
  for (let i = 0; i < lines.length; i++) {
    ctx.fillText(lines[i], 12, baseY - (lines.length - 1 - i) * lineH);
  }
}

function currentThreatLevel(seconds: number): number {
  const minutes = seconds / 60;
  const knee = SCALING.threat.kneeMinutes;
  if (minutes <= knee) return Math.floor(minutes);
  return knee + Math.floor((minutes - knee) / SCALING.threat.lateMinutesPerTick);
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
  ctx.fillText("SELECT YOUR STARTING WEAPON", width / 2, STARTER_HEADER_TOP_PADDING);

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

function drawFirstPick(ctx: CanvasRenderingContext2D, state: GameState): void {
  drawLevelUpModal(ctx, state, "Choose Your First Upgrade");
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

  const PAD = 12;
  const innerW = card.w - PAD * 2;

  // Name
  ctx.font = STARTER_NAME_FONT;
  ctx.fillStyle = unlocked ? MODAL_TEXT : STARTER_LOCKED_TEXT;
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  ctx.fillText(truncateText(ctx, def.name, innerW), cx, card.y + 70);

  // Stats — built fresh from the def's create() snapshot so the screen
  // shows the unmodded baseline numbers, not whatever any active run had.
  ctx.font = STARTER_STATS_FONT;
  ctx.fillStyle = unlocked ? MODAL_DESC_TEXT : STARTER_LOCKED_TEXT;
  const blank = def.create();
  ctx.fillText(truncateText(ctx, def.getStats(blank), innerW), cx, card.y + 100);

  // Status — bottom-anchored, wraps when long
  ctx.font = STARTER_LOCK_FONT;
  let text: string;
  if (!unlocked) {
    ctx.fillStyle = STARTER_LOCKED_TEXT;
    text = `Locked — ${getUnlockText(id)}`;
  } else if (selected) {
    ctx.fillStyle = STARTER_SELECT_BORDER;
    text = "SELECTED";
  } else {
    ctx.fillStyle = MODAL_DESC_TEXT;
    text = "Click to select";
  }
  const lines = wrapText(ctx, text, innerW);
  const lineH = 14;
  const totalH = lines.length * lineH;
  const startY = card.y + card.h - totalH - PAD;
  for (let i = 0; i < lines.length; i++) {
    ctx.fillText(lines[i], cx, startY + i * lineH);
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

  const PAD = 12;
  const innerW = card.w - PAD * 2;

  ctx.font = WORKSHOP_NAME_FONT;
  ctx.fillStyle = MODAL_TEXT;
  ctx.fillText(truncateText(ctx, def.name, innerW), card.x + PAD, card.y + 12);

  ctx.font = WORKSHOP_DESC_FONT;
  ctx.fillStyle = MODAL_DESC_TEXT;
  const descLines = wrapText(ctx, def.desc, innerW);
  let dy = card.y + 36;
  for (const line of descLines) {
    ctx.fillText(line, card.x + PAD, dy);
    dy += 16;
  }

  ctx.font = WORKSHOP_VALUE_FONT;
  ctx.fillStyle = MODAL_TEXT;
  ctx.fillText(`Tier ${tier}/${def.maxTier}`, card.x + PAD, card.y + 80);

  ctx.fillStyle = WORKSHOP_SCRAP_COLOR;
  if (isMaxed) ctx.fillText("MAXED", card.x + PAD, card.y + 100);
  else ctx.fillText(`Cost: ${cost}`, card.x + PAD, card.y + 100);

  const buy = getWorkshopBuyRect(card);
  const buyLabel = isMaxed ? "MAX" : "Buy";
  drawButton(ctx, buy, buyLabel, state.input.mouse, isMaxed || !canAfford);
}

function drawLevelUpModal(
  ctx: CanvasRenderingContext2D,
  state: GameState,
  title?: string
): void {
  const offer = state.offer;
  if (!offer) return;
  const { width, height } = state.viewport;

  ctx.fillStyle = MODAL_BG;
  ctx.fillRect(0, 0, width, height);

  ctx.font = MODAL_TITLE_FONT;
  ctx.fillStyle = MODAL_TEXT;
  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";
  ctx.fillText(
    title ?? `LEVEL ${state.player.level}`,
    width / 2,
    height / 2 - 200
  );

  const rects = getCardRects(state);
  const mx = state.input.mouse.x;
  const my = state.input.mouse.y;

  const PAD = 12;
  for (let i = 0; i < offer.length; i++) {
    const r = rects[i];
    const hover = mx >= r.x && mx <= r.x + r.w && my >= r.y && my <= r.y + r.h;
    const mod = offer[i];
    const isEvo = !!mod.isEvolution;

    ctx.fillStyle = hover ? MODAL_CARD_BG_HOVER : MODAL_CARD_BG;
    ctx.fillRect(r.x, r.y, r.w, r.h);
    if (isEvo) {
      ctx.lineWidth = 3;
      ctx.strokeStyle = EVOLUTION_BORDER_COLOR;
      ctx.strokeRect(r.x + 1.5, r.y + 1.5, r.w - 3, r.h - 3);
    } else {
      ctx.lineWidth = 2;
      ctx.strokeStyle = hover ? MODAL_CARD_BORDER_HOVER : MODAL_CARD_BORDER;
      ctx.strokeRect(r.x + 1, r.y + 1, r.w - 2, r.h - 2);
    }

    drawModCardTag(ctx, r, mod);

    const cx = r.x + r.w / 2;
    const innerW = r.w - PAD * 2;

    ctx.font = MODAL_NAME_FONT;
    ctx.fillStyle = isEvo ? EVOLUTION_NAME_COLOR : MODAL_TEXT;
    ctx.textAlign = "center";
    ctx.textBaseline = "alphabetic";
    ctx.fillText(truncateText(ctx, mod.name, innerW), cx, r.y + MOD_TAG_HEIGHT + 50);

    let dy = r.y + MOD_TAG_HEIGHT + 90;
    if (isEvo) {
      const def = getWeaponDefForMod(mod.id);
      if (def) {
        ctx.font = EVOLUTION_SUBLINE_FONT;
        ctx.fillStyle = MODAL_DESC_TEXT;
        ctx.fillText(
          truncateText(ctx, `evolves ${def.name}`, innerW),
          cx,
          r.y + MOD_TAG_HEIGHT + 72
        );
      }
      dy = r.y + MOD_TAG_HEIGHT + 102;
    }

    ctx.font = MODAL_DESC_FONT;
    ctx.fillStyle = MODAL_DESC_TEXT;
    const descLines = wrapText(ctx, mod.desc, innerW);
    for (const line of descLines) {
      ctx.fillText(line, cx, dy);
      dy += 18;
    }
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
  outcome: "extracted" | "lost"
): void {
  const { width, height } = state.viewport;

  ctx.fillStyle = MODAL_BG;
  ctx.fillRect(0, 0, width, height);

  // Title
  ctx.font = END_TITLE_FONT;
  ctx.fillStyle = outcome === "extracted" ? END_WON_COLOR : END_LOST_COLOR;
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  ctx.fillText(outcome === "extracted" ? "EXTRACTED" : "DEAD", width / 2, 40);

  // Two-column body
  const colGap = 40;
  const colW = 320;
  const bodyW = colW * 2 + colGap;
  const bodyX = (width - bodyW) / 2;
  const bodyY = 130;
  const colHeight = 200;

  drawEndStatsColumn(ctx, state, bodyX, bodyY, colW, outcome);
  drawEndDamageBreakdown(ctx, state, bodyX + colW + colGap, bodyY, colW, colHeight);

  // Highlights
  drawEndHighlights(ctx, state, bodyX, bodyY + colHeight + 24, bodyW, outcome);

  drawButton(ctx, getEndScreenWorkshopRect(state), "Workshop", state.input.mouse, false);
  drawButton(ctx, getPlayAgainRect(state), "Play Again", state.input.mouse, false);
}

function drawEndStatsColumn(
  ctx: CanvasRenderingContext2D,
  state: GameState,
  x: number,
  y: number,
  w: number,
  outcome: "extracted" | "lost"
): void {
  ctx.font = "bold 16px ui-monospace, Menlo, monospace";
  ctx.fillStyle = MODAL_TEXT;
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText("RUN STATS", x, y);

  ctx.font = END_STATS_FONT;
  ctx.fillStyle = MODAL_TEXT;
  const lineH = 24;
  let row = y + 28;
  const lines: { label: string; value: string; color?: string }[] = [
    { label: "Time", value: formatTime(state.time) },
    { label: "Level", value: `${state.player.level}` },
    { label: "Kills", value: `${state.killCount}` },
    { label: "Damage Dealt", value: `${Math.round(state.totalDamageDealt)}` },
    { label: "Damage Taken", value: `${Math.round(state.totalDamageTaken)}` },
  ];
  for (const ln of lines) {
    ctx.fillStyle = MODAL_DESC_TEXT;
    ctx.textAlign = "left";
    ctx.fillText(ln.label, x, row);
    ctx.fillStyle = ln.color ?? MODAL_TEXT;
    ctx.textAlign = "right";
    ctx.fillText(ln.value, x + w, row);
    row += lineH;
  }

  ctx.fillStyle = MODAL_DESC_TEXT;
  ctx.textAlign = "left";
  if (outcome === "extracted") {
    ctx.fillText("Scrap Banked", x, row);
    ctx.fillStyle = WORKSHOP_SCRAP_COLOR;
    ctx.textAlign = "right";
    ctx.fillText(
      `+${state.scrapEarnedLastRun} (${state.extractMultiplierLastRun.toFixed(1)}x)`,
      x + w,
      row
    );
  } else {
    ctx.fillText("Scrap Lost", x, row);
    ctx.fillStyle = SCRAP_LOST_COLOR;
    ctx.textAlign = "right";
    ctx.fillText(`-${state.scrapLostLastRun}`, x + w, row);
  }
}

function drawEndDamageBreakdown(
  ctx: CanvasRenderingContext2D,
  state: GameState,
  x: number,
  y: number,
  w: number,
  h: number
): void {
  ctx.font = "bold 16px ui-monospace, Menlo, monospace";
  ctx.fillStyle = MODAL_TEXT;
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText("DAMAGE TAKEN", x, y);

  const total = state.totalDamageTaken;
  const sources = Object.entries(state.damageBySource).sort((a, b) => b[1] - a[1]);
  if (total <= 0 || sources.length === 0) {
    ctx.font = END_STATS_FONT;
    ctx.fillStyle = MODAL_DESC_TEXT;
    ctx.fillText("No damage taken", x, y + 32);
    return;
  }

  const rowH = 22;
  const labelW = 110;
  const pctW = 56;
  const barX = x + labelW + 4;
  const barEnd = x + w - pctW - 4;
  const barMax = Math.max(20, barEnd - barX);
  let row = y + 28;
  ctx.font = END_STATS_FONT;
  for (const [src, dmg] of sources) {
    if (row > y + h) break;
    const pct = dmg / total;
    ctx.fillStyle = MODAL_DESC_TEXT;
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    const label = DAMAGE_SOURCE_LABELS[src] ?? src;
    ctx.fillText(label, x, row + rowH / 2);

    ctx.fillStyle = "#1a1f29";
    ctx.fillRect(barX, row + 4, barMax, rowH - 8);
    ctx.fillStyle = DAMAGE_SOURCE_COLORS[src] ?? "#7a818f";
    ctx.fillRect(barX, row + 4, Math.max(2, barMax * pct), rowH - 8);

    ctx.fillStyle = MODAL_TEXT;
    ctx.textAlign = "right";
    ctx.fillText(`${Math.round(pct * 100)}%`, x + w, row + rowH / 2);
    row += rowH;
  }
}

function drawEndHighlights(
  ctx: CanvasRenderingContext2D,
  state: GameState,
  x: number,
  y: number,
  w: number,
  outcome: "extracted" | "lost"
): void {
  ctx.font = "bold 16px ui-monospace, Menlo, monospace";
  ctx.fillStyle = MODAL_TEXT;
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText("HIGHLIGHTS", x, y);

  ctx.font = END_STATS_FONT;
  let row = y + 28;
  const lineH = 22;

  if (state.bestMoment.dps > 0) {
    ctx.fillStyle = END_WON_COLOR;
    ctx.fillText(
      `Best Moment: ${Math.round(state.bestMoment.dps)} DPS at ${formatTime(state.bestMoment.time)}`,
      x,
      row
    );
    row += lineH;
  }
  if (state.worstMoment.damage > 0) {
    const src = state.worstMoment.dominantSource;
    const label = src ? DAMAGE_SOURCE_LABELS[src] ?? src : "unknown";
    ctx.fillStyle = END_LOST_COLOR;
    ctx.fillText(
      `Worst Moment: -${Math.round(state.worstMoment.damage)} HP in 3s at ${formatTime(state.worstMoment.time)} (mostly from ${label})`,
      x,
      row
    );
    row += lineH;
  }
  if (outcome === "lost" && state.causeOfDeath) {
    const label =
      DAMAGE_SOURCE_LABELS[state.causeOfDeath] ?? state.causeOfDeath;
    ctx.fillStyle = END_LOST_COLOR;
    ctx.fillText(`Killed by: ${label}`, x, row);
    row += lineH;
  }

  if (state.unlocksThisRun.length > 0) {
    row += 4;
    ctx.fillStyle = UNLOCK_LINE_COLOR;
    for (const a of state.unlocksThisRun) {
      ctx.fillText(`UNLOCKED: ${a.weaponName} (${a.desc})`, x, row);
      row += lineH;
    }
  }
  void w;
}
