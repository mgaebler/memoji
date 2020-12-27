import { createReducer, createAction } from "@reduxjs/toolkit";
import { Game } from "../../domain/Game";

const initialGameState: Game = {
  cards: [
    { id: "asdlfasdkfja", icon: "😀", revealed: false },
    { id: "asdfasdfasdfasdf", icon: "🤣", revealed: false },
    { id: "asdfasdf", icon: "😉", revealed: false },
    { id: "adfasdfasdf", icon: "🥰", revealed: false },
  ],
  players: [],
};

export const cardReveal = createAction<{ id: string }>("game/CARD_REVEAL");

export const gameReducer = createReducer(initialGameState, (builder) => {
  builder.addCase(cardReveal, (state, action) => {
    const cards = state.cards.map((card) =>
      action.payload.id === card.id ? { ...card, revealed: true } : card
    );

    return { cards, players: state.players };
  });
});
