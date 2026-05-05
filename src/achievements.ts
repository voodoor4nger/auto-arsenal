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
    id: ACHIEVEMENTS.EXTRACT_LEVEL_15.ID,
    desc: ACHIEVEMENTS.EXTRACT_LEVEL_15.DESC,
    weaponId: ACHIEVEMENTS.EXTRACT_LEVEL_15.WEAPON,
    weaponName: nameForWeapon(ACHIEVEMENTS.EXTRACT_LEVEL_15.WEAPON),
    criteria: (s) => s.player.level >= ACHIEVEMENTS.EXTRACT_LEVEL_15.LEVEL_THRESHOLD,
  },
  {
    id: ACHIEVEMENTS.EXTRACT_KILLS_1000.ID,
    desc: ACHIEVEMENTS.EXTRACT_KILLS_1000.DESC,
    weaponId: ACHIEVEMENTS.EXTRACT_KILLS_1000.WEAPON,
    weaponName: nameForWeapon(ACHIEVEMENTS.EXTRACT_KILLS_1000.WEAPON),
    criteria: (s) => s.killCount >= ACHIEVEMENTS.EXTRACT_KILLS_1000.KILL_THRESHOLD,
  },
  {
    id: ACHIEVEMENTS.EXTRACT_MIN_9.ID,
    desc: ACHIEVEMENTS.EXTRACT_MIN_9.DESC,
    weaponId: ACHIEVEMENTS.EXTRACT_MIN_9.WEAPON,
    weaponName: nameForWeapon(ACHIEVEMENTS.EXTRACT_MIN_9.WEAPON),
    // checkAchievements is only invoked from extractRun, where state.extraction
    // is still set with the window the player just stepped into. ?? 0 is
    // defensive against the function being called outside that flow.
    criteria: (s) =>
      (s.extraction?.windowIndex ?? 0) >= ACHIEVEMENTS.EXTRACT_MIN_9.WINDOW_THRESHOLD,
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
  if (weaponId === "pistol") return true;
  const ach = ACHIEVEMENT_DEFS.find((a) => a.weaponId === weaponId);
  if (!ach) return true;
  return !!save.achievements[ach.id];
}

export function getUnlockText(weaponId: string): string {
  const ach = ACHIEVEMENT_DEFS.find((a) => a.weaponId === weaponId);
  return ach ? ach.desc : "";
}
