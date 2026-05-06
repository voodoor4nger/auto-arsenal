import type { GameState } from "./game";
import type {
  AuraWeapon,
  BoomerangWeapon,
  ClusterBombWeapon,
  LaserWeapon,
  LightningWeapon,
  MachineGunWeapon,
  MinesWeapon,
  OrbWeapon,
  PistolWeapon,
  RepulsorWeapon,
  RocketLauncherWeapon,
  SwordWeapon,
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
  ORB_ORBIT_RADIUS,
  ORB_ROTATION_MAX,
  ORB_ROTATION_STEP,
  PIERCE_MAX,
  EVOLUTIONS,
  PROJECTILE_COLOR,
  WEAPON_NAME_ORB,
  WEAPON_NAME_PISTOL,
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
  starterOnly?: boolean;
  create: () => Weapon;
  summonMod: Mod;
  mods: Mod[];
  evolutionMod?: Mod;
  getStats: (w: Weapon) => string;
};

export function findPistolWeapon(state: GameState): PistolWeapon | undefined {
  return state.player.weapons.find(
    (w): w is PistolWeapon => w.type === "pistol"
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

export function findClusterBombWeapon(state: GameState): ClusterBombWeapon | undefined {
  return state.player.weapons.find((w): w is ClusterBombWeapon => w.type === "clusterBomb");
}

export function findRepulsorWeapon(state: GameState): RepulsorWeapon | undefined {
  return state.player.weapons.find((w): w is RepulsorWeapon => w.type === "repulsor");
}

export function findSwordWeapon(state: GameState): SwordWeapon | undefined {
  return state.player.weapons.find((w): w is SwordWeapon => w.type === "sword");
}

export const pistolWeaponDef: WeaponDef = {
  type: "pistol",
  name: WEAPON_NAME_PISTOL,
  color: PROJECTILE_COLOR,
  isStarter: true,
  starterOnly: true,
  create: () => ({
    type: "pistol",
    damage: WEAPON_STARTER_DAMAGE,
    fireRate: WEAPON_STARTER_FIRE_RATE,
    projectileSpeed: WEAPON_STARTER_PROJECTILE_SPEED,
    projectileCount: WEAPON_STARTER_PROJECTILE_COUNT,
    pierce: WEAPON_STARTER_PIERCE,
    homingStrength: WEAPON_STARTER_HOMING,
    cooldownRemaining: 0,
    evolved: false,
  }),
  getStats: (w) => {
    const p = w as PistolWeapon;
    return `DMG ${p.damage.toFixed(1)}  RATE ${p.fireRate.toFixed(2)}`;
  },
  summonMod: {
    id: "summon_pistol",
    name: "Summon Pistol",
    desc: "Auto-firing pistol",
    category: "weapon",
    eligible: () => true,
    isSummon: true,
    apply: (s) => s.player.weapons.push(pistolWeaponDef.create()),
  },
  mods: [
    {
      id: "faster_hands",
      name: "Faster Hands",
      desc: "+25% pistol fire rate",
      category: "weapon",
      isDamageRelevant: true,
      eligible: () => true,
      apply: (s) => {
        const w = findPistolWeapon(s);
        if (w) w.fireRate *= 1.25;
      },
    },
    {
      id: "heavy_rounds",
      name: "Heavy Rounds",
      desc: "+25% pistol damage",
      category: "weapon",
      isDamageRelevant: true,
      eligible: () => true,
      apply: (s) => {
        const w = findPistolWeapon(s);
        if (w) w.damage *= 1.25;
      },
    },
    {
      id: "split_shot",
      name: "Split Shot",
      desc: "+1 pistol shot",
      category: "weapon",
      isDamageRelevant: true,
      eligible: () => true,
      apply: (s) => {
        const w = findPistolWeapon(s);
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
        const w = findPistolWeapon(s);
        return !!w && w.pierce < PIERCE_MAX;
      },
      apply: (s) => {
        const w = findPistolWeapon(s);
        if (w) w.pierce = Math.min(PIERCE_MAX, w.pierce + 1);
      },
    },
    {
      id: "homing",
      name: "Homing",
      desc: `+${HOMING_STEP} homing (max ${HOMING_MAX.toFixed(1)})`,
      category: "weapon",
      eligible: (s) => {
        const w = findPistolWeapon(s);
        return !!w && w.homingStrength < HOMING_MAX - 1e-6;
      },
      apply: (s) => {
        const w = findPistolWeapon(s);
        if (w) w.homingStrength = Math.min(HOMING_MAX, w.homingStrength + HOMING_STEP);
      },
    },
  ],
  evolutionMod: {
    id: EVOLUTIONS.PISTOL.ID,
    name: EVOLUTIONS.PISTOL.NAME,
    desc: EVOLUTIONS.PISTOL.DESC,
    category: "evolution",
    isEvolution: true,
    isDamageRelevant: true,
    eligible: (s) => {
      const w = findPistolWeapon(s);
      return !!w && !w.evolved;
    },
    apply: (s) => {
      const w = findPistolWeapon(s);
      if (!w || w.evolved) return;
      w.fireRate *= EVOLUTIONS.PISTOL.FIRE_RATE_MULT;
      w.evolved = true;
    },
  },
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
    orbitRadius: ORB_ORBIT_RADIUS,
    evolved: false,
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
  evolutionMod: {
    id: EVOLUTIONS.ORB.ID,
    name: EVOLUTIONS.ORB.NAME,
    desc: EVOLUTIONS.ORB.DESC,
    category: "evolution",
    isEvolution: true,
    isDamageRelevant: true,
    eligible: (s) => {
      const w = findOrbWeapon(s);
      return !!w && !w.evolved;
    },
    apply: (s) => {
      const w = findOrbWeapon(s);
      if (!w || w.evolved) return;
      w.orbitRadius *= EVOLUTIONS.ORB.ORBIT_RADIUS_MULT;
      w.damage *= EVOLUTIONS.ORB.DAMAGE_MULT;
      w.evolved = true;
    },
  },
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
    evolved: false,
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
  evolutionMod: {
    id: EVOLUTIONS.BOOMERANG.ID,
    name: EVOLUTIONS.BOOMERANG.NAME,
    desc: EVOLUTIONS.BOOMERANG.DESC,
    category: "evolution",
    isEvolution: true,
    isDamageRelevant: true,
    eligible: (s) => {
      const w = findBoomerangWeapon(s);
      return !!w && !w.evolved;
    },
    apply: (s) => {
      const w = findBoomerangWeapon(s);
      if (!w || w.evolved) return;
      w.damage *= EVOLUTIONS.BOOMERANG.DAMAGE_MULT;
      w.evolved = true;
    },
  },
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
    evolved: false,
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
  evolutionMod: {
    id: EVOLUTIONS.AURA.ID,
    name: EVOLUTIONS.AURA.NAME,
    desc: EVOLUTIONS.AURA.DESC,
    category: "evolution",
    isEvolution: true,
    isDamageRelevant: true,
    eligible: (s) => {
      const w = findAuraWeapon(s);
      return !!w && !w.evolved;
    },
    apply: (s) => {
      const w = findAuraWeapon(s);
      if (!w || w.evolved) return;
      w.evolved = true;
    },
  },
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
    evolved: false,
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
  evolutionMod: {
    id: EVOLUTIONS.LIGHTNING.ID,
    name: EVOLUTIONS.LIGHTNING.NAME,
    desc: EVOLUTIONS.LIGHTNING.DESC,
    category: "evolution",
    isEvolution: true,
    isDamageRelevant: true,
    eligible: (s) => {
      const w = findLightningWeapon(s);
      return !!w && !w.evolved;
    },
    apply: (s) => {
      const w = findLightningWeapon(s);
      if (!w || w.evolved) return;
      w.evolved = true;
    },
  },
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
    evolved: false,
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
  evolutionMod: {
    id: EVOLUTIONS.MINES.ID,
    name: EVOLUTIONS.MINES.NAME,
    desc: EVOLUTIONS.MINES.DESC,
    category: "evolution",
    isEvolution: true,
    isDamageRelevant: true,
    eligible: (s) => {
      const w = findMinesWeapon(s);
      return !!w && !w.evolved;
    },
    apply: (s) => {
      const w = findMinesWeapon(s);
      if (!w || w.evolved) return;
      w.evolved = true;
    },
  },
};

export const laserWeaponDef: WeaponDef = {
  type: "laser",
  name: WEAPONS.LASER.NAME,
  color: WEAPONS.LASER.COLOR,
  isStarter: false,
  starterOnly: true,
  create: () => ({
    type: "laser",
    damage: WEAPONS.LASER.DAMAGE,
    fireRate: WEAPONS.LASER.FIRE_RATE,
    beamWidth: WEAPONS.LASER.BEAM_WIDTH,
    beamCount: WEAPONS.LASER.INITIAL_BEAM_COUNT,
    cooldownRemaining: 0,
    evolved: false,
    beamTargetId: 0,
    beamEndX: 0,
    beamEndY: 0,
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
  evolutionMod: {
    id: EVOLUTIONS.LASER.ID,
    name: EVOLUTIONS.LASER.NAME,
    desc: EVOLUTIONS.LASER.DESC,
    category: "evolution",
    isEvolution: true,
    isDamageRelevant: true,
    eligible: (s) => {
      const w = findLaserWeapon(s);
      return !!w && !w.evolved;
    },
    apply: (s) => {
      const w = findLaserWeapon(s);
      if (!w || w.evolved) return;
      w.evolved = true;
    },
  },
};

export const machineGunWeaponDef: WeaponDef = {
  type: "mg",
  name: WEAPONS.MG.NAME,
  color: WEAPONS.MG.COLOR,
  isStarter: false,
  starterOnly: true,
  create: () => ({
    type: "mg",
    damage: WEAPONS.MG.DAMAGE,
    fireRate: WEAPONS.MG.FIRE_RATE,
    projectileSpeed: WEAPONS.MG.PROJECTILE_SPEED,
    spread: WEAPONS.MG.SPREAD,
    cooldownRemaining: 0,
    evolved: false,
    spinUp: 0,
    noTargetTimer: 0,
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
  evolutionMod: {
    id: EVOLUTIONS.MG.ID,
    name: EVOLUTIONS.MG.NAME,
    desc: EVOLUTIONS.MG.DESC,
    category: "evolution",
    isEvolution: true,
    isDamageRelevant: true,
    eligible: (s) => {
      const w = findMachineGunWeapon(s);
      return !!w && !w.evolved;
    },
    apply: (s) => {
      const w = findMachineGunWeapon(s);
      if (!w || w.evolved) return;
      w.evolved = true;
    },
  },
};

export const rocketLauncherWeaponDef: WeaponDef = {
  type: "rocket",
  name: WEAPONS.ROCKET.NAME,
  color: WEAPONS.ROCKET.COLOR,
  isStarter: false,
  starterOnly: true,
  create: () => ({
    type: "rocket",
    impactDamage: WEAPONS.ROCKET.IMPACT_DAMAGE,
    explosionDamage: WEAPONS.ROCKET.EXPLOSION_DAMAGE,
    explosionRadius: WEAPONS.ROCKET.EXPLOSION_RADIUS,
    fireRate: WEAPONS.ROCKET.FIRE_RATE,
    rocketSpeed: WEAPONS.ROCKET.SPEED,
    cooldownRemaining: 0,
    evolved: false,
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
  evolutionMod: {
    id: EVOLUTIONS.ROCKET.ID,
    name: EVOLUTIONS.ROCKET.NAME,
    desc: EVOLUTIONS.ROCKET.DESC,
    category: "evolution",
    isEvolution: true,
    isDamageRelevant: true,
    eligible: (s) => {
      const w = findRocketLauncherWeapon(s);
      return !!w && !w.evolved;
    },
    apply: (s) => {
      const w = findRocketLauncherWeapon(s);
      if (!w || w.evolved) return;
      w.evolved = true;
    },
  },
};

export const clusterBombWeaponDef: WeaponDef = {
  type: "clusterBomb",
  name: WEAPONS.CLUSTER.NAME,
  color: WEAPONS.CLUSTER.COLOR,
  isStarter: false,
  create: () => ({
    type: "clusterBomb",
    impactDamage: WEAPONS.CLUSTER.IMPACT_DAMAGE,
    fragmentDamage: WEAPONS.CLUSTER.FRAGMENT_DAMAGE,
    fragmentCount: WEAPONS.CLUSTER.FRAGMENT_COUNT,
    fireRate: WEAPONS.CLUSTER.FIRE_RATE,
    cooldownRemaining: 0,
    evolved: false,
  }),
  getStats: (w) => {
    const c = w as ClusterBombWeapon;
    return `DMG ${c.impactDamage.toFixed(1)}  FRAG ${c.fragmentCount}`;
  },
  summonMod: {
    id: "summon_cluster",
    name: "Summon Cluster Bomb",
    desc: "Fragmenting projectile",
    category: "weapon",
    isSummon: true,
    eligible: () => true,
    apply: (s) => s.player.weapons.push(clusterBombWeaponDef.create()),
  },
  mods: [
    {
      id: "cluster_heavier",
      name: "Heavier Charge",
      desc: "+30% cluster damage (impact + fragments)",
      category: "weapon",
      isDamageRelevant: true,
      eligible: () => true,
      apply: (s) => {
        const w = findClusterBombWeapon(s);
        if (!w) return;
        w.impactDamage *= WEAPONS.CLUSTER.MODS.HEAVIER_MULT;
        w.fragmentDamage *= WEAPONS.CLUSTER.MODS.HEAVIER_MULT;
      },
    },
    {
      id: "cluster_more_frag",
      name: "More Fragments",
      desc: `+${WEAPONS.CLUSTER.MODS.MORE_FRAG_STEP} fragments (max +${WEAPONS.CLUSTER.MODS.MORE_FRAG_MAX_BONUS})`,
      category: "weapon",
      isDamageRelevant: true,
      eligible: (s) => {
        const w = findClusterBombWeapon(s);
        return (
          !!w &&
          w.fragmentCount <
            WEAPONS.CLUSTER.FRAGMENT_COUNT + WEAPONS.CLUSTER.MODS.MORE_FRAG_MAX_BONUS
        );
      },
      apply: (s) => {
        const w = findClusterBombWeapon(s)!;
        const cap =
          WEAPONS.CLUSTER.FRAGMENT_COUNT + WEAPONS.CLUSTER.MODS.MORE_FRAG_MAX_BONUS;
        w.fragmentCount = Math.min(cap, w.fragmentCount + WEAPONS.CLUSTER.MODS.MORE_FRAG_STEP);
      },
    },
    {
      id: "cluster_faster_fuse",
      name: "Faster Fuse",
      desc: `+${WEAPONS.CLUSTER.MODS.FASTER_FUSE_STEP}/sec fire rate (max ${WEAPONS.CLUSTER.MODS.FASTER_FUSE_MAX})`,
      category: "weapon",
      isDamageRelevant: true,
      eligible: (s) => {
        const w = findClusterBombWeapon(s);
        return !!w && w.fireRate < WEAPONS.CLUSTER.MODS.FASTER_FUSE_MAX - 1e-6;
      },
      apply: (s) => {
        const w = findClusterBombWeapon(s)!;
        w.fireRate = Math.min(
          WEAPONS.CLUSTER.MODS.FASTER_FUSE_MAX,
          w.fireRate + WEAPONS.CLUSTER.MODS.FASTER_FUSE_STEP
        );
      },
    },
  ],
  evolutionMod: {
    id: EVOLUTIONS.CLUSTER.ID,
    name: EVOLUTIONS.CLUSTER.NAME,
    desc: EVOLUTIONS.CLUSTER.DESC,
    category: "evolution",
    isEvolution: true,
    isDamageRelevant: true,
    eligible: (s) => {
      const w = findClusterBombWeapon(s);
      return !!w && !w.evolved;
    },
    apply: (s) => {
      const w = findClusterBombWeapon(s);
      if (!w || w.evolved) return;
      w.evolved = true;
    },
  },
};

export const repulsorWeaponDef: WeaponDef = {
  type: "repulsor",
  name: WEAPONS.REPULSOR.NAME,
  color: WEAPONS.REPULSOR.COLOR,
  isStarter: false,
  create: () => ({
    type: "repulsor",
    damage: WEAPONS.REPULSOR.DAMAGE,
    radius: WEAPONS.REPULSOR.RADIUS,
    pushDistance: WEAPONS.REPULSOR.PUSH_DISTANCE,
    pulseRate: WEAPONS.REPULSOR.PULSE_RATE,
    pulseCooldown: 1 / WEAPONS.REPULSOR.PULSE_RATE,
    pulseVizTtl: 0,
    pulseVizRadius: WEAPONS.REPULSOR.RADIUS,
    evolved: false,
    nextPulseIsPull: false,
    pulseVizType: "push",
  }),
  getStats: (w) => {
    const r = w as RepulsorWeapon;
    return `DMG ${r.damage.toFixed(1)}  R ${Math.round(r.radius)}`;
  },
  summonMod: {
    id: "summon_repulsor",
    name: "Summon Repulsor",
    desc: "Damaging push pulse",
    category: "weapon",
    isSummon: true,
    eligible: () => true,
    apply: (s) => s.player.weapons.push(repulsorWeaponDef.create()),
  },
  mods: [
    {
      id: "repulsor_stronger",
      name: "Stronger Pulse",
      desc: "+40% repulsor damage",
      category: "weapon",
      isDamageRelevant: true,
      eligible: () => true,
      apply: (s) => {
        const w = findRepulsorWeapon(s);
        if (w) w.damage *= WEAPONS.REPULSOR.MODS.STRONGER_MULT;
      },
    },
    {
      id: "repulsor_wider",
      name: "Wider Field",
      desc: `+${WEAPONS.REPULSOR.MODS.WIDER_STEP}px radius (max +${WEAPONS.REPULSOR.MODS.WIDER_MAX_BONUS})`,
      category: "weapon",
      isDamageRelevant: true,
      eligible: (s) => {
        const w = findRepulsorWeapon(s);
        return (
          !!w &&
          w.radius < WEAPONS.REPULSOR.RADIUS + WEAPONS.REPULSOR.MODS.WIDER_MAX_BONUS - 1e-6
        );
      },
      apply: (s) => {
        const w = findRepulsorWeapon(s)!;
        const cap = WEAPONS.REPULSOR.RADIUS + WEAPONS.REPULSOR.MODS.WIDER_MAX_BONUS;
        w.radius = Math.min(cap, w.radius + WEAPONS.REPULSOR.MODS.WIDER_STEP);
      },
    },
    {
      id: "repulsor_harder",
      name: "Harder Push",
      desc: `+${WEAPONS.REPULSOR.MODS.HARDER_STEP}px push (max +${WEAPONS.REPULSOR.MODS.HARDER_MAX_BONUS})`,
      category: "weapon",
      eligible: (s) => {
        const w = findRepulsorWeapon(s);
        return (
          !!w &&
          w.pushDistance <
            WEAPONS.REPULSOR.PUSH_DISTANCE + WEAPONS.REPULSOR.MODS.HARDER_MAX_BONUS - 1e-6
        );
      },
      apply: (s) => {
        const w = findRepulsorWeapon(s)!;
        const cap =
          WEAPONS.REPULSOR.PUSH_DISTANCE + WEAPONS.REPULSOR.MODS.HARDER_MAX_BONUS;
        w.pushDistance = Math.min(cap, w.pushDistance + WEAPONS.REPULSOR.MODS.HARDER_STEP);
      },
    },
  ],
  evolutionMod: {
    id: EVOLUTIONS.REPULSOR.ID,
    name: EVOLUTIONS.REPULSOR.NAME,
    desc: EVOLUTIONS.REPULSOR.DESC,
    category: "evolution",
    isEvolution: true,
    isDamageRelevant: true,
    eligible: (s) => {
      const w = findRepulsorWeapon(s);
      return !!w && !w.evolved;
    },
    apply: (s) => {
      const w = findRepulsorWeapon(s);
      if (!w || w.evolved) return;
      w.pulseRate *= EVOLUTIONS.REPULSOR.PULSE_RATE_MULT;
      w.evolved = true;
    },
  },
};

export const swordWeaponDef: WeaponDef = {
  type: "sword",
  name: WEAPONS.SWORD.NAME,
  color: WEAPONS.SWORD.COLOR,
  isStarter: false,
  create: () => ({
    type: "sword",
    damage: WEAPONS.SWORD.DAMAGE,
    range: WEAPONS.SWORD.RANGE,
    arcAngle: WEAPONS.SWORD.ARC_DEGREES,
    fireRate: WEAPONS.SWORD.FIRE_RATE,
    cooldownRemaining: 0,
    swingTtl: 0,
    swingFromAngle: 0,
    swingToAngle: 0,
    swingRange: WEAPONS.SWORD.RANGE,
    evolved: false,
  }),
  getStats: (w) => {
    const s = w as SwordWeapon;
    return `DMG ${s.damage.toFixed(1)}  ARC ${Math.round(s.arcAngle)}°`;
  },
  summonMod: {
    id: "summon_sword",
    name: "Summon Sword",
    desc: "Sweeping melee arc",
    category: "weapon",
    isSummon: true,
    eligible: () => true,
    apply: (s) => s.player.weapons.push(swordWeaponDef.create()),
  },
  mods: [
    {
      id: "sword_sharper",
      name: "Sharper Blade",
      desc: "+35% sword damage",
      category: "weapon",
      isDamageRelevant: true,
      eligible: () => true,
      apply: (s) => {
        const w = findSwordWeapon(s);
        if (w) w.damage *= WEAPONS.SWORD.MODS.SHARPER_MULT;
      },
    },
    {
      id: "sword_wider",
      name: "Wider Swing",
      desc: `+${WEAPONS.SWORD.MODS.WIDER_STEP_DEG}° arc (max +${WEAPONS.SWORD.MODS.WIDER_MAX_BONUS_DEG})`,
      category: "weapon",
      isDamageRelevant: true,
      eligible: (s) => {
        const w = findSwordWeapon(s);
        return (
          !!w &&
          w.arcAngle <
            WEAPONS.SWORD.ARC_DEGREES + WEAPONS.SWORD.MODS.WIDER_MAX_BONUS_DEG - 1e-6
        );
      },
      apply: (s) => {
        const w = findSwordWeapon(s)!;
        const cap = WEAPONS.SWORD.ARC_DEGREES + WEAPONS.SWORD.MODS.WIDER_MAX_BONUS_DEG;
        w.arcAngle = Math.min(cap, w.arcAngle + WEAPONS.SWORD.MODS.WIDER_STEP_DEG);
      },
    },
    {
      id: "sword_faster",
      name: "Faster Swing",
      desc: `+${WEAPONS.SWORD.MODS.FASTER_STEP}/sec swings (max ${WEAPONS.SWORD.MODS.FASTER_MAX})`,
      category: "weapon",
      isDamageRelevant: true,
      eligible: (s) => {
        const w = findSwordWeapon(s);
        return !!w && w.fireRate < WEAPONS.SWORD.MODS.FASTER_MAX - 1e-6;
      },
      apply: (s) => {
        const w = findSwordWeapon(s)!;
        w.fireRate = Math.min(
          WEAPONS.SWORD.MODS.FASTER_MAX,
          w.fireRate + WEAPONS.SWORD.MODS.FASTER_STEP
        );
      },
    },
  ],
  evolutionMod: {
    id: EVOLUTIONS.SWORD.ID,
    name: EVOLUTIONS.SWORD.NAME,
    desc: EVOLUTIONS.SWORD.DESC,
    category: "evolution",
    isEvolution: true,
    isDamageRelevant: true,
    eligible: (s) => {
      const w = findSwordWeapon(s);
      return !!w && !w.evolved;
    },
    apply: (s) => {
      const w = findSwordWeapon(s);
      if (!w || w.evolved) return;
      w.range *= EVOLUTIONS.SWORD.RANGE_MULT;
      w.damage *= EVOLUTIONS.SWORD.DAMAGE_MULT;
      w.evolved = true;
    },
  },
};

export const WEAPON_DEFS: WeaponDef[] = [
  pistolWeaponDef,
  orbWeaponDef,
  boomerangWeaponDef,
  auraWeaponDef,
  lightningWeaponDef,
  minesWeaponDef,
  laserWeaponDef,
  machineGunWeaponDef,
  rocketLauncherWeaponDef,
  clusterBombWeaponDef,
  repulsorWeaponDef,
  swordWeaponDef,
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
  return WEAPON_DEFS.filter((d) => !owned.has(d.type) && !d.starterOnly).map(
    (d) => d.summonMod
  );
}

const MOD_TO_WEAPON: Map<string, WeaponDef> = (() => {
  const m = new Map<string, WeaponDef>();
  for (const def of WEAPON_DEFS) {
    m.set(def.summonMod.id, def);
    for (const mod of def.mods) m.set(mod.id, def);
    if (def.evolutionMod) m.set(def.evolutionMod.id, def);
  }
  return m;
})();

export function getWeaponDefForMod(modId: string): WeaponDef | undefined {
  return MOD_TO_WEAPON.get(modId);
}

export function getEligibleEvolutionMods(state: GameState): Mod[] {
  const owned = new Set(state.player.weapons.map((w) => w.type));
  const out: Mod[] = [];
  for (const def of WEAPON_DEFS) {
    if (!owned.has(def.type)) continue;
    if (!def.evolutionMod) continue;
    if (!def.evolutionMod.eligible(state)) continue;
    out.push(def.evolutionMod);
  }
  return out;
}
