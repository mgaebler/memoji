import { createReducer } from "@reduxjs/toolkit";
import { Game } from "../../domain/Game";
import { generateCardPairs } from "../../functions/generateCards";
import { randomArrayShuffle } from "../../functions/randomArrayShuffle";
import {
  cardReveal,
  cardsHide,
  cardsInit,
  cardAssign,
  setCardMultiplier,
} from "./gameActions";
import { calculateNumberOfCards } from "./calculateNumberOfCards";

const initialGameState: Game = {
  // TODO: currently it is only possible to use an initial set option of 4, but this should be an arbritary number between 1 and 10
  cardMultiplier: 4,
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
      action.payload.id === card.id ? { ...card, revealed: true } : card,
    );

    state.cards = cards;
    return state;
  });
  builder.addCase(cardsHide, (state) => {
    // all cards which are not assigned to player already and
    // which are revealed true shall switch state to false
    const cards = state.cards.map((card) => ({ ...card, revealed: false }));
    state.cards = cards;
    return state;
  });
  // initialize the deck
  builder.addCase(cardsInit, (state) => {
    const multiplier = state.cardMultiplier;
    const cardsTotal = calculateNumberOfCards(multiplier);
    const cards = generateCardPairs(cardsTotal / 2);
    randomArrayShuffle(cards);
    state.cards = cards;
    return state;
  });
  builder.addCase(cardAssign, (state, action) => {
    const { playerId, cardIds } = action.payload;
    const newCardState = state.cards.map((card) =>
      cardIds.includes(card.id)
        ? { ...card, playerId: playerId, revealed: false }
        : card,
    );
    state.cards = newCardState;
    return state;
  });

  // control the number of cards
  builder.addCase(setCardMultiplier, (state, action) => {
    const { numberOfCards } = action.payload;
    state.cardMultiplier = numberOfCards;
    return state;
  });
});

export default gameReducer;
