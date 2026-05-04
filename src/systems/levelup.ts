import type { GameState } from "../game";
import {
  BUTTON_H,
  BUTTON_W,
  LEVELUP_OFFER_COUNT,
  MODAL_CARD_GAP,
  MODAL_CARD_H,
  MODAL_CARD_W,
} from "../constants";
import { rollOffer, type Mod } from "../mods";

export function maybeStartLevelUp(state: GameState): void {
  if (state.pendingLevelUps <= 0) return;
  if (state.offer) return;
  const cards = rollOffer(state, LEVELUP_OFFER_COUNT);
  if (cards.length === 0) {
    state.pendingLevelUps = 0;
    return;
  }
  state.offer = cards;
  state.phase = "levelup";
}

export function handleLevelUpClick(state: GameState): void {
  if (!state.offer) return;
  if (!state.input.mouseClicked) return;

  const reroll = getRerollButtonRect(state);
  if (reroll && hitTestRect(state.input.mouse.x, state.input.mouse.y, reroll)) {
    state.player.rerollTokens -= 1;
    state.offer = rollOffer(state, LEVELUP_OFFER_COUNT);
    return;
  }

  const idx = hitTestCard(state, state.input.mouse.x, state.input.mouse.y);
  if (idx < 0) return;

  const picked = state.offer[idx];
  picked.apply(state);
  state.offer = null;
  state.pendingLevelUps -= 1;

  if (state.pendingLevelUps > 0) {
    maybeStartLevelUp(state);
  } else {
    state.pendingLevelUps = 0;
    state.phase = "playing";
  }
}

export function getCardRects(state: GameState): { x: number; y: number; w: number; h: number }[] {
  const offer = state.offer;
  if (!offer) return [];
  const { width, height } = state.viewport;
  const totalW = offer.length * MODAL_CARD_W + (offer.length - 1) * MODAL_CARD_GAP;
  const startX = (width - totalW) / 2;
  const y = (height - MODAL_CARD_H) / 2;
  const rects = [];
  for (let i = 0; i < offer.length; i++) {
    rects.push({
      x: startX + i * (MODAL_CARD_W + MODAL_CARD_GAP),
      y,
      w: MODAL_CARD_W,
      h: MODAL_CARD_H,
    });
  }
  return rects;
}

function hitTestCard(state: GameState, mx: number, my: number): number {
  const rects = getCardRects(state);
  for (let i = 0; i < rects.length; i++) {
    if (hitTestRect(mx, my, rects[i])) return i;
  }
  return -1;
}

function hitTestRect(
  mx: number,
  my: number,
  r: { x: number; y: number; w: number; h: number }
): boolean {
  return mx >= r.x && mx <= r.x + r.w && my >= r.y && my <= r.y + r.h;
}

export function getRerollButtonRect(
  state: GameState
): { x: number; y: number; w: number; h: number } | null {
  if (!state.offer) return null;
  if (state.player.rerollTokens <= 0) return null;
  const { width, height } = state.viewport;
  const cardBottom = (height - MODAL_CARD_H) / 2 + MODAL_CARD_H;
  return {
    x: (width - BUTTON_W) / 2,
    y: cardBottom + 24,
    w: BUTTON_W,
    h: BUTTON_H,
  };
}

export type { Mod };
