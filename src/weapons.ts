import type { GameState } from "./game";
import type {
  AuraWeapon,
  BoomerangWeapon,
  LaserWeapon,
  LightningWeapon,
  MachineGunWeapon,
  MinesWeapon,
  OrbWeapon,
  ProjectileWeapon,
  RocketLauncherWeapon,
  Weapon,
  WeaponType,
} from "./types";
import type { Mod } from "./mods";
import {
  HOMING_MAX,
  HOMING_STEP,
  ORB_COLOR,
  ORB_COUNT_MAX,
  ORB_DAMAGE_MULT,
  ORB_INITIAL_COUNT,
  ORB_INITIAL_DAMAGE,
  ORB_INITIAL_ROTATION_SPEED,
  ORB_ROTATION_MAX,
  ORB_ROTATION_STEP,
  PIERCE_MAX,
  PROJECTILE_COLOR,
  WEAPON_NAME_ORB,
  WEAPON_NAME_PROJECTILE,
  WEAPON_SLOT_MAX,
  WEAPON_STARTER_DAMAGE,
  WEAPON_STARTER_FIRE_RATE,
  WEAPON_STARTER_HOMING,
  WEAPON_STARTER_PIERCE,
  WEAPON_STARTER_PROJECTILE_COUNT,
  WEAPON_STARTER_PROJECTILE_SPEED,
  WEAPONS,
} from "./constants";

export type WeaponDef = {
  type: WeaponType;
  name: string;
  color: string;
  isStarter: boolean;
  create: () => Weapon;
  summonMod: Mod;
  mods: Mod[];
  getStats: (w: Weapon) => string;
};

export function findProjectileWeapon(state: GameState): ProjectileWeapon | undefined {
  return state.player.weapons.find(
    (w): w is ProjectileWeapon => w.type === "projectile"
  );
}

export function findOrbWeapon(state: GameState): OrbWeapon | undefined {
  return state.player.weapons.find((w): w is OrbWeapon => w.type === "orb");
}

export function findBoomerangWeapon(state: GameState): BoomerangWeapon | undefined {
  return state.player.weapons.find((w): w is BoomerangWeapon => w.type === "boomerang");
}

export function findAuraWeapon(state: GameState): AuraWeapon | undefined {
  return state.player.weapons.find((w): w is AuraWeapon => w.type === "aura");
}

export function findLightningWeapon(state: GameState): LightningWeapon | undefined {
  return state.player.weapons.find((w): w is LightningWeapon => w.type === "lightning");
}

export function findMinesWeapon(state: GameState): MinesWeapon | undefined {
  return state.player.weapons.find((w): w is MinesWeapon => w.type === "mines");
}

export function findLaserWeapon(state: GameState): LaserWeapon | undefined {
  return state.player.weapons.find((w): w is LaserWeapon => w.type === "laser");
}

export function findMachineGunWeapon(state: GameState): MachineGunWeapon | undefined {
  return state.player.weapons.find((w): w is MachineGunWeapon => w.type === "mg");
}

export function findRocketLauncherWeapon(state: GameState): RocketLauncherWeapon | undefined {
  return state.player.weapons.find((w): w is RocketLauncherWeapon => w.type === "rocket");
}

export const projectileWeaponDef: WeaponDef = {
  type: "projectile",
  name: WEAPON_NAME_PROJECTILE,
  color: PROJECTILE_COLOR,
  isStarter: true,
  create: () => ({
    type: "projectile",
    damage: WEAPON_STARTER_DAMAGE,
    fireRate: WEAPON_STARTER_FIRE_RATE,
    projectileSpeed: WEAPON_STARTER_PROJECTILE_SPEED,
    projectileCount: WEAPON_STARTER_PROJECTILE_COUNT,
    pierce: WEAPON_STARTER_PIERCE,
    homingStrength: WEAPON_STARTER_HOMING,
    cooldownRemaining: 0,
  }),
  getStats: (w) => {
    const p = w as ProjectileWeapon;
    return `DMG ${p.damage.toFixed(1)}  RATE ${p.fireRate.toFixed(2)}`;
  },
  summonMod: {
    id: "summon_bolt",
    name: "Summon Bolt",
    desc: "Auto-firing projectile weapon",
    category: "weapon",
    eligible: () => true,
    isSummon: true,
    apply: (s) => s.player.weapons.push(projectileWeaponDef.create()),
  },
  mods: [
    {
      id: "faster_hands",
      name: "Faster Hands",
      desc: "+25% bolt fire rate",
      category: "weapon",
      isDamageRelevant: true,
      eligible: () => true,
      apply: (s) => {
        const w = findProjectileWeapon(s);
        if (w) w.fireRate *= 1.25;
      },
    },
    {
      id: "heavy_rounds",
      name: "Heavy Rounds",
      desc: "+25% bolt damage",
      category: "weapon",
      isDamageRelevant: true,
      eligible: () => true,
      apply: (s) => {
        const w = findProjectileWeapon(s);
        if (w) w.damage *= 1.25;
      },
    },
    {
      id: "split_shot",
      name: "Split Shot",
      desc: "+1 bolt projectile",
      category: "weapon",
      isDamageRelevant: true,
      eligible: () => true,
      apply: (s) => {
        const w = findProjectileWeapon(s);
        if (w) w.projectileCount += 1;
      },
    },
    {
      id: "pierce",
      name: "Pierce",
      desc: `+1 pierce (max ${PIERCE_MAX})`,
      category: "weapon",
      isDamageRelevant: true,
      eligible: (s) => {
        const w = findProjectileWeapon(s);
        return !!w && w.pierce < PIERCE_MAX;
      },
      apply: (s) => {
        const w = findProjectileWeapon(s);
        if (w) w.pierce = Math.min(PIERCE_MAX, w.pierce + 1);
      },
    },
    {
      id: "homing",
      name: "Homing",
      desc: `+${HOMING_STEP} homing (max ${HOMING_MAX.toFixed(1)})`,
      category: "weapon",
      eligible: (s) => {
        const w = findProjectileWeapon(s);
        return !!w && w.homingStrength < HOMING_MAX - 1e-6;
      },
      apply: (s) => {
        const w = findProjectileWeapon(s);
        if (w) w.homingStrength = Math.min(HOMING_MAX, w.homingStrength + HOMING_STEP);
      },
    },
  ],
};

export const orbWeaponDef: WeaponDef = {
  type: "orb",
  name: WEAPON_NAME_ORB,
  color: ORB_COLOR,
  isStarter: false,
  create: () => ({
    type: "orb",
    damage: ORB_INITIAL_DAMAGE,
    rotationSpeed: ORB_INITIAL_ROTATION_SPEED,
    orbCount: ORB_INITIAL_COUNT,
    baseAngle: 0,
  }),
  getStats: (w) => {
    const o = w as OrbWeapon;
    return `DMG ${o.damage.toFixed(1)}  SPIN ${o.rotationSpeed.toFixed(2)}`;
  },
  summonMod: {
    id: "summon_orb",
    name: "Summon Orb",
    desc: "Summon a circling orb",
    category: "weapon",
    isSummon: true,
    eligible: () => true,
    apply: (s) => s.player.weapons.push(orbWeaponDef.create()),
  },
  mods: [
    {
      id: "bigger_orb",
      name: "Bigger Orb",
      desc: "+30% orb damage",
      category: "weapon",
      isDamageRelevant: true,
      eligible: () => true,
      apply: (s) => {
        const w = findOrbWeapon(s);
        if (w) w.damage *= ORB_DAMAGE_MULT;
      },
    },
    {
      id: "faster_orb",
      name: "Faster Orb",
      desc: `+${ORB_ROTATION_STEP} orb spin (max ${ORB_ROTATION_MAX})`,
      category: "weapon",
      isDamageRelevant: true,
      eligible: (s) => {
        const w = findOrbWeapon(s);
        return !!w && w.rotationSpeed < ORB_ROTATION_MAX - 1e-6;
      },
      apply: (s) => {
        const w = findOrbWeapon(s);
        if (w) w.rotationSpeed = Math.min(ORB_ROTATION_MAX, w.rotationSpeed + ORB_ROTATION_STEP);
      },
    },
    {
      id: "twin_orb",
      name: "Twin Orb",
      desc: `+1 orb (max ${ORB_COUNT_MAX})`,
      category: "weapon",
      isDamageRelevant: true,
      eligible: (s) => {
        const w = findOrbWeapon(s);
        return !!w && w.orbCount < ORB_COUNT_MAX;
      },
      apply: (s) => {
        const w = findOrbWeapon(s);
        if (w) w.orbCount = Math.min(ORB_COUNT_MAX, w.orbCount + 1);
      },
    },
  ],
};

export const boomerangWeaponDef: WeaponDef = {
  type: "boomerang",
  name: WEAPONS.BOOMERANG.NAME,
  color: WEAPONS.BOOMERANG.COLOR,
  isStarter: false,
  create: () => ({
    type: "boomerang",
    damage: WEAPONS.BOOMERANG.DAMAGE,
    fireRate: WEAPONS.BOOMERANG.FIRE_RATE,
    range: WEAPONS.BOOMERANG.RANGE,
    returnSpeed: WEAPONS.BOOMERANG.RETURN_SPEED,
    cooldownRemaining: 0,
  }),
  getStats: (w) => {
    const b = w as BoomerangWeapon;
    return `DMG ${b.damage.toFixed(1)}  RATE ${b.fireRate.toFixed(2)}`;
  },
  summonMod: {
    id: "summon_boomerang",
    name: "Summon Boomerang",
    desc: "Throws a returning blade",
    category: "weapon",
    isSummon: true,
    eligible: () => true,
    apply: (s) => s.player.weapons.push(boomerangWeaponDef.create()),
  },
  mods: [
    {
      id: "boomerang_sharpened",
      name: "Sharpened",
      desc: "+30% boomerang damage",
      category: "weapon",
      isDamageRelevant: true,
      eligible: () => true,
      apply: (s) => {
        const w = findBoomerangWeapon(s);
        if (w) w.damage *= WEAPONS.BOOMERANG.MODS.SHARPENED_MULT;
      },
    },
    {
      id: "boomerang_far_throw",
      name: "Far Throw",
      desc: `+${WEAPONS.BOOMERANG.MODS.FAR_THROW_STEP}px range (max +${WEAPONS.BOOMERANG.MODS.FAR_THROW_MAX_BONUS})`,
      category: "weapon",
      eligible: (s) => {
        const w = findBoomerangWeapon(s);
        return !!w && w.range < WEAPONS.BOOMERANG.RANGE + WEAPONS.BOOMERANG.MODS.FAR_THROW_MAX_BONUS - 1e-6;
      },
      apply: (s) => {
        const w = findBoomerangWeapon(s)!;
        const cap = WEAPONS.BOOMERANG.RANGE + WEAPONS.BOOMERANG.MODS.FAR_THROW_MAX_BONUS;
        w.range = Math.min(cap, w.range + WEAPONS.BOOMERANG.MODS.FAR_THROW_STEP);
      },
    },
    {
      id: "boomerang_quick_catch",
      name: "Quick Catch",
      desc: `+${WEAPONS.BOOMERANG.MODS.QUICK_CATCH_STEP}/sec fire rate`,
      category: "weapon",
      isDamageRelevant: true,
      eligible: () => true,
      apply: (s) => {
        const w = findBoomerangWeapon(s);
        if (w) w.fireRate += WEAPONS.BOOMERANG.MODS.QUICK_CATCH_STEP;
      },
    },
  ],
};

export const auraWeaponDef: WeaponDef = {
  type: "aura",
  name: WEAPONS.AURA.NAME,
  color: WEAPONS.AURA.COLOR,
  isStarter: false,
  create: () => ({
    type: "aura",
    damage: WEAPONS.AURA.DAMAGE,
    radius: WEAPONS.AURA.RADIUS,
    tickRate: WEAPONS.AURA.TICK_RATE,
    tickCooldown: 1 / WEAPONS.AURA.TICK_RATE,
    pulseTtl: 0,
  }),
  getStats: (w) => {
    const a = w as AuraWeapon;
    return `DMG ${a.damage.toFixed(1)}  TICK ${a.tickRate.toFixed(2)}`;
  },
  summonMod: {
    id: "summon_aura",
    name: "Summon Aura",
    desc: "Damage field around you",
    category: "weapon",
    isSummon: true,
    eligible: () => true,
    apply: (s) => s.player.weapons.push(auraWeaponDef.create()),
  },
  mods: [
    {
      id: "aura_searing",
      name: "Searing",
      desc: "+40% aura damage",
      category: "weapon",
      isDamageRelevant: true,
      eligible: () => true,
      apply: (s) => {
        const w = findAuraWeapon(s);
        if (w) w.damage *= WEAPONS.AURA.MODS.SEARING_MULT;
      },
    },
    {
      id: "aura_wider",
      name: "Wider Field",
      desc: `+${WEAPONS.AURA.MODS.WIDER_STEP}px radius (max +${WEAPONS.AURA.MODS.WIDER_MAX_BONUS})`,
      category: "weapon",
      eligible: (s) => {
        const w = findAuraWeapon(s);
        return !!w && w.radius < WEAPONS.AURA.RADIUS + WEAPONS.AURA.MODS.WIDER_MAX_BONUS - 1e-6;
      },
      apply: (s) => {
        const w = findAuraWeapon(s)!;
        const cap = WEAPONS.AURA.RADIUS + WEAPONS.AURA.MODS.WIDER_MAX_BONUS;
        w.radius = Math.min(cap, w.radius + WEAPONS.AURA.MODS.WIDER_STEP);
      },
    },
    {
      id: "aura_fast_burn",
      name: "Fast Burn",
      desc: `+${WEAPONS.AURA.MODS.FAST_BURN_STEP}/sec tick rate (max ${WEAPONS.AURA.MODS.FAST_BURN_MAX})`,
      category: "weapon",
      isDamageRelevant: true,
      eligible: (s) => {
        const w = findAuraWeapon(s);
        return !!w && w.tickRate < WEAPONS.AURA.MODS.FAST_BURN_MAX - 1e-6;
      },
      apply: (s) => {
        const w = findAuraWeapon(s)!;
        w.tickRate = Math.min(
          WEAPONS.AURA.MODS.FAST_BURN_MAX,
          w.tickRate + WEAPONS.AURA.MODS.FAST_BURN_STEP
        );
      },
    },
  ],
};

export const lightningWeaponDef: WeaponDef = {
  type: "lightning",
  name: WEAPONS.LIGHTNING.NAME,
  color: WEAPONS.LIGHTNING.COLOR,
  isStarter: false,
  create: () => ({
    type: "lightning",
    damage: WEAPONS.LIGHTNING.DAMAGE,
    fireRate: WEAPONS.LIGHTNING.FIRE_RATE,
    chainCount: WEAPONS.LIGHTNING.CHAIN_COUNT,
    chainRange: WEAPONS.LIGHTNING.CHAIN_RANGE,
    cooldownRemaining: 0,
  }),
  getStats: (w) => {
    const l = w as LightningWeapon;
    return `DMG ${l.damage.toFixed(1)}  CHAIN ${l.chainCount}`;
  },
  summonMod: {
    id: "summon_lightning",
    name: "Summon Arc",
    desc: "Chain lightning strikes",
    category: "weapon",
    isSummon: true,
    eligible: () => true,
    apply: (s) => s.player.weapons.push(lightningWeaponDef.create()),
  },
  mods: [
    {
      id: "lightning_overcharge",
      name: "Overcharge",
      desc: "+30% lightning damage",
      category: "weapon",
      isDamageRelevant: true,
      eligible: () => true,
      apply: (s) => {
        const w = findLightningWeapon(s);
        if (w) w.damage *= WEAPONS.LIGHTNING.MODS.OVERCHARGE_MULT;
      },
    },
    {
      id: "lightning_conduction",
      name: "Conduction",
      desc: `+1 chain (max ${WEAPONS.LIGHTNING.MODS.CONDUCTION_MAX})`,
      category: "weapon",
      isDamageRelevant: true,
      eligible: (s) => {
        const w = findLightningWeapon(s);
        return !!w && w.chainCount < WEAPONS.LIGHTNING.MODS.CONDUCTION_MAX;
      },
      apply: (s) => {
        const w = findLightningWeapon(s)!;
        w.chainCount = Math.min(WEAPONS.LIGHTNING.MODS.CONDUCTION_MAX, w.chainCount + 1);
      },
    },
    {
      id: "lightning_storm",
      name: "Storm",
      desc: `+${WEAPONS.LIGHTNING.MODS.STORM_STEP}/sec fire rate`,
      category: "weapon",
      isDamageRelevant: true,
      eligible: () => true,
      apply: (s) => {
        const w = findLightningWeapon(s);
        if (w) w.fireRate += WEAPONS.LIGHTNING.MODS.STORM_STEP;
      },
    },
  ],
};

export const minesWeaponDef: WeaponDef = {
  type: "mines",
  name: WEAPONS.MINES.NAME,
  color: WEAPONS.MINES.COLOR_ARMED,
  isStarter: false,
  create: () => ({
    type: "mines",
    damage: WEAPONS.MINES.DAMAGE,
    fireRate: WEAPONS.MINES.FIRE_RATE,
    explosionRadius: WEAPONS.MINES.EXPLOSION_RADIUS,
    triggerRadius: WEAPONS.MINES.TRIGGER_RADIUS,
    cooldownRemaining: 0,
  }),
  getStats: (w) => {
    const m = w as MinesWeapon;
    return `DMG ${m.damage.toFixed(1)}  RATE ${m.fireRate.toFixed(2)}`;
  },
  summonMod: {
    id: "summon_mines",
    name: "Summon Mines",
    desc: "Drop proximity mines",
    category: "weapon",
    isSummon: true,
    eligible: () => true,
    apply: (s) => s.player.weapons.push(minesWeaponDef.create()),
  },
  mods: [
    {
      id: "mines_heavy",
      name: "Heavy Charge",
      desc: "+40% mine damage",
      category: "weapon",
      isDamageRelevant: true,
      eligible: () => true,
      apply: (s) => {
        const w = findMinesWeapon(s);
        if (w) w.damage *= WEAPONS.MINES.MODS.HEAVY_MULT;
      },
    },
    {
      id: "mines_wide",
      name: "Wide Blast",
      desc: `+${WEAPONS.MINES.MODS.WIDE_STEP}px blast radius (max +${WEAPONS.MINES.MODS.WIDE_MAX_BONUS})`,
      category: "weapon",
      eligible: (s) => {
        const w = findMinesWeapon(s);
        return !!w && w.explosionRadius < WEAPONS.MINES.EXPLOSION_RADIUS + WEAPONS.MINES.MODS.WIDE_MAX_BONUS - 1e-6;
      },
      apply: (s) => {
        const w = findMinesWeapon(s)!;
        const cap = WEAPONS.MINES.EXPLOSION_RADIUS + WEAPONS.MINES.MODS.WIDE_MAX_BONUS;
        w.explosionRadius = Math.min(cap, w.explosionRadius + WEAPONS.MINES.MODS.WIDE_STEP);
      },
    },
    {
      id: "mines_rapid",
      name: "Rapid Deploy",
      desc: `+${WEAPONS.MINES.MODS.RAPID_STEP}/sec fire rate`,
      category: "weapon",
      isDamageRelevant: true,
      eligible: () => true,
      apply: (s) => {
        const w = findMinesWeapon(s);
        if (w) w.fireRate += WEAPONS.MINES.MODS.RAPID_STEP;
      },
    },
  ],
};

export const laserWeaponDef: WeaponDef = {
  type: "laser",
  name: WEAPONS.LASER.NAME,
  color: WEAPONS.LASER.COLOR,
  isStarter: false,
  create: () => ({
    type: "laser",
    damage: WEAPONS.LASER.DAMAGE,
    fireRate: WEAPONS.LASER.FIRE_RATE,
    beamWidth: WEAPONS.LASER.BEAM_WIDTH,
    beamCount: WEAPONS.LASER.INITIAL_BEAM_COUNT,
    cooldownRemaining: 0,
  }),
  getStats: (w) => {
    const l = w as LaserWeapon;
    return `DMG ${l.damage.toFixed(1)}  BEAMS ${l.beamCount}`;
  },
  summonMod: {
    id: "summon_laser",
    name: "Summon Laser",
    desc: "Piercing beam weapon",
    category: "weapon",
    isSummon: true,
    eligible: () => true,
    apply: (s) => s.player.weapons.push(laserWeaponDef.create()),
  },
  mods: [
    {
      id: "laser_overcharged",
      name: "Overcharged",
      desc: "+35% laser damage",
      category: "weapon",
      isDamageRelevant: true,
      eligible: () => true,
      apply: (s) => {
        const w = findLaserWeapon(s);
        if (w) w.damage *= WEAPONS.LASER.MODS.OVERCHARGED_MULT;
      },
    },
    {
      id: "laser_dual_emitters",
      name: "Dual Emitters",
      desc: `+1 beam (max ${WEAPONS.LASER.MODS.DUAL_BEAM_MAX})`,
      category: "weapon",
      isDamageRelevant: true,
      eligible: (s) => {
        const w = findLaserWeapon(s);
        return !!w && w.beamCount < WEAPONS.LASER.MODS.DUAL_BEAM_MAX;
      },
      apply: (s) => {
        const w = findLaserWeapon(s)!;
        w.beamCount = Math.min(WEAPONS.LASER.MODS.DUAL_BEAM_MAX, w.beamCount + 1);
      },
    },
    {
      id: "laser_quick_charge",
      name: "Quick Charge",
      desc: `+${WEAPONS.LASER.MODS.QUICK_CHARGE_STEP}/sec fire rate (max ${WEAPONS.LASER.MODS.QUICK_CHARGE_MAX})`,
      category: "weapon",
      isDamageRelevant: true,
      eligible: (s) => {
        const w = findLaserWeapon(s);
        return !!w && w.fireRate < WEAPONS.LASER.MODS.QUICK_CHARGE_MAX - 1e-6;
      },
      apply: (s) => {
        const w = findLaserWeapon(s)!;
        w.fireRate = Math.min(
          WEAPONS.LASER.MODS.QUICK_CHARGE_MAX,
          w.fireRate + WEAPONS.LASER.MODS.QUICK_CHARGE_STEP
        );
      },
    },
  ],
};

export const machineGunWeaponDef: WeaponDef = {
  type: "mg",
  name: WEAPONS.MG.NAME,
  color: WEAPONS.MG.COLOR,
  isStarter: false,
  create: () => ({
    type: "mg",
    damage: WEAPONS.MG.DAMAGE,
    fireRate: WEAPONS.MG.FIRE_RATE,
    projectileSpeed: WEAPONS.MG.PROJECTILE_SPEED,
    spread: WEAPONS.MG.SPREAD,
    cooldownRemaining: 0,
  }),
  getStats: (w) => {
    const m = w as MachineGunWeapon;
    return `DMG ${m.damage.toFixed(1)}  RATE ${m.fireRate.toFixed(2)}`;
  },
  summonMod: {
    id: "summon_mg",
    name: "Summon Machine Gun",
    desc: "Fast inaccurate spray",
    category: "weapon",
    isSummon: true,
    eligible: () => true,
    apply: (s) => s.player.weapons.push(machineGunWeaponDef.create()),
  },
  mods: [
    {
      id: "mg_hollow_points",
      name: "Hollow Points",
      desc: "+30% MG damage",
      category: "weapon",
      isDamageRelevant: true,
      eligible: () => true,
      apply: (s) => {
        const w = findMachineGunWeapon(s);
        if (w) w.damage *= WEAPONS.MG.MODS.HOLLOW_POINTS_MULT;
      },
    },
    {
      id: "mg_rapid_fire",
      name: "Rapid Fire",
      desc: `+${WEAPONS.MG.MODS.RAPID_FIRE_STEP}/sec fire rate (max ${WEAPONS.MG.MODS.RAPID_FIRE_MAX})`,
      category: "weapon",
      isDamageRelevant: true,
      eligible: (s) => {
        const w = findMachineGunWeapon(s);
        return !!w && w.fireRate < WEAPONS.MG.MODS.RAPID_FIRE_MAX - 1e-6;
      },
      apply: (s) => {
        const w = findMachineGunWeapon(s)!;
        w.fireRate = Math.min(
          WEAPONS.MG.MODS.RAPID_FIRE_MAX,
          w.fireRate + WEAPONS.MG.MODS.RAPID_FIRE_STEP
        );
      },
    },
    {
      id: "mg_tighter_spread",
      name: "Tighter Spread",
      desc: "-50% spread, +10% damage",
      category: "weapon",
      isDamageRelevant: true,
      eligible: () => true,
      apply: (s) => {
        const w = findMachineGunWeapon(s);
        if (!w) return;
        w.spread *= WEAPONS.MG.MODS.TIGHTER_SPREAD_MULT;
        w.damage *= WEAPONS.MG.MODS.TIGHTER_DAMAGE_MULT;
      },
    },
  ],
};

export const rocketLauncherWeaponDef: WeaponDef = {
  type: "rocket",
  name: WEAPONS.ROCKET.NAME,
  color: WEAPONS.ROCKET.COLOR,
  isStarter: false,
  create: () => ({
    type: "rocket",
    impactDamage: WEAPONS.ROCKET.IMPACT_DAMAGE,
    explosionDamage: WEAPONS.ROCKET.EXPLOSION_DAMAGE,
    explosionRadius: WEAPONS.ROCKET.EXPLOSION_RADIUS,
    fireRate: WEAPONS.ROCKET.FIRE_RATE,
    rocketSpeed: WEAPONS.ROCKET.SPEED,
    cooldownRemaining: 0,
  }),
  getStats: (w) => {
    const r = w as RocketLauncherWeapon;
    return `DMG ${r.explosionDamage.toFixed(1)}  RATE ${r.fireRate.toFixed(2)}`;
  },
  summonMod: {
    id: "summon_rocket",
    name: "Summon Rocket Launcher",
    desc: "AOE explosive rounds",
    category: "weapon",
    isSummon: true,
    eligible: () => true,
    apply: (s) => s.player.weapons.push(rocketLauncherWeaponDef.create()),
  },
  mods: [
    {
      id: "rocket_thermobaric",
      name: "Thermobaric",
      desc: "+30% explosion damage",
      category: "weapon",
      isDamageRelevant: true,
      eligible: () => true,
      apply: (s) => {
        const w = findRocketLauncherWeapon(s);
        if (w) w.explosionDamage *= WEAPONS.ROCKET.MODS.THERMOBARIC_MULT;
      },
    },
    {
      id: "rocket_bigger_boom",
      name: "Bigger Boom",
      desc: `+${WEAPONS.ROCKET.MODS.BIGGER_BOOM_STEP}px blast radius (max +${WEAPONS.ROCKET.MODS.BIGGER_BOOM_MAX_BONUS})`,
      category: "weapon",
      eligible: (s) => {
        const w = findRocketLauncherWeapon(s);
        return (
          !!w &&
          w.explosionRadius <
            WEAPONS.ROCKET.EXPLOSION_RADIUS + WEAPONS.ROCKET.MODS.BIGGER_BOOM_MAX_BONUS - 1e-6
        );
      },
      apply: (s) => {
        const w = findRocketLauncherWeapon(s)!;
        const cap =
          WEAPONS.ROCKET.EXPLOSION_RADIUS + WEAPONS.ROCKET.MODS.BIGGER_BOOM_MAX_BONUS;
        w.explosionRadius = Math.min(cap, w.explosionRadius + WEAPONS.ROCKET.MODS.BIGGER_BOOM_STEP);
      },
    },
    {
      id: "rocket_faster_reload",
      name: "Faster Reload",
      desc: `+${WEAPONS.ROCKET.MODS.FASTER_RELOAD_STEP}/sec fire rate (max ${WEAPONS.ROCKET.MODS.FASTER_RELOAD_MAX})`,
      category: "weapon",
      isDamageRelevant: true,
      eligible: (s) => {
        const w = findRocketLauncherWeapon(s);
        return !!w && w.fireRate < WEAPONS.ROCKET.MODS.FASTER_RELOAD_MAX - 1e-6;
      },
      apply: (s) => {
        const w = findRocketLauncherWeapon(s)!;
        w.fireRate = Math.min(
          WEAPONS.ROCKET.MODS.FASTER_RELOAD_MAX,
          w.fireRate + WEAPONS.ROCKET.MODS.FASTER_RELOAD_STEP
        );
      },
    },
  ],
};

export const WEAPON_DEFS: WeaponDef[] = [
  projectileWeaponDef,
  orbWeaponDef,
  boomerangWeaponDef,
  auraWeaponDef,
  lightningWeaponDef,
  minesWeaponDef,
  laserWeaponDef,
  machineGunWeaponDef,
  rocketLauncherWeaponDef,
];

export function getOwnedWeaponDefs(state: GameState): WeaponDef[] {
  const owned = new Set(state.player.weapons.map((w) => w.type));
  return WEAPON_DEFS.filter((d) => owned.has(d.type));
}

export function getOwnedWeaponMods(state: GameState): Mod[] {
  const out: Mod[] = [];
  for (const def of getOwnedWeaponDefs(state)) out.push(...def.mods);
  return out;
}

export function getEligibleSummonMods(state: GameState): Mod[] {
  if (state.player.weapons.length >= WEAPON_SLOT_MAX) return [];
  const owned = new Set(state.player.weapons.map((w) => w.type));
  return WEAPON_DEFS.filter((d) => !owned.has(d.type)).map((d) => d.summonMod);
}
