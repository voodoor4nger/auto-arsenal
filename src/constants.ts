export const TICK_HZ = 60;
export const FIXED_DT = 1 / TICK_HZ;
export const MAX_FRAME_DT = 0.25;

export const PLAYER_SIZE = 24;
export const PLAYER_RADIUS = PLAYER_SIZE / 2;
export const PLAYER_SPEED = 180;
export const PLAYER_MAX_HP = 100;
export const PLAYER_COLOR = "#e23b3b";

export const PLAYER_IFRAME_DURATION = 0.5;
export const PLAYER_FLASH_HZ = 10;

export const ENEMY_RADIUS = 12;
export const ENEMY_HP = 20;
export const ENEMY_SPEED = 90;
export const ENEMY_CONTACT_DAMAGE = 10;
export const ENEMY_COLOR = "#7ad36b";
export const ENEMY_SPAWN_MARGIN = 80;

export const SCALING = {
  enemyHp: {
    earlyRatePerMin: 0.45,
    lateRatePerMin: 0.15,
    kneeMinutes: 8,
  },
  enemySpeed: {
    earlyRatePerMin: 0.10,
    kneeMinutes: 8,
  },
  spawnCount: {
    startCount: 1,
    midCount: 6,
    endCount: 8,
    kneeMinutes: 8,
    secondPhaseDurationMinutes: 7,
  },
  spawnInterval: {
    startSeconds: 1.5,
    kneeSeconds: 0.3,
    kneeMinutes: 8,
  },
  threat: {
    kneeMinutes: 8,
    lateMinutesPerTick: 2,
  },
} as const;

export const SHOOTER_RADIUS = 12;
export const SHOOTER_HP_MULT = 2.0;
export const SHOOTER_SPEED_MULT = 0.6;
export const SHOOTER_CONTACT_DAMAGE = 10;
export const SHOOTER_COLOR = "#e6c34a";
export const SHOOTER_RANGE = 250;
export const SHOOTER_FIRE_INTERVAL = 1.5;
export const SHOOTER_PROJ_SPEED = 180;
export const SHOOTER_PROJ_DAMAGE = 8;
export const SHOOTER_PROJ_RADIUS = 6;
export const SHOOTER_PROJ_LIFETIME = 4;
export const SHOOTER_PROJ_COLOR = "#ffd86b";
export const SHOOTER_SPAWN_WEIGHT_MAX = 0.30;
export const SHOOTER_SPAWN_RAMP_DURATION = 4 * 60;

export const BRUTE_HP_MULT = 6;
export const BRUTE_SPEED_MULT = 0.5;
export const BRUTE_CONTACT_DAMAGE = 30;
export const BRUTE_RADIUS_MULT = 2.0;
export const BRUTE_COLOR = "#5C2A6B";
export const BRUTE_OUTLINE = "#2D1438";
export const BRUTE_PLATING_COLOR = "#3a1846";
export const BRUTE_GEM_DROPS = 3;
export const BRUTE_GEM_SPREAD = 14;

export const BRUTE_SLAM_COOLDOWN = 4.0;
export const BRUTE_SLAM_RANGE = 200;
export const BRUTE_SLAM_WINDUP = 0.7;
export const BRUTE_SLAM_RADIUS = 110;
export const BRUTE_SLAM_DAMAGE = 35;
export const BRUTE_SLAM_TELEGRAPH_FILL = "rgba(232, 90, 58, 0.55)";
export const BRUTE_SLAM_TELEGRAPH_RING = "#ff7a2a";
export const BRUTE_SLAM_STRIKE_INNER = "#ffffff";
export const BRUTE_SLAM_STRIKE_OUTER = "#ff7a2a";
export const BRUTE_SLAM_STRIKE_TTL = 0.2;

export const BOMBER_HP_MULT = 0.7;
export const BOMBER_SPEED_MULT = 1.5;
export const BOMBER_CONTACT_DAMAGE = 0;
export const BOMBER_RADIUS_MULT = 0.9;
export const BOMBER_COLOR = "#E04A2A";
export const BOMBER_HIGHLIGHT_COLOR = "#ffae6b";
export const BOMBER_ARMED_DIM = "#8a2410";
export const BOMBER_ARM_RANGE = 100;
export const BOMBER_ARM_DURATION = 0.5;
export const BOMBER_PULSE_HZ = 10;
export const BOMBER_EXPLODE_RADIUS = 80;
export const BOMBER_EXPLODE_PLAYER_DMG = 35;
export const BOMBER_EXPLODE_ENEMY_DMG = 50;
export const EXPLOSION_TTL = 0.3;
export const EXPLOSION_RING_INNER = "#fff7c2";
export const EXPLOSION_RING_OUTER = "#ff7a2a";
export const BOMBER_VIGNETTE_DURATION = 0.4;
export const BOMBER_VIGNETTE_INNER = "rgba(224, 74, 42, 0)";
export const BOMBER_VIGNETTE_OUTER = "rgba(224, 74, 42, 0.32)";

export const SHIELDED_HP_MULT = 1;
export const SHIELDED_SPEED_MULT = 0.8;
export const SHIELDED_CONTACT_DAMAGE = 12;
export const SHIELDED_RADIUS_MULT = 1.1;
export const SHIELDED_COLOR = "#5A7A99";
export const SHIELDED_OUTLINE = "#2c3e54";
export const SHIELDED_SHIELD_HP = 200;
export const SHIELDED_SHIELD_OFFSET = 6;
export const SHIELDED_SHIELD_WIDTH = 3;
export const SHIELDED_SHIELD_FULL_COLOR = "#5af0ff";
export const SHIELDED_SHIELD_LOW_COLOR = "#ffffff";
export const SHIELDED_SHARD_COLOR = "#cdeefb";
export const SHIELDED_SHARD_COUNT = 7;
export const SHIELDED_SHARD_LENGTH = 18;
export const SHIELDED_BREAK_TTL = 0.25;

export const CASTER_HP_MULT = 1.5;
export const CASTER_SPEED_MULT = 0.7;
export const CASTER_CONTACT_DAMAGE = 8;
export const CASTER_RADIUS_MULT = 1.2;
export const CASTER_COLOR = "#3A6B3A";
export const CASTER_OUTLINE = "#1f3a1f";
export const CASTER_CORE_COLOR = "#5af0c8";
export const CASTER_GLOW_COLOR = "#9affe0";
export const CASTER_RANGE = 350;
export const CASTER_KEEP_DISTANCE_TOLERANCE = 30;
export const CASTER_CHANNEL_TIME = 1.5;
export const CASTER_AOE_RADIUS = 80;
export const CASTER_ATTACK_DAMAGE = 30;
export const CASTER_COOLDOWN = 2.5;
export const CASTER_AOE_RING_COLOR = "#e85a3a";
export const CASTER_AOE_FILL_COLOR = "rgba(232, 90, 58, 0.28)";
export const CASTER_AOE_STRIKE_COLOR = "rgba(255, 230, 200, 0.85)";
export const CASTER_FLASH_DURATION = 0.18;

export const BOSS_BRUTE_LORD_BASE_HP = 500;
export const BOSS_HP_SCALING = 1.5;
export const BOSS_SCRAP_BASE = 300;
export const BOSS_SCRAP_PER_WINDOW = 200;
export const BOSS_SPEED_MULT = 0.7;
export const BOSS_CONTACT_DAMAGE = 30;
export const BOSS_RADIUS_MULT = 3.5;
export const BOSS_COLOR = "#8B1A1A";
export const BOSS_OUTLINE = "#3a0a0a";
export const BOSS_PLATING_COLOR = "#5a0c0c";
export const BOSS_ENRAGED_COLOR = "#ff6b3a";
export const BOSS_ENRAGED_OUTLINE = "#7a2410";
export const BOSS_ENRAGED_PLATING_COLOR = "#cc3a18";
export const BOSS_SLAM_COOLDOWN = 3.0;
export const BOSS_SLAM_RANGE = 250;
export const BOSS_SLAM_WINDUP = 0.8;
export const BOSS_SLAM_RADIUS = 180;
export const BOSS_SLAM_DAMAGE = 50;
export const BOSS_SLAM_TELEGRAPH_FILL = "rgba(232, 50, 30, 0.55)";
export const BOSS_SLAM_TELEGRAPH_RING = "#ff5040";
export const BOSS_ROAR_HP_THRESHOLD = 0.5;
export const BOSS_ENRAGE_HP_THRESHOLD = 0.25;
export const BOSS_ENRAGE_SPEED_BONUS = 0.3;
export const BOSS_ENRAGE_SLAM_COOLDOWN = 2.0;
export const BOSS_ENRAGE_DAMAGE_MULT = 1.5;
export const BOSS_SPAWN_DISTANCE = 500;
export const BOSS_GEM_DROPS = 5;
export const BOSS_GEM_SPREAD = 28;
export const BOSS_HP_BAR_HEIGHT = 16;
export const BOSS_HP_BAR_WIDTH_FRAC = 0.6;
export const BOSS_HP_BAR_BG_COLOR = "rgba(0, 0, 0, 0.7)";
export const BOSS_HP_BAR_BORDER = "#0b0d10";
export const BOSS_HP_BAR_FULL = "#8B1A1A";
export const BOSS_HP_BAR_HALF = "#e23b3b";
export const BOSS_HP_BAR_LOW = "#ff7a2a";
export const BOSS_HP_BAR_LABEL_FONT = "bold 14px ui-monospace, Menlo, monospace";

export const TREASURE_CHEST_RADIUS = 22;
export const TREASURE_CHEST_BODY_COLOR = "#7a4a1a";
export const TREASURE_CHEST_OUTLINE_COLOR = "#3a2010";
export const TREASURE_CHEST_TRIM_COLOR = "#f5d76e";
export const TREASURE_CHEST_GLOW_COLOR = "rgba(245, 215, 110, 0.55)";

export type SpawnSpecies = "basic" | "shooter" | "brute" | "bomber" | "shielded" | "caster";
export const SPAWN_WEIGHTS_BY_MINUTE: ReadonlyArray<{
  untilMinute: number;
  weights: ReadonlyArray<readonly [SpawnSpecies, number]>;
}> = [
  { untilMinute: 1, weights: [["basic", 100]] },
  { untilMinute: 3, weights: [["basic", 70], ["shooter", 30]] },
  { untilMinute: 4, weights: [["basic", 60], ["shooter", 25], ["brute", 15]] },
  { untilMinute: 5, weights: [["basic", 60], ["shooter", 20], ["brute", 15], ["bomber", 5]] },
  { untilMinute: 6, weights: [["basic", 50], ["shooter", 20], ["brute", 15], ["bomber", 5], ["shielded", 10]] },
  {
    untilMinute: Infinity,
    weights: [["basic", 40], ["shooter", 15], ["brute", 15], ["bomber", 6], ["shielded", 14], ["caster", 10]],
  },
];

export const WEAPON_RANGE = 500;
export const WEAPON_STARTER_DAMAGE = 10;
export const WEAPON_STARTER_FIRE_RATE = 2;
export const WEAPON_STARTER_PROJECTILE_SPEED = 400;
export const WEAPON_STARTER_PROJECTILE_COUNT = 1;
export const WEAPON_STARTER_PIERCE = 0;
export const WEAPON_STARTER_HOMING = 0;

export const PROJECTILE_RADIUS = 4;
export const PROJECTILE_LIFETIME = 2;
export const PROJECTILE_COLOR = "#f0f5ff";

export const SPAWN_OFFSCREEN_MARGIN = 60;

export const PICKUP_DROP_CHANCE = 0.01;
export const PICKUP_TYPES = ["bomb", "magnet", "heart", "scrap_bag", "clock"] as const;
export const PICKUP_RADIUS = 18;
export const PICKUP_RENDER_SIZE = 36;
export const PICKUP_BOB_AMPLITUDE = 4;
export const PICKUP_BOB_PERIOD = 1.5;
export const PICKUP_GLOW_PERIOD = 1.0;
export const PICKUP_GLOW_MIN_ALPHA = 0.18;
export const PICKUP_GLOW_MAX_ALPHA = 0.45;

export const PICKUP_BOMB_DAMAGE = 9999;
export const BOMB_FLASH_DURATION = 0.3;
export const BOMB_FLASH_ALPHA = 0.6;
export const BOMB_SHOCKWAVE_DURATION = 0.55;
export const BOMB_SHOCKWAVE_MAX_RADIUS = 800;

export const MAGNET_PICKUP_SPEED = 800;
export const MAGNET_PULSE_DURATION = 0.4;
export const MAGNET_PULSE_RADIUS = 240;

export const HEART_HEAL_PCT = 0.30;
export const HEART_VIGNETTE_DURATION = 0.4;
export const HEART_VIGNETTE_INNER = "rgba(122, 211, 107, 0)";
export const HEART_VIGNETTE_OUTER = "rgba(122, 211, 107, 0.30)";

export const SCRAP_BAG_AMOUNT = 50;
export const SCRAP_BAG_VALUE_MIN = 50;
export const SCRAP_BAG_VALUE_MAX = 250;
export const SCRAP_BAG_TIER_MEDIUM_THRESHOLD = 100;
export const SCRAP_BAG_TIER_LARGE_THRESHOLD = 175;
export const SCRAP_BAG_SCALE_MEDIUM = 1.25;
export const SCRAP_BAG_SCALE_LARGE = 1.5;
export const SCRAP_BAG_SPARKLE_PERIOD = 0.3;
export const SCRAP_BAG_SPARKLE_COLOR = "#fff0a8";
export const SCRAP_BAG_LARGE_BAG_COLOR = "#9a7332";
export const SCRAP_BAG_LARGE_ACCENT_COLOR = "#fff0a8";
export const SCRAP_BAG_MEDIUM_ACCENT_COLOR = "#ffe27a";

export const CLOCK_FREEZE_DURATION = 3;
export const CLOCK_TINT_COLOR = "rgba(120, 180, 255, 0.10)";
export const CLOCK_VIGNETTE_DURATION = 0.4;
export const CLOCK_VIGNETTE_INNER = "rgba(120, 180, 255, 0)";
export const CLOCK_VIGNETTE_OUTER = "rgba(120, 180, 255, 0.30)";
export const CLOCK_FROZEN_TINT = "rgba(160, 210, 255, 0.55)";
export const CLOCK_FROZEN_RING_COLOR = "#a8d8ff";

export const FLOATING_TEXT_TTL = 1.0;
export const FLOATING_TEXT_VY = 36;
export const FLOATING_TEXT_FONT = "bold 14px ui-monospace, Menlo, monospace";

export const GEM_RADIUS = 5;
export const GEM_COLOR = "#5ad7ff";
export const GEM_XP_VALUE = 1;
export const GEM_SNAP_RADIUS = 18;
export const GEM_PULL_SPEED_MIN = 120;
export const GEM_PULL_SPEED_MAX = 600;

export const LEVEL_XP_START = 5;
export const LEVEL_XP_GROWTH = 1.5;

export const XP = {
  START: 5,
  EARLY_GROWTH: 1.5,
  LATE_GROWTH: 1.25,
  GROWTH_KNEE_LEVEL: 8,
  GEM_VALUE_BASE: 1,
  GEM_VALUE_MAX: 5,
  GEM_VALUE_MINUTES_PER_TIER: 3,
  GEM_TIERS: [
    { value: 1, color: "#7ad36b", radius: 8 },
    { value: 2, color: "#5ad7ff", radius: 9 },
    { value: 3, color: "#5a92ff", radius: 10 },
    { value: 4, color: "#b86bff", radius: 11 },
    { value: 5, color: "#f5d76e", radius: 12 },
  ],
} as const;
export const GLOBAL_DAMAGE_MULT_DEFAULT = 1.0;
export const GLOBAL_DAMAGE_MULT_PER_LEVEL = 0.05;

export const PIERCE_MAX = 5;
export const HOMING_MAX = 1.0;
export const HOMING_STEP = 0.3;
export const HOMING_MAX_TURN_RATE = 12;
export const LEVELUP_OFFER_COUNT = 3;

export const ORB_ORBIT_RADIUS = 120;
export const ORB_RADIUS = 14;
export const ORB_INITIAL_ROTATION_SPEED = 2;
export const ORB_INITIAL_DAMAGE = 8;
export const ORB_INITIAL_COUNT = 1;
export const ORB_HIT_COOLDOWN = 0.3;
export const ORB_DAMAGE_MULT = 1.3;
export const ORB_ROTATION_STEP = 0.5;
export const ORB_ROTATION_MAX = 5;
export const ORB_COUNT_MAX = 4;
export const ORB_COLOR = "#b8a4ff";

export const PICKUP_RADIUS_DEFAULT = 100;
export const REGEN_DEFAULT = 0;
export const XP_MULTIPLIER_DEFAULT = 1;

export const VITALITY_HP = 20;
export const SWIFT_STEP = 0.10;
export const SWIFT_MAX_FRACTION = 0.50;
export const MAGNET_STEP = 30;
export const REGEN_STEP = 0.5;
export const GREED_STEP = 0.25;
export const GLASS_CANNON_DAMAGE_MULT = 1.4;
export const GLASS_CANNON_HP_PENALTY = 20;

export const PASSIVE_PICK_CHANCE = 0.5;

export const CRIT_CHANCE_DEFAULT = 0;
export const CRIT_MULT_DEFAULT = 2.0;
export const CRIT_STACK = 0.15;
export const CRIT_MAX_STACKS = 5;
export const CRIT_FLASH_DURATION = 0.06;
export const CRIT_FLASH_COLOR = "#ffd86b";
export const CRIT_FLASH_RADIUS_MULT = 1.35;

export const BERSERKER_STACK = 0.15;
export const BERSERKER_MAX_STACKS = 4;
export const BERSERKER_HP_THRESHOLD = 0.5;
export const BERSERKER_VIGNETTE_INNER = "rgba(226, 59, 59, 0)";
export const BERSERKER_VIGNETTE_OUTER = "rgba(226, 59, 59, 0.32)";

export const THORNS_STACK = 0.25;
export const THORNS_MAX_STACKS = 4;

export const IRON_SKIN_STACK = 0.10;
export const IRON_SKIN_MAX_STACKS = 4;

export const DASH_DISTANCE = 200;
export const DASH_DURATION = 0.18;
export const DASH_IFRAME_DURATION = 0.32;
export const DASH_BASE_COOLDOWN = 4.0;
export const DASH_AFTERIMAGE_INTERVAL = 0.03;
export const DASH_AFTERIMAGE_TTL = 0.25;
export const DASH_AFTERIMAGE_BASE_ALPHA = 0.6;
export const DASH_FLASH_TTL = 0.1;
export const DASH_FLASH_COLOR = "#e6f7ff";
export const DASH_OUTLINE_COLOR = "rgba(120, 220, 255, 0.7)";
export const DASH_HUD_ICON_RADIUS = 11;
export const DASH_HUD_READY_COLOR = "#5af0ff";
export const DASH_HUD_PROGRESS_COLOR = "#7fb3c4";
export const DASH_HUD_DIMMED_COLOR = "#5a6275";
export const DASH_HUD_LABEL_COLOR = "#e6e9ef";
export const WEAPON_SLOT_MAX = 3;
export const DIRECTIONAL_WEIGHT = 3.0;
export const STATIONARY_THRESHOLD = 10;

export const SOLAR_BEAM_DPS_MULT = 1.6;

export const REPULSOR_SHOVE_DURATION = 0.2;

export const SINGULARITY_FIRE_RATE = 0.4;
export const SINGULARITY_TRAVEL_SPEED = 350;
export const SINGULARITY_MAX_RANGE = 300;
export const SINGULARITY_DURATION = 2.5;
export const SINGULARITY_PULL_STRENGTH = 200;
export const SINGULARITY_TICK_RATE = 4;
export const SINGULARITY_FADE_DURATION = 0.3;
export const SINGULARITY_PROJECTILE_RADIUS = 8;
export const SINGULARITY_PROJECTILE_COLOR = "#3a1a5a";
export const SINGULARITY_PROJECTILE_GLOW = "#7a4abf";
export const SINGULARITY_WELL_INNER = "#2a0d4a";
export const SINGULARITY_WELL_RING = "#9d6bff";
export const SINGULARITY_TINT_COLOR = "rgba(157, 107, 255, 0.35)";
export const WEAPON_NAME_PISTOL = "PISTOL";
export const WEAPON_NAME_ORB = "ORB";

export const SAVE_KEY = "auto-arsenal-save";
export const SCRAP_PER_KILL = 1;
export const SCRAP_PER_SECOND = 0.5;
export const SCRAP_PER_LEVEL = 25;

export const EXTRACT_INTERVAL = 3 * 60;
export const EXTRACT_WINDOW_DURATION = 30;
export const EXTRACT_SPAWN_DISTANCE = 700;
export const EXTRACT_RADIUS = 80;
export const EXTRACT_INNER_RADIUS_MIN = 28;
export const EXTRACT_INNER_RADIUS_MAX = 56;
export const EXTRACT_PULSE_PERIOD = 0.6;
export const EXTRACT_COLOR = "#a8e668";
export const EXTRACT_MULTIPLIERS = [1.0, 1.4, 1.8, 2.3, 2.9, 3.5] as const;
export const EXTRACT_MULT_STEP_AFTER = 0.6;
export const EXTRACT_ARROW_SIZE = 18;
export const EXTRACT_ARROW_MARGIN = 40;
export const EXTRACT_ACTIVE_FONT = "bold 24px ui-monospace, Menlo, monospace";
export const EXTRACT_PULSE_HZ = 2;
export const SCRAP_LOST_COLOR = "#e23b3b";

export const MOD_TAG_HEIGHT = 22;
export const MOD_TAG_FONT = "bold 11px ui-monospace, Menlo, monospace";
export const MOD_TAG_TEXT_COLOR = "#0b0d10";
export const MOD_TAG_PASSIVE_BG = "#7a818f";
export const MOD_TAG_PASSIVE_TEXT = "#e6e9ef";
export const MOD_TAG_SUMMON_BG = "#7ad36b";
export const MOD_TAG_SUMMON_TEXT = "#0b0d10";
export const MOD_TAG_WEAPON_TEXT = "#0b0d10";

export const EVOLUTION_LEVEL_THRESHOLD = 10;
export const EVOLUTION_BORDER_COLOR = "#f5c542";
export const EVOLUTION_TAG_BG = "#f5c542";
export const EVOLUTION_TAG_TEXT = "#0b0d10";
export const EVOLUTION_NAME_COLOR = "#f5d76e";
export const EVOLUTION_SUBLINE_FONT = "italic 12px ui-monospace, Menlo, monospace";

export const EVOLUTIONS = {
  PISTOL: {
    ID: "evo_pistol",
    NAME: "Dual Pistols",
    DESC: "Akimbo. Two shots per trigger pull, faster fire rate.",
    OFFSET: 12,
    FIRE_RATE_MULT: 1.2,
  },
  LASER: {
    ID: "evo_laser",
    NAME: "Solar Beam",
    DESC: "Locked-on death ray. Continuous damage along beam line.",
    BEAM_WIDTH: 8,
  },
  MG: {
    ID: "evo_mg",
    NAME: "Minigun",
    DESC: "BRRRT. Spins up to 20 rounds/sec with perfect accuracy.",
    MAX_FIRE_RATE: 20,
    SPIN_UP_DURATION: 1.5,
    NO_TARGET_GRACE: 0.5,
    SPIN_DOWN_DURATION: 0.5,
    INDICATOR_RADIUS: 30,
    INDICATOR_DOT_RADIUS: 3,
    INDICATOR_SPIN_BASE: 4,
    INDICATOR_SPIN_MAX: 18,
  },
  ROCKET: {
    ID: "evo_rocket",
    NAME: "MIRV Launcher",
    DESC: "Multiple Independently-targetable Reentry Vehicle.",
    SPLIT_DISTANCE: 200,
    SPLIT_TIME: 0.4,
    SUB_COUNT: 3,
    SUB_ANGLES_DEG: [-20, 0, 20],
    SUB_DAMAGE_MULT: 0.75,
    SUB_RADIUS_MULT: 0.8,
    SUB_HOMING: 0.34,
    SUB_DETECT_RANGE: 400,
    SUB_RENDER_RADIUS_MULT: 0.7,
  },
  ORB: {
    ID: "evo_orb",
    NAME: "Comet Halo",
    DESC: "Orbs leave a damaging trail. Wider arc, more bite.",
    ORBIT_RADIUS_MULT: 1.5,
    DAMAGE_MULT: 1.25,
    TRAIL_DURATION: 0.4,
    TRAIL_DAMAGE_MULT: 0.5,
    TRAIL_COLOR: "#d6c4ff",
    TRAIL_WIDTH: 6,
  },
  BOOMERANG: {
    ID: "evo_boomerang",
    NAME: "Razor Disc",
    DESC: "Figure-8 path. Hits each enemy once per lobe.",
    DAMAGE_MULT: 1.3,
    TOTAL_LOBES: 4,
  },
  AURA: {
    ID: "evo_aura",
    NAME: "Inferno",
    DESC: "Aura applies a 2-second burn that lingers after exposure.",
    BURN_DURATION: 2.0,
    BURN_DPS_MULT: 0.5,
    TINT_COLOR: "#ff5a2a",
    FLAME_RING_COLOR: "#ff8a3d",
    FLAME_RING_OFFSET: 14,
  },
  LIGHTNING: {
    ID: "evo_lightning",
    NAME: "Thunder God",
    DESC: "Smites the 5 nearest enemies at once. No falloff.",
    SIMUL_TARGET_COUNT: 5,
    SKY_OFFSET: 80,
  },
  MINES: {
    ID: "evo_mines",
    NAME: "Plasma Mine",
    DESC: "Detonations leave a 3s plasma field on the ground.",
    FIELD_DURATION: 3.0,
    FIELD_TICK_INTERVAL: 0.3,
    FIELD_DAMAGE_MULT: 0.4,
    FIELD_RADIUS_MULT: 1.2,
    FIELD_COLOR: "#9d6bff",
    FIELD_INNER_COLOR: "#5ad7ff",
  },
  CLUSTER: {
    ID: "evo_cluster",
    NAME: "Carpet Bomb",
    DESC: "Each fragment detonates with a small AOE on impact.",
    FRAGMENT_AOE_RADIUS: 50,
    FRAGMENT_AOE_DAMAGE_MULT: 0.6,
    FRAGMENT_LIFETIME: 0.6,
  },
  REPULSOR: {
    ID: "evo_repulsor",
    NAME: "Singularity",
    DESC: "Launches a gravity well that pulls and crushes enemies. Now they can't reach you.",
  },
  SWORD: {
    ID: "evo_sword",
    NAME: "Lightsaber",
    DESC: "A piercing beam-arc reaching far further.",
    RANGE_MULT: 2.5,
    DAMAGE_MULT: 1.4,
    BEAM_COLOR: "#e6f3ff",
    BEAM_GLOW: "#9ad8ff",
  },
  FROST_NOVA: {
    ID: "evo_frost_nova",
    NAME: "Blizzard",
    DESC: "Wider, harder pulse. Stuns brutes and casters briefly.",
    RADIUS_MULT: 1.5,
    DAMAGE_MULT: 1.5,
    STUN_DURATION: 0.5,
  },
  DRONE: {
    ID: "evo_drone",
    NAME: "Drone Swarm",
    DESC: "Four drones orbit you and fire independently. +25% damage.",
    DRONE_COUNT: 4,
    ORBIT_RADIUS: 80,
    ORBIT_SPEED: 1.0,
    DAMAGE_MULT: 1.25,
  },
  RICOCHET: {
    ID: "evo_ricochet",
    NAME: "Pinball",
    DESC: "6 bounces; each bounce hits 20% harder than the last.",
    BOUNCE_COUNT: 6,
    DAMAGE_PER_BOUNCE: 0.2,
    EARLY_COLOR: "#ffcf3a",
    MID_COLOR: "#ff8a3d",
    LATE_COLOR: "#ff5040",
    TRAIL_WIDTH: 3,
  },
} as const;

export const PAUSE_BUTTON_SIZE = 36;
export const PAUSE_BUTTON_BG = "#1c2230";
export const PAUSE_BUTTON_BG_HOVER = "#2a3548";
export const PAUSE_BUTTON_BORDER = "#3a4660";
export const PAUSE_BUTTON_ICON = "#e6e9ef";
export const PAUSE_HINT_FONT = "16px ui-monospace, Menlo, monospace";

export const UPGRADES = {
  REINFORCED_FRAME: {
    ID: "reinforced_frame",
    NAME: "Reinforced Frame",
    DESC: "+10 max HP per tier",
    MAX_TIER: 10,
    COSTS: [150, 400, 1000, 2400, 5500, 12000, 25000, 50000, 95000, 175000],
    HP_PER_TIER: 10,
  },
  GREASED_BEARINGS: {
    ID: "greased_bearings",
    NAME: "Greased Bearings",
    DESC: "+4% move speed per tier",
    MAX_TIER: 6,
    COSTS: [200, 500, 1200, 2800, 6500, 14000],
    SPEED_PCT_PER_TIER: 0.04,
  },
  SHARPER_EDGES: {
    ID: "sharper_edges",
    NAME: "Sharper Edges",
    DESC: "+4% base damage per tier",
    MAX_TIER: 10,
    COSTS: [180, 450, 1100, 2600, 6000, 13000, 27000, 54000, 100000, 180000],
    DMG_PCT_PER_TIER: 0.04,
  },
  WIDER_MAGNET: {
    ID: "wider_magnet",
    NAME: "Wider Magnet",
    DESC: "+15px pickup radius per tier",
    MAX_TIER: 6,
    COSTS: [150, 350, 800, 1800, 4000, 8500],
    PICKUP_PER_TIER: 15,
  },
  SALVAGE_NETWORK: {
    ID: "salvage_network",
    NAME: "Salvage Network",
    DESC: "+8% scrap earned per tier",
    MAX_TIER: 6,
    COSTS: [300, 750, 1800, 4000, 9000, 19000],
    SCRAP_PCT_PER_TIER: 0.08,
  },
  FIELD_MEDIC: {
    ID: "field_medic",
    NAME: "Field Medic",
    DESC: "+0.2 HP/sec regen per tier",
    MAX_TIER: 6,
    COSTS: [240, 600, 1400, 3200, 7000, 15000],
    REGEN_PER_TIER: 0.2,
  },
  REROLL_TOKEN: {
    ID: "reroll_token",
    NAME: "Reroll Token",
    DESC: "+1 reroll per run",
    MAX_TIER: 6,
    COSTS: [400, 1000, 2400, 5500, 12000, 25000],
    TOKENS_PER_TIER: 1,
  },
  DASH_RECHARGE: {
    ID: "dash_recharge",
    NAME: "Dash Recharge",
    DESC: "-0.4s dash cooldown per tier",
    MAX_TIER: 6,
    COSTS: [250, 600, 1400, 3200, 7000, 15000],
    COOLDOWN_REDUCTION_PER_TIER: 0.4,
  },
} as const;

export const WORKSHOP_CARD_W = 280;
export const WORKSHOP_CARD_H = 160;
export const WORKSHOP_CARD_GAP = 16;
export const WORKSHOP_COLS = 4;
export const WORKSHOP_BUY_W = 84;
export const WORKSHOP_BUY_H = 26;
export const WORKSHOP_TITLE_FONT = "bold 28px ui-monospace, Menlo, monospace";
export const WORKSHOP_NAME_FONT = "bold 16px ui-monospace, Menlo, monospace";
export const WORKSHOP_DESC_FONT = "13px ui-monospace, Menlo, monospace";
export const WORKSHOP_VALUE_FONT = "14px ui-monospace, Menlo, monospace";
export const WORKSHOP_BUY_FONT = "bold 14px ui-monospace, Menlo, monospace";
export const WORKSHOP_BUY_BG = "#2a3548";
export const WORKSHOP_BUY_BG_HOVER = "#3a4660";
export const WORKSHOP_BUY_BG_DISABLED = "#1a1f29";
export const WORKSHOP_BUY_TEXT = "#e6e9ef";
export const WORKSHOP_BUY_TEXT_DISABLED = "#5a6275";
export const WORKSHOP_SCRAP_COLOR = "#f5d76e";

export const WIPE_SAVE_FONT = "12px ui-monospace, Menlo, monospace";
export const WIPE_SAVE_COLOR = "#5a6275";

export const STARTER_WEAPON_IDS = ["pistol", "laser", "mg", "rocket", "sword"] as const;

export const ACHIEVEMENTS = {
  EXTRACT_LEVEL_15: {
    ID: "extract_level_15",
    DESC: "reached level 15 and extracted",
    WEAPON: "laser",
    LEVEL_THRESHOLD: 15,
  },
  EXTRACT_KILLS_1000: {
    ID: "extract_kills_1000",
    DESC: "got 1000 kills and extracted",
    WEAPON: "mg",
    KILL_THRESHOLD: 1000,
  },
  EXTRACT_MIN_9: {
    ID: "extract_min_9",
    DESC: "survived to the 9-min extraction",
    WEAPON: "rocket",
    WINDOW_THRESHOLD: 3,
  },
  EXTRACT_BRUTES_20: {
    ID: "extract_brutes_20",
    DESC: "Defeat 20 brutes in a run and extract",
    WEAPON: "sword",
    BRUTE_THRESHOLD: 20,
  },
} as const;

export const STARTER_CARD_W = 240;
export const STARTER_CARD_H = 200;
export const STARTER_CARD_GAP = 24;
export const STARTER_COLS = 3;
export const STARTER_HEADER_TOP_PADDING = 40;
export const STARTER_HEADER_BOTTOM_MARGIN = 24;
export const STARTER_HEADER_HEIGHT = 40;
export const STARTER_BUTTONS_BOTTOM_MARGIN = 24;
export const STARTER_SELECT_BORDER = "#7ad36b";
export const STARTER_LOCKED_BG = "#15181f";
export const STARTER_LOCKED_TEXT = "#6f7585";
export const STARTER_TITLE_FONT = "bold 28px ui-monospace, Menlo, monospace";
export const STARTER_NAME_FONT = "bold 18px ui-monospace, Menlo, monospace";
export const STARTER_STATS_FONT = "13px ui-monospace, Menlo, monospace";
export const STARTER_LOCK_FONT = "12px ui-monospace, Menlo, monospace";
export const ACHIEVEMENTS_HEADER_FONT = "bold 16px ui-monospace, Menlo, monospace";
export const ACHIEVEMENTS_ROW_FONT = "13px ui-monospace, Menlo, monospace";
export const ACHIEVEMENTS_DONE_COLOR = "#7ad36b";
export const ACHIEVEMENTS_TODO_COLOR = "#6f7585";
export const UNLOCK_LINE_COLOR = "#7ad36b";

export const WEAPONS = {
  BOOMERANG: {
    NAME: "BOOM",
    COLOR: "#5ad7ff",
    RADIUS: 8,
    DAMAGE: 15,
    FIRE_RATE: 0.8,
    RANGE: 300,
    RETURN_SPEED: 500,
    OUT_SPEED: 500,
    HIT_COOLDOWN: 0.3,
    CATCH_DISTANCE: 18,
    MODS: {
      SHARPENED_MULT: 1.30,
      FAR_THROW_STEP: 100,
      FAR_THROW_MAX_BONUS: 400,
      QUICK_CATCH_STEP: 0.4,
    },
  },
  AURA: {
    NAME: "AURA",
    COLOR: "#ff8a3d",
    DAMAGE: 5,
    RADIUS: 100,
    TICK_RATE: 2,
    PULSE_DURATION: 0.18,
    MODS: {
      SEARING_MULT: 1.40,
      WIDER_STEP: 25,
      WIDER_MAX_BONUS: 100,
      FAST_BURN_STEP: 1,
      FAST_BURN_MAX: 5,
    },
  },
  LIGHTNING: {
    NAME: "ARC",
    COLOR: "#ffea4a",
    DAMAGE: 10,
    FIRE_RATE: 0.5,
    CHAIN_COUNT: 2,
    CHAIN_RANGE: 150,
    DAMAGE_FALLOFF: 0.75,
    BOLT_TTL: 0.18,
    MODS: {
      OVERCHARGE_MULT: 1.30,
      CONDUCTION_MAX: 5,
      STORM_STEP: 0.3,
    },
  },
  MINES: {
    NAME: "MINE",
    COLOR_ARMED: "#e23b3b",
    COLOR_UNARMED: "#7a2222",
    COLOR_BLAST: "#ffae6b",
    DAMAGE: 25,
    FIRE_RATE: 0.67,
    EXPLOSION_RADIUS: 80,
    TRIGGER_RADIUS: 60,
    ARM_TIME: 0.5,
    EXPLOSION_TTL: 0.35,
    MAX_ACTIVE: 8,
    RADIUS: 6,
    MODS: {
      HEAVY_MULT: 1.40,
      WIDE_STEP: 20,
      WIDE_MAX_BONUS: 60,
      RAPID_STEP: 0.3,
    },
  },
  LASER: {
    NAME: "LASER",
    COLOR: "#5af0ff",
    DAMAGE: 40,
    FIRE_RATE: 0.5,
    BEAM_WIDTH: 4,
    BEAM_TTL: 0.15,
    BEAM_LENGTH: 4000,
    INITIAL_BEAM_COUNT: 1,
    MODS: {
      OVERCHARGED_MULT: 1.35,
      DUAL_BEAM_MAX: 3,
      QUICK_CHARGE_STEP: 0.2,
      QUICK_CHARGE_MAX: 1.5,
    },
  },
  MG: {
    NAME: "MG",
    COLOR: "#ffe07a",
    DAMAGE: 4,
    FIRE_RATE: 8,
    PROJECTILE_SPEED: 500,
    PROJECTILE_RADIUS: 3,
    PROJECTILE_LIFETIME: 1,
    SPREAD: 0.15,
    MODS: {
      HOLLOW_POINTS_MULT: 1.30,
      RAPID_FIRE_STEP: 2,
      RAPID_FIRE_MAX: 16,
      TIGHTER_SPREAD_MULT: 0.5,
      TIGHTER_DAMAGE_MULT: 1.10,
    },
  },
  ROCKET: {
    NAME: "ROCKET",
    COLOR: "#e85a3a",
    BLAST_COLOR: "#ffae6b",
    RADIUS: 5,
    IMPACT_DAMAGE: 20,
    EXPLOSION_DAMAGE: 35,
    EXPLOSION_RADIUS: 100,
    FIRE_RATE: 0.7,
    SPEED: 280,
    LIFETIME: 1.5,
    EXPLOSION_TTL: 0.25,
    MODS: {
      THERMOBARIC_MULT: 1.30,
      BIGGER_BOOM_STEP: 25,
      BIGGER_BOOM_MAX_BONUS: 75,
      FASTER_RELOAD_STEP: 0.3,
      FASTER_RELOAD_MAX: 1.5,
    },
  },
  CLUSTER: {
    NAME: "CLUSTER",
    COLOR: "#666b75",
    FRAGMENT_COLOR: "#9095a0",
    BOMB_RADIUS: 7,
    FRAGMENT_RADIUS: 3,
    IMPACT_DAMAGE: 25,
    FRAGMENT_DAMAGE: 12,
    FRAGMENT_COUNT: 6,
    FIRE_RATE: 0.6,
    PROJECTILE_SPEED: 320,
    FRAGMENT_SPEED: 280,
    FRAGMENT_LIFETIME: 0.6,
    BOMB_LIFETIME: 1.2,
    MODS: {
      HEAVIER_MULT: 1.30,
      MORE_FRAG_STEP: 2,
      MORE_FRAG_MAX_BONUS: 6,
      FASTER_FUSE_STEP: 0.2,
      FASTER_FUSE_MAX: 1.5,
    },
  },
  REPULSOR: {
    NAME: "PULSE",
    COLOR: "#a8d8ff",
    DAMAGE: 8,
    RADIUS: 120,
    PUSH_DISTANCE: 60,
    PULSE_RATE: 1.25,
    VIZ_DURATION: 0.4,
    MODS: {
      STRONGER_MULT: 1.40,
      WIDER_STEP: 30,
      WIDER_MAX_BONUS: 90,
      HARDER_STEP: 30,
      HARDER_MAX_BONUS: 90,
    },
  },
  SWORD: {
    NAME: "SWORD",
    COLOR: "#e0e8ff",
    DAMAGE: 35,
    RANGE: 130,
    ARC_DEGREES: 160,
    FIRE_RATE: 1.2,
    SWING_DURATION: 0.15,
    MODS: {
      SHARPER_MULT: 1.35,
      WIDER_STEP_DEG: 30,
      WIDER_MAX_BONUS_DEG: 90,
      FASTER_STEP: 0.3,
      FASTER_MAX: 2,
    },
  },
  FROST_NOVA: {
    NAME: "FROST",
    COLOR: "#bfeaff",
    DAMAGE: 20,
    RADIUS: 150,
    PULSE_RATE: 0.33,
    SLOW_AMOUNT: 0.5,
    SLOW_DURATION: 2.0,
    PULSE_VIZ_DURATION: 0.4,
    PLAYER_FLASH_DURATION: 0.18,
    FROST_FLASH_DURATION: 0.18,
    RING_INNER_COLOR: "#ffffff",
    RING_OUTER_COLOR: "#7fd0ee",
    RING_WIDTH: 3,
    RING_WIDTH_EVOLVED: 5,
    PLAYER_FLASH_COLOR: "rgba(150, 220, 255, 0.35)",
    SLOW_TINT_COLOR: "rgba(140, 215, 255, 0.45)",
    FROST_FLASH_COLOR: "rgba(220, 245, 255, 0.85)",
    ICE_PARTICLE_COLOR: "rgba(220, 245, 255, 0.7)",
    SNOWFLAKE_COLOR: "rgba(255, 255, 255, 0.65)",
    SNOWFLAKE_COUNT: 12,
    MODS: {
      DEEP_FREEZE_MULT: 1.30,
      WIDER_STEP: 30,
      WIDER_MAX_BONUS: 90,
      LASTING_STEP: 0.7,
      LASTING_MAX_BONUS: 1.4,
    },
  },
  DRONE: {
    NAME: "DRONE",
    COLOR: "#5af0ff",
    DAMAGE: 6,
    FIRE_RATE: 4.0,
    PROJECTILE_SPEED: 400,
    PROJECTILE_RADIUS: 3,
    PROJECTILE_LIFETIME: 1.2,
    PROJECTILE_COLOR: "#ffe27a",
    RANGE: 250,
    FOLLOW_OFFSET: 70,
    INITIAL_COUNT: 1,
    BODY_RADIUS: 10,
    BODY_GLOW_COLOR: "rgba(90, 240, 255, 0.35)",
    BODY_OUTLINE_COLOR: "#0b0d10",
    BODY_FILL_COLOR: "#5af0ff",
    BODY_ACCENT_COLOR: "#ffe27a",
    FOLLOW_LERP: 0.1,
    BOB_AMPLITUDE: 4,
    BOB_PERIOD: 1.5,
    TRAIL_TTL: 0.35,
    TRAIL_COLOR: "rgba(90, 240, 255, 0.4)",
    MODS: {
      UPGRADE_DAMAGE_MULT: 1.30,
      TWIN_STEP: 1,
      TWIN_MAX_BONUS: 1,
      RAPID_STEP: 1.5,
      RAPID_MAX: 8,
    },
  },
  RICOCHET: {
    NAME: "RICO",
    COLOR: "#ffc24a",
    PROJECTILE_RADIUS: 4,
    PROJECTILE_COLOR_PRIMARY: "#ffcf3a",
    PROJECTILE_COLOR_SECONDARY: "#ff8a3d",
    PROJECTILE_TRAIL_COLOR: "rgba(255, 207, 58, 0.55)",
    SPARK_COLOR: "#fff7c2",
    DAMAGE: 12,
    FIRE_RATE: 1.5,
    PROJECTILE_SPEED: 450,
    BOUNCE_COUNT: 3,
    BOUNCE_SEARCH_RANGE: 220,
    PROJECTILE_LIFETIME: 3.0,
    SPARK_TTL: 0.18,
    TRAIL_TTL: 0.35,
    TRAIL_WIDTH: 2,
    MODS: {
      HEAVY_SLUG_MULT: 1.30,
      EXTRA_BOUNCE_STEP: 1,
      EXTRA_BOUNCE_MAX_BONUS: 3,
      SNAPPY_SPEED_BONUS: 150,
      SNAPPY_RANGE_BONUS: 50,
    },
  },
} as const;

export const PICKUP_VIZ_DURATION = 1.0;
export const PICKUP_VIZ_COLOR = "rgba(90, 215, 255, 0.35)";

export const MODAL_BG = "rgba(0,0,0,0.6)";
export const MODAL_CARD_BG = "#1c2230";
export const MODAL_CARD_BG_HOVER = "#2a3548";
export const MODAL_CARD_BORDER = "#3a4660";
export const MODAL_CARD_BORDER_HOVER = "#7ad36b";
export const MODAL_TITLE_FONT = "bold 28px ui-monospace, Menlo, monospace";
export const MODAL_NAME_FONT = "bold 20px ui-monospace, Menlo, monospace";
export const MODAL_DESC_FONT = "14px ui-monospace, Menlo, monospace";
export const MODAL_TEXT = "#e6e9ef";
export const MODAL_DESC_TEXT = "#a8b1c2";
export const MODAL_CARD_W = 220;
export const MODAL_CARD_H = 280;
export const MODAL_CARD_GAP = 24;

export const GAME_TITLE = "AUTO ARSENAL";
export const TITLE_FONT = "bold 64px ui-monospace, Menlo, monospace";
export const TITLE_HINT_FONT = "20px ui-monospace, Menlo, monospace";
export const END_TITLE_FONT = "bold 72px ui-monospace, Menlo, monospace";
export const END_STATS_FONT = "20px ui-monospace, Menlo, monospace";
export const END_WON_COLOR = "#5ad7ff";
export const END_LOST_COLOR = "#e23b3b";

export const BUTTON_W = 220;
export const BUTTON_H = 56;
export const BUTTON_BG = "#2a3548";
export const BUTTON_BG_HOVER = "#3a4660";
export const BUTTON_BORDER = "#7ad36b";
export const BUTTON_FONT = "bold 22px ui-monospace, Menlo, monospace";

export const BG_COLOR = "#0b0d10";
export const GRID_COLOR = "#1a1f26";
export const GRID_SIZE = 64;

export const HUD_FONT = "16px ui-monospace, Menlo, monospace";
export const HUD_COLOR = "#e6e9ef";

export const STATS_DPS_WINDOW_FRAMES = 30;
export const STATS_MOMENT_WINDOW_FRAMES = 180;
export const STATS_MOMENT_WINDOW_SECONDS = 3;
export const DAMAGE_SOURCE_LABELS: Record<string, string> = {
  basic: "Basic",
  shooter: "Shooter",
  brute: "Brute",
  brute_slam: "Brute Slam",
  bomber: "Bomber",
  shielded: "Shielded",
  caster: "Caster",
};
export const DAMAGE_SOURCE_COLORS: Record<string, string> = {
  basic: "#7ad36b",
  shooter: "#e6c34a",
  brute: "#5C2A6B",
  brute_slam: "#ff7a2a",
  bomber: "#E04A2A",
  shielded: "#5A7A99",
  caster: "#3A6B3A",
};
