import type { GameState } from "./game";
import { getEligibleSummonMods, getOwnedWeaponMods } from "./weapons";
import {
  GLASS_CANNON_DAMAGE_MULT,
  GLASS_CANNON_HP_PENALTY,
  GREED_STEP,
  MAGNET_STEP,
  PASSIVE_PICK_CHANCE,
  PLAYER_SPEED,
  REGEN_STEP,
  SWIFT_MAX_FRACTION,
  SWIFT_STEP,
  VITALITY_HP,
} from "./constants";

export type ModCategory = "weapon" | "passive";

export type Mod = {
  id: string;
  name: string;
  desc: string;
  category: ModCategory;
  isSummon?: boolean;
  isDamageRelevant?: boolean;
  eligible: (state: GameState) => boolean;
  apply: (state: GameState) => void;
};

export const PASSIVE_MODS: Mod[] = [
  {
    id: "vitality",
    name: "Vitality",
    desc: `+${VITALITY_HP} max HP, heals ${VITALITY_HP}`,
    category: "passive",
    eligible: () => true,
    apply: (s) => {
      s.player.maxHp += VITALITY_HP;
      s.player.hp = Math.min(s.player.maxHp, s.player.hp + VITALITY_HP);
    },
  },
  {
    id: "swift",
    name: "Swift",
    desc: `+${Math.round(SWIFT_STEP * 100)}% move speed (max +${Math.round(SWIFT_MAX_FRACTION * 100)}%)`,
    category: "passive",
    eligible: (s) => s.player.moveSpeed < PLAYER_SPEED * (1 + SWIFT_MAX_FRACTION) - 1e-6,
    apply: (s) => {
      const cap = PLAYER_SPEED * (1 + SWIFT_MAX_FRACTION);
      s.player.moveSpeed = Math.min(cap, s.player.moveSpeed + PLAYER_SPEED * SWIFT_STEP);
    },
  },
  {
    id: "magnet",
    name: "Magnet",
    desc: `+${MAGNET_STEP}px pickup radius`,
    category: "passive",
    eligible: () => true,
    apply: (s) => {
      s.player.pickupRadius += MAGNET_STEP;
    },
  },
  {
    id: "regeneration",
    name: "Regeneration",
    desc: `+${REGEN_STEP} HP/sec`,
    category: "passive",
    eligible: () => true,
    apply: (s) => {
      s.player.regen += REGEN_STEP;
    },
  },
  {
    id: "greed",
    name: "Greed",
    desc: `+${Math.round(GREED_STEP * 100)}% XP from gems`,
    category: "passive",
    eligible: () => true,
    apply: (s) => {
      s.player.xpMultiplier += GREED_STEP;
    },
  },
  {
    id: "glass_cannon",
    name: "Glass Cannon",
    desc: `+${Math.round((GLASS_CANNON_DAMAGE_MULT - 1) * 100)}% damage, -${GLASS_CANNON_HP_PENALTY} max HP`,
    category: "passive",
    isDamageRelevant: true,
    eligible: (s) => !s.glassCannonTaken,
    apply: (s) => {
      for (const w of s.player.weapons) {
        if (w.type === "rocket") {
          w.impactDamage *= GLASS_CANNON_DAMAGE_MULT;
          w.explosionDamage *= GLASS_CANNON_DAMAGE_MULT;
        } else {
          w.damage *= GLASS_CANNON_DAMAGE_MULT;
        }
      }
      s.player.maxHp = Math.max(1, s.player.maxHp - GLASS_CANNON_HP_PENALTY);
      s.player.hp = Math.min(s.player.hp, s.player.maxHp);
      s.glassCannonTaken = true;
    },
  },
];

export function rollOffer(state: GameState, count: number): Mod[] {
  const passive = PASSIVE_MODS;
  const weapon = collectWeaponPool(state);

  const picked: Mod[] = [];
  const pickedIds = new Set<string>();
  let summonPicked = false;

  for (let i = 0; i < count; i++) {
    let preferred: ModCategory =
      Math.random() < PASSIVE_PICK_CHANCE ? "passive" : "weapon";

    let chosen = pickFrom(state, preferred === "passive" ? passive : weapon, pickedIds, summonPicked);
    if (!chosen) {
      preferred = preferred === "passive" ? "weapon" : "passive";
      chosen = pickFrom(state, preferred === "passive" ? passive : weapon, pickedIds, summonPicked);
    }
    if (!chosen) break;

    picked.push(chosen);
    pickedIds.add(chosen.id);
    if (chosen.isSummon) summonPicked = true;
  }

  ensureDamageRelevant(state, picked, [...passive, ...weapon]);
  return picked;
}

function ensureDamageRelevant(state: GameState, picked: Mod[], allEligibleSource: Mod[]): void {
  if (picked.some((m) => m.isDamageRelevant)) return;
  const pickedIds = new Set(picked.map((m) => m.id));
  const candidates = allEligibleSource.filter(
    (m) => m.isDamageRelevant && !pickedIds.has(m.id) && m.eligible(state)
  );
  if (candidates.length === 0) return;
  const replacement = candidates[Math.floor(Math.random() * candidates.length)];
  const replaceIdx = Math.floor(Math.random() * picked.length);
  picked[replaceIdx] = replacement;
}

function collectWeaponPool(state: GameState): Mod[] {
  return [...getEligibleSummonMods(state), ...getOwnedWeaponMods(state)];
}

function pickFrom(
  state: GameState,
  source: Mod[],
  pickedIds: Set<string>,
  summonPicked: boolean
): Mod | null {
  const pool = source.filter(
    (m) => !pickedIds.has(m.id) && m.eligible(state) && !(summonPicked && m.isSummon)
  );
  if (pool.length === 0) return null;
  return pool[Math.floor(Math.random() * pool.length)];
}
