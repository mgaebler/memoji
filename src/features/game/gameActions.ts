import { createAction } from "@reduxjs/toolkit";


export const cardReveal = createAction<{ id: string; }>("game/CARD_REVEAL");
export const cardsHide = createAction("game/CARDS_HIDE");
export const cardAssign = createAction<{ playerId: string; cardIds: string[]; }>(
  "game/CARDS_ASSIGN"
);

export const nextPlayer = createAction("game/PLAYER_NEXT");
export const cardsInit = createAction("game/CARDS_INIT");
