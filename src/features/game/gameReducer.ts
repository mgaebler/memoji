import { createReducer } from "@reduxjs/toolkit";
import { Game } from "../../domain/Game";
import { generateCardPairs } from "../../functions/generateCards";
import { randomArrayShuffle } from "../../functions/randomArrayShuffle";
import { cardReveal, cardsHide, cardsInit, cardAssign } from "./gameActions";

const initialGameState: Game = {
  cards: [
    // { id: "asdlfasdkfja", icon: "😀", revealed: false },
    // { id: "asdfasdfasdfasdf", icon: "🤣", revealed: false },
    // { id: "asdfasdf", icon: "😉", revealed: false },
    // { id: "adfasdfasdf", icon: "🥰", revealed: false },
  ],
  players: [
    {
      id: "007",
      color: "red",
      score: 0,
    },
  ],
};

 const gameReducer = createReducer(initialGameState, (builder) => {
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
  builder.addCase(cardAssign, (state, action) => {
    const { playerId, cardIds } = action.payload;
    const newCardState = state.cards.map((card) =>
      cardIds.includes(card.id)
        ? { ...card, playerId: playerId, revealed: false }
        : card
    );
    return { cards: newCardState, players: state.players };
  });
});

export default gameReducer