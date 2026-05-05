import { SAVE_KEY } from "./constants";

export type SaveData = {
  totalScrap: number;
  upgrades: { [upgradeId: string]: number };
  achievements: { [id: string]: boolean };
  selectedStartingWeapon: string;
};

export function defaultSave(): SaveData {
  return {
    totalScrap: 0,
    upgrades: {},
    achievements: {},
    selectedStartingWeapon: "pistol",
  };
}

export function loadSave(): SaveData {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return defaultSave();
    const parsed = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null) return defaultSave();
    const totalScrap =
      typeof parsed.totalScrap === "number" && Number.isFinite(parsed.totalScrap)
        ? Math.max(0, Math.floor(parsed.totalScrap))
        : 0;
    const upgrades: { [k: string]: number } = {};
    if (parsed.upgrades && typeof parsed.upgrades === "object") {
      for (const [k, v] of Object.entries(parsed.upgrades)) {
        if (typeof v === "number" && Number.isFinite(v)) {
          upgrades[k] = Math.max(0, Math.floor(v));
        }
      }
    }
    const achievements: { [k: string]: boolean } = {};
    if (parsed.achievements && typeof parsed.achievements === "object") {
      for (const [k, v] of Object.entries(parsed.achievements)) {
        if (typeof v === "boolean") achievements[k] = v;
      }
    }
    let selectedStartingWeapon =
      typeof parsed.selectedStartingWeapon === "string"
        ? parsed.selectedStartingWeapon
        : "pistol";
    if (selectedStartingWeapon === "projectile") selectedStartingWeapon = "pistol";
    return { totalScrap, upgrades, achievements, selectedStartingWeapon };
  } catch {
    return defaultSave();
  }
}

export function writeSave(data: SaveData): void {
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(data));
  } catch {
    /* storage full or disabled — ignore */
  }
}

export function wipeSave(): SaveData {
  try {
    localStorage.removeItem(SAVE_KEY);
  } catch {
    /* ignore */
  }
  return defaultSave();
}
