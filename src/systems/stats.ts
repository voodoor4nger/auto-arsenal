import type { GameState } from "../game";
import {
  STATS_DPS_WINDOW_FRAMES,
  STATS_MOMENT_WINDOW_FRAMES,
  STATS_MOMENT_WINDOW_SECONDS,
} from "../constants";

export function updateStats(state: GameState): void {
  // Push frame samples
  state.dpsWindow.push(state.frameDamageDealt);
  if (state.dpsWindow.length > STATS_DPS_WINDOW_FRAMES) state.dpsWindow.shift();

  state.damageDealtBuckets.push(state.frameDamageDealt);
  if (state.damageDealtBuckets.length > STATS_MOMENT_WINDOW_FRAMES) {
    state.damageDealtBuckets.shift();
  }

  const sample = { total: 0, bySource: { ...state.frameDamageTaken } };
  for (const v of Object.values(state.frameDamageTaken)) sample.total += v;
  state.damageTakenBuckets.push(sample);
  if (state.damageTakenBuckets.length > STATS_MOMENT_WINDOW_FRAMES) {
    state.damageTakenBuckets.shift();
  }

  // Best moment: total damage dealt over the moment window
  let dealtSum = 0;
  for (const v of state.damageDealtBuckets) dealtSum += v;
  const dps = dealtSum / STATS_MOMENT_WINDOW_SECONDS;
  if (dps > state.bestMoment.dps) {
    state.bestMoment.dps = dps;
    state.bestMoment.dealt = dealtSum;
    state.bestMoment.time = state.time;
  }

  // Worst moment: total damage taken over the window with dominant source
  let takenSum = 0;
  const bySource: Record<string, number> = {};
  for (const s of state.damageTakenBuckets) {
    takenSum += s.total;
    for (const k in s.bySource) {
      bySource[k] = (bySource[k] ?? 0) + s.bySource[k];
    }
  }
  if (takenSum > state.worstMoment.damage) {
    let topKey = "";
    let topVal = 0;
    for (const k in bySource) {
      if (bySource[k] > topVal) {
        topVal = bySource[k];
        topKey = k;
      }
    }
    state.worstMoment.damage = takenSum;
    state.worstMoment.time = state.time;
    state.worstMoment.dominantSource = topKey;
  }

  // Reset per-frame accumulators
  state.frameDamageDealt = 0;
  state.frameDamageTaken = {};
}

export function liveDps(state: GameState): number {
  if (state.dpsWindow.length === 0) return 0;
  let sum = 0;
  for (const v of state.dpsWindow) sum += v;
  // Window is N frames at 60Hz; convert per-frame total to per-second.
  return sum * (60 / state.dpsWindow.length);
}
