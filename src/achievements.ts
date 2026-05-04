import type { GameState } from "./game";
import type { SaveData } from "./save";
import type { WeaponType } from "./types";
import { ACHIEVEMENTS } from "./constants";
import { WEAPON_DEFS } from "./weapons";

export type Achievement = {
  id: string;
  desc: string;
  weaponId: WeaponType;
  weaponName: string;
  criteria: (state: GameState) => boolean;
};

function nameForWeapon(id: WeaponType): string {
  const def = WEAPON_DEFS.find((d) => d.type === id);
  return def ? def.name : id;
}

export const ACHIEVEMENT_DEFS: Achievement[] = [
  {
    id: ACHIEVEMENTS.REACH_LEVEL_10.ID,
    desc: ACHIEVEMENTS.REACH_LEVEL_10.DESC,
    weaponId: ACHIEVEMENTS.REACH_LEVEL_10.WEAPON,
    weaponName: nameForWeapon(ACHIEVEMENTS.REACH_LEVEL_10.WEAPON),
    criteria: (s) => s.player.level >= ACHIEVEMENTS.REACH_LEVEL_10.LEVEL_THRESHOLD,
  },
  {
    id: ACHIEVEMENTS.KILL_500.ID,
    desc: ACHIEVEMENTS.KILL_500.DESC,
    weaponId: ACHIEVEMENTS.KILL_500.WEAPON,
    weaponName: nameForWeapon(ACHIEVEMENTS.KILL_500.WEAPON),
    criteria: (s) => s.killCount >= ACHIEVEMENTS.KILL_500.KILL_THRESHOLD,
  },
  {
    id: ACHIEVEMENTS.SURVIVE_5_MIN.ID,
    desc: ACHIEVEMENTS.SURVIVE_5_MIN.DESC,
    weaponId: ACHIEVEMENTS.SURVIVE_5_MIN.WEAPON,
    weaponName: nameForWeapon(ACHIEVEMENTS.SURVIVE_5_MIN.WEAPON),
    criteria: (s) => s.time >= ACHIEVEMENTS.SURVIVE_5_MIN.SECONDS_THRESHOLD,
  },
];

export function checkAchievements(state: GameState): Achievement[] {
  const newlyUnlocked: Achievement[] = [];
  for (const ach of ACHIEVEMENT_DEFS) {
    if (state.save.achievements[ach.id]) continue;
    if (!ach.criteria(state)) continue;
    state.save.achievements[ach.id] = true;
    newlyUnlocked.push(ach);
  }
  return newlyUnlocked;
}

export function isWeaponUnlocked(save: SaveData, weaponId: string): boolean {
  if (weaponId === "projectile") return true;
  const ach = ACHIEVEMENT_DEFS.find((a) => a.weaponId === weaponId);
  if (!ach) return true;
  return !!save.achievements[ach.id];
}

export function getUnlockText(weaponId: string): string {
  const ach = ACHIEVEMENT_DEFS.find((a) => a.weaponId === weaponId);
  return ach ? ach.desc : "";
}
