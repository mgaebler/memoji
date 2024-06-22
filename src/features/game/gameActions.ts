import { createAction } from "@reduxjs/toolkit";

// card actions
export const cardsInit = createAction("game/CARDS_INIT");
export const cardReveal = createAction<{ id: string }>("game/CARD_REVEAL");
export const cardsHide = createAction("game/CARDS_HIDE");
export const cardAssign = createAction<{ playerId: string; cardIds: string[] }>(
  "game/CARDS_ASSIGN",
);

/*
 player actions
*/
export const nextPlayer = createAction("game/PLAYER_NEXT");
// add player
export const addPlayer = createAction<{ id: string }>("game/ADD_PLAYER");
// remove player
export const removePlayer = createAction<{ id: string }>("game/REMOVE_PLAYER");
