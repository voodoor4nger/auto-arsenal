import type { GameState } from "./game";
import type { Enemy } from "./types";
import {
  BERSERKER_HP_THRESHOLD,
  BERSERKER_STACK,
  CRIT_FLASH_DURATION,
  SHIELDED_BREAK_TTL,
} from "./constants";

export function dealDamage(state: GameState, enemy: Enemy, base: number): void {
  const p = state.player;
  let dmg = base;

  const isCrit = p.critChance > 0 && Math.random() < p.critChance;
  if (isCrit) dmg *= p.critMult;

  if (p.maxHp > 0 && p.hp / p.maxHp < BERSERKER_HP_THRESHOLD) {
    dmg *= 1 + p.berserkerStacks * BERSERKER_STACK;
  }

  dmg *= p.globalDamageMult;

  if (enemy.species === "shielded" && enemy.shieldHp > 0) {
    if (dmg <= enemy.shieldHp) {
      state.totalDamageDealt += dmg;
      state.frameDamageDealt += dmg;
      enemy.shieldHp -= dmg;
      if (enemy.shieldHp <= 0) {
        enemy.shieldHp = 0;
        enemy.shieldBreakTtl = SHIELDED_BREAK_TTL;
      }
      if (isCrit && enemy.alive) enemy.critFlashTtl = CRIT_FLASH_DURATION;
      return;
    }
    state.totalDamageDealt += enemy.shieldHp;
    state.frameDamageDealt += enemy.shieldHp;
    dmg -= enemy.shieldHp;
    enemy.shieldHp = 0;
    enemy.shieldBreakTtl = SHIELDED_BREAK_TTL;
  }

  const applied = Math.min(dmg, enemy.hp);
  state.totalDamageDealt += applied;
  state.frameDamageDealt += applied;
  enemy.hp -= dmg;
  if (enemy.hp <= 0) {
    enemy.alive = false;
    return;
  }

  if (isCrit) enemy.critFlashTtl = CRIT_FLASH_DURATION;
}
