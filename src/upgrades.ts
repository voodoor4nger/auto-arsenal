import type { GameState } from "./game";
import type { SaveData } from "./save";
import { PLAYER_SPEED, UPGRADES } from "./constants";

export type UpgradeDef = {
  id: string;
  name: string;
  desc: string;
  maxTier: number;
  costs: number[];
  apply: (state: GameState, tier: number) => void;
};

export const UPGRADE_DEFS: UpgradeDef[] = [
  {
    id: UPGRADES.REINFORCED_FRAME.ID,
    name: UPGRADES.REINFORCED_FRAME.NAME,
    desc: UPGRADES.REINFORCED_FRAME.DESC,
    maxTier: UPGRADES.REINFORCED_FRAME.MAX_TIER,
    costs: [...UPGRADES.REINFORCED_FRAME.COSTS],
    apply: (s, tier) => {
      s.player.maxHp += UPGRADES.REINFORCED_FRAME.HP_PER_TIER * tier;
      s.player.hp = s.player.maxHp;
    },
  },
  {
    id: UPGRADES.GREASED_BEARINGS.ID,
    name: UPGRADES.GREASED_BEARINGS.NAME,
    desc: UPGRADES.GREASED_BEARINGS.DESC,
    maxTier: UPGRADES.GREASED_BEARINGS.MAX_TIER,
    costs: [...UPGRADES.GREASED_BEARINGS.COSTS],
    apply: (s, tier) => {
      const bonus = UPGRADES.GREASED_BEARINGS.SPEED_PCT_PER_TIER * tier;
      s.player.moveSpeed += PLAYER_SPEED * bonus;
    },
  },
  {
    id: UPGRADES.SHARPER_EDGES.ID,
    name: UPGRADES.SHARPER_EDGES.NAME,
    desc: UPGRADES.SHARPER_EDGES.DESC,
    maxTier: UPGRADES.SHARPER_EDGES.MAX_TIER,
    costs: [...UPGRADES.SHARPER_EDGES.COSTS],
    apply: (s, tier) => {
      s.player.globalDamageMult += UPGRADES.SHARPER_EDGES.DMG_PCT_PER_TIER * tier;
    },
  },
  {
    id: UPGRADES.WIDER_MAGNET.ID,
    name: UPGRADES.WIDER_MAGNET.NAME,
    desc: UPGRADES.WIDER_MAGNET.DESC,
    maxTier: UPGRADES.WIDER_MAGNET.MAX_TIER,
    costs: [...UPGRADES.WIDER_MAGNET.COSTS],
    apply: (s, tier) => {
      s.player.pickupRadius += UPGRADES.WIDER_MAGNET.PICKUP_PER_TIER * tier;
    },
  },
  {
    id: UPGRADES.SALVAGE_NETWORK.ID,
    name: UPGRADES.SALVAGE_NETWORK.NAME,
    desc: UPGRADES.SALVAGE_NETWORK.DESC,
    maxTier: UPGRADES.SALVAGE_NETWORK.MAX_TIER,
    costs: [...UPGRADES.SALVAGE_NETWORK.COSTS],
    apply: () => {
      /* meta-only: read at scrap calc time */
    },
  },
  {
    id: UPGRADES.FIELD_MEDIC.ID,
    name: UPGRADES.FIELD_MEDIC.NAME,
    desc: UPGRADES.FIELD_MEDIC.DESC,
    maxTier: UPGRADES.FIELD_MEDIC.MAX_TIER,
    costs: [...UPGRADES.FIELD_MEDIC.COSTS],
    apply: (s, tier) => {
      s.player.regen += UPGRADES.FIELD_MEDIC.REGEN_PER_TIER * tier;
    },
  },
  {
    id: UPGRADES.REROLL_TOKEN.ID,
    name: UPGRADES.REROLL_TOKEN.NAME,
    desc: UPGRADES.REROLL_TOKEN.DESC,
    maxTier: UPGRADES.REROLL_TOKEN.MAX_TIER,
    costs: [...UPGRADES.REROLL_TOKEN.COSTS],
    apply: (s, tier) => {
      s.player.rerollTokens = UPGRADES.REROLL_TOKEN.TOKENS_PER_TIER * tier;
    },
  },
  {
    id: UPGRADES.DASH_RECHARGE.ID,
    name: UPGRADES.DASH_RECHARGE.NAME,
    desc: UPGRADES.DASH_RECHARGE.DESC,
    maxTier: UPGRADES.DASH_RECHARGE.MAX_TIER,
    costs: [...UPGRADES.DASH_RECHARGE.COSTS],
    apply: (s, tier) => {
      s.player.dashCooldownMax = Math.max(
        0,
        s.player.dashCooldownMax -
          UPGRADES.DASH_RECHARGE.COOLDOWN_REDUCTION_PER_TIER * tier
      );
    },
  },
];

export function applyUpgrades(state: GameState, save: SaveData): void {
  for (const def of UPGRADE_DEFS) {
    const tier = save.upgrades[def.id] ?? 0;
    if (tier > 0) def.apply(state, tier);
  }
}

export function nextTierCost(def: UpgradeDef, currentTier: number): number | null {
  if (currentTier >= def.maxTier) return null;
  return def.costs[currentTier];
}

export function getSalvageMultiplier(save: SaveData): number {
  const tier = save.upgrades[UPGRADES.SALVAGE_NETWORK.ID] ?? 0;
  return 1 + tier * UPGRADES.SALVAGE_NETWORK.SCRAP_PCT_PER_TIER;
}
