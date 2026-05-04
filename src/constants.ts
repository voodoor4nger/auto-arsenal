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
export const ENEMY_HP_SCALE_PER_MIN = 0.45;
export const ENEMY_SPEED_SCALE_PER_MIN = 0.1;

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

export const SPAWN_RAMP_DURATION = 8 * 60;
export const SPAWN_INTERVAL_START = 1.5;
export const SPAWN_INTERVAL_END = 0.2;
export const SPAWN_COUNT_START = 1;
export const SPAWN_COUNT_END = 8;
export const SPAWN_OFFSCREEN_MARGIN = 60;

export const GEM_RADIUS = 5;
export const GEM_COLOR = "#5ad7ff";
export const GEM_XP_VALUE = 1;
export const GEM_SNAP_RADIUS = 18;
export const GEM_PULL_SPEED_MIN = 120;
export const GEM_PULL_SPEED_MAX = 600;

export const LEVEL_XP_START = 5;
export const LEVEL_XP_GROWTH = 1.5;
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
export const WEAPON_SLOT_MAX = 3;
export const WEAPON_NAME_PROJECTILE = "BOLT";
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
    MAX_TIER: 5,
    COSTS: [50, 100, 200, 400, 800],
    HP_PER_TIER: 10,
  },
  GREASED_BEARINGS: {
    ID: "greased_bearings",
    NAME: "Greased Bearings",
    DESC: "+4% move speed per tier",
    MAX_TIER: 3,
    COSTS: [75, 150, 300],
    SPEED_PCT_PER_TIER: 0.04,
  },
  SHARPER_EDGES: {
    ID: "sharper_edges",
    NAME: "Sharper Edges",
    DESC: "+4% base damage per tier",
    MAX_TIER: 5,
    COSTS: [60, 120, 240, 480, 960],
    DMG_PCT_PER_TIER: 0.04,
  },
  WIDER_MAGNET: {
    ID: "wider_magnet",
    NAME: "Wider Magnet",
    DESC: "+15px pickup radius per tier",
    MAX_TIER: 3,
    COSTS: [50, 100, 200],
    PICKUP_PER_TIER: 15,
  },
  SALVAGE_NETWORK: {
    ID: "salvage_network",
    NAME: "Salvage Network",
    DESC: "+8% scrap earned per tier",
    MAX_TIER: 3,
    COSTS: [100, 200, 400],
    SCRAP_PCT_PER_TIER: 0.08,
  },
  FIELD_MEDIC: {
    ID: "field_medic",
    NAME: "Field Medic",
    DESC: "+0.2 HP/sec regen per tier",
    MAX_TIER: 3,
    COSTS: [80, 160, 320],
    REGEN_PER_TIER: 0.2,
  },
  REROLL_TOKEN: {
    ID: "reroll_token",
    NAME: "Reroll Token",
    DESC: "+1 reroll per run",
    MAX_TIER: 3,
    COSTS: [150, 300, 600],
    TOKENS_PER_TIER: 1,
  },
} as const;

export const WORKSHOP_CARD_W = 220;
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

export const STARTER_WEAPON_IDS = ["projectile", "laser", "mg", "rocket"] as const;

export const ACHIEVEMENTS = {
  REACH_LEVEL_10: {
    ID: "reach_level_10",
    DESC: "Reach level 10 in a run",
    WEAPON: "laser",
    LEVEL_THRESHOLD: 10,
  },
  KILL_500: {
    ID: "kill_500",
    DESC: "Get 500 kills in a single run",
    WEAPON: "mg",
    KILL_THRESHOLD: 500,
  },
  SURVIVE_5_MIN: {
    ID: "survive_5_min",
    DESC: "Survive 5 minutes",
    WEAPON: "rocket",
    SECONDS_THRESHOLD: 300,
  },
} as const;

export const STARTER_CARD_W = 240;
export const STARTER_CARD_H = 200;
export const STARTER_CARD_GAP = 24;
export const STARTER_COLS = 2;
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
    DAMAGE: 22,
    RANGE: 100,
    ARC_DEGREES: 160,
    FIRE_RATE: 1.0,
    SWING_DURATION: 0.15,
    MODS: {
      SHARPER_MULT: 1.35,
      WIDER_STEP_DEG: 30,
      WIDER_MAX_BONUS_DEG: 90,
      FASTER_STEP: 0.3,
      FASTER_MAX: 2,
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
