import { createAction } from "@reduxjs/toolkit";
import { GameState } from "../../domain/Game";
import { Emoticon } from "../../assets/emoticons";

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
export const setCurrentPlayerAction = createAction<{ id: string }>(
  "game/SET_PLAYER",
);
export const nextPlayerAction = createAction("game/PLAYER_NEXT");
export const removePlayerAction = createAction("game/REMOVE_PLAYER");
export const addPlayerAction = createAction("game/ADD_PLAYER");

/*
set options
*/
export const setCardMultiplier = createAction<{ numberOfCards: number }>(
  "game/SET_NUMBER_OF_CARDS",
);

/*
setGameState
*/
export const setGameStateAction = createAction<GameState>(
  "game/SET_GAME_STATE",
);

/*
set game theme
*/
export const setThemeAction = createAction<Emoticon>("game/SET_THEME");
