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
  setGameStateAction,
  addPlayerAction,
  removePlayerAction,
  setCurrentPlayerAction,
  nextPlayerAction,
  setThemeAction,
} from "./gameActions";
import { calculateNumberOfCards } from "./calculateNumberOfCards";
import { v4 as uuidv4 } from "uuid";

// set 4 colors for possible players
const playerColors: string[] = ["green", "red", "yellow", "blue"];

const initialGameState: Game = {
  gameState: "idle",
  cardMultiplier: 4,
  cards: [],
  players: [],
  currentTheme: "nature",
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
    const cards = generateCardPairs(cardsTotal / 2, state.currentTheme);
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

    // calculate player score
    const playerTotalCards = newCardState.filter((card) => {
      return card.playerId === playerId;
    }).length;

    const score = playerTotalCards > 0 ? playerTotalCards / 2 : 0;

    // update the players score
    const newPlayers = state.players.map((player) =>
      playerId === player.id ? { ...player, score: score } : player,
    );
    state.players = newPlayers;

    return state;
  });

  // control the number of cards
  builder.addCase(setCardMultiplier, (state, action) => {
    const { numberOfCards } = action.payload;
    state.cardMultiplier = numberOfCards;
    return state;
  });

  // control the game state
  builder.addCase(setGameStateAction, (state, action) => {
    const gameState = action.payload;
    state.gameState = gameState;
    return state;
  });

  // control the players
  builder.addCase(addPlayerAction, (state, _action) => {
    if (state.players.length < 4) {
      const playerColor = playerColors[state.players.length];
      state.players.push({
        id: uuidv4(),
        color: playerColor,
        score: 0,
      });
      return state;
    } else {
      return state;
      // TODO: throw error here
    }
  });

  builder.addCase(removePlayerAction, (state, _action) => {
    // pop the last player out if at least 2 players are left
    state.players.pop();
    return state;
  });

  builder.addCase(setCurrentPlayerAction, (state, action) => {
    state.currentPlayerId = action.payload.id;
    return state;
  });

  builder.addCase(nextPlayerAction, (state) => {
    const currentIndex = state.players.findIndex(
      (player) => player.id === state.currentPlayerId,
    );
    // get the next player in the list
    const nextIndex =
      currentIndex + 1 < state.players.length ? currentIndex + 1 : 0;
    const newCurrentPlayerId = state.players[nextIndex].id;
    state.currentPlayerId = newCurrentPlayerId;
    return state;
  });

  builder.addCase(setThemeAction, (state, action) => {
    state.currentTheme = action.payload;
    return state;
  });
});

export default gameReducer;
