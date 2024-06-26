import gameReducer from "./gameReducer";
import { cardAssign, cardReveal, cardsHide } from "./gameActions";
import { Game } from "../../domain/Game";
import { generateCardPairs } from "../../functions/generateCards";
import { Player } from "../../domain/Player";

const mockPlayer: Player = {
  id: "007",
  color: "red",
  score: 0,
};

const mockGame: Game = {
  cardMultiplier: 2,
  players: [mockPlayer],
  cards: [],
  gameState: "idle",
  currentTheme: "clothing",
};

describe("Game feature", () => {
  it("should initiate with a player object", () => {
    // for now it would be good to hold a player object because
    // there is no menu and no multiplayer implemented yet

    const expectedObject: Game = mockGame;
    expect(gameReducer(undefined, { type: "" })).toEqual(expectedObject);
  });

  test.skip("should handle cardInit", () => {
    // creates one pair of cards
    const cardPairs = generateCardPairs(1);

    // game mock
    const game: Game = mockGame;

    // expect(gameReducer(game, cardsInit(cardPairs))).toEqual();
  });

  it("should handle cardReveal", () => {
    // creates one pair of cards
    const cardPairs = generateCardPairs(1);
    const [card1] = cardPairs;
    const expectedPair = cardPairs.map((card) =>
      card.id === card1.id ? { ...card, revealed: true } : card,
    );

    // game mock
    const game: Game = {
      ...mockGame,
      cards: cardPairs,
    };

    expect(gameReducer(game, cardReveal({ id: card1.id }))).toEqual({
      ...game,
      cards: expectedPair,
    });
  });

  it("should handle cards hide", () => {
    // creates one pair of cards
    const expectedPair = generateCardPairs(1);

    // reveal all cards
    const revealedPair = expectedPair.map((card) => ({
      ...card,
      revealed: true,
    }));

    // game mock
    const game: Game = {
      ...mockGame,
      cards: revealedPair,
    };

    expect(gameReducer(game, cardsHide())).toEqual({
      ...game,
      cards: expectedPair,
    });
  });

  it("should handle cardAssign", () => {
    // creates one pair of cards
    const player = mockPlayer;
    const cardPairs = generateCardPairs(1);

    const game: Game = { ...mockGame, players: [player], cards: cardPairs };

    // expectation
    const expectedCards = cardPairs.map((card) => ({
      ...card,
      playerId: player.id,
    }));
    const expectedGame: Game = {
      ...mockGame,
      players: [player],
      cards: expectedCards,
    };

    // nachdem cardAssign durchgeführt wurde sollen alle aufgedeckten karten dem benutzer zugewiesen sein
    expect(
      gameReducer(
        game,
        cardAssign({
          playerId: player.id,
          cardIds: [cardPairs[0].id, cardPairs[1].id],
        }),
      ),
    ).toEqual(expectedGame);
  });
});

export {};
