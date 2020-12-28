import { createReducer, createAction } from "@reduxjs/toolkit";
import { Game } from "../../domain/Game";
import {
  generateCardPairs,
  randomArrayShuffle,
} from "../../functions/generateCards";

const initialGameState: Game = {
  cards: [
    // { id: "asdlfasdkfja", icon: "😀", revealed: false },
    // { id: "asdfasdfasdfasdf", icon: "🤣", revealed: false },
    // { id: "asdfasdf", icon: "😉", revealed: false },
    // { id: "adfasdfasdf", icon: "🥰", revealed: false },
  ],
  players: [],
};

export const cardReveal = createAction<{ id: string }>("game/CARD_REVEAL");
export const cardsHide = createAction("game/CARDS_HIDE");
export const cardAssign = createAction<{ id: string }>("game/CARDS_ASSIGN");
export const nextPlayer = createAction("game/PLAYER_NEXT");
export const cardsInit = createAction("game/CARDS_INIT");

export const gameReducer = createReducer(initialGameState, (builder) => {
  builder.addCase(cardReveal, (state, action) => {
    const cards = state.cards.map((card) =>
      action.payload.id === card.id ? { ...card, revealed: true } : card
    );

    return { cards, players: state.players };
  });
  builder.addCase(cardsHide, (state) => {
    // all cards which are not assigned to player already and
    // which are revealed true shall switch state to false
    const cards = state.cards.map((card) => ({ ...card, revealed: false }));
    return { cards, players: state.players };
  });
  builder.addCase(cardsInit, (state) => {
    const items = 4;
    const cards = generateCardPairs(Math.pow(items, 2) / 2);
    randomArrayShuffle(cards);
    return { cards, players: state.players };
  });
});
