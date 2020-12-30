import { cardReveal, cardsHide, cardsInit, gameReducer } from ".";
import { Game } from "../../domain/Game";
import { generateCardPairs } from "../../functions/generateCards";

const mockPlayer = {
  id: "007",
  color: "red",
  score: 0,
};

describe("Game feature", () => {
  it("should initiate with a player object", () => {
    // for now it would be good to hold a player object because
    // there is no menu and no multiplayer implemented yet

    const expectedObject: Game = { players: [mockPlayer], cards: [] };
    expect(gameReducer(undefined, { type: "" })).toEqual(expectedObject);
  });

  test.skip("should handle cardInit", () => {
    // creates one pair of cards
    const cardPairs = generateCardPairs(1);

    // game mock
    const game: Game = { players: [mockPlayer], cards: [] };

    // expect(gameReducer(game, cardsInit(cardPairs))).toEqual();
  });

  it("should handle cardReveal", () => {
    // creates one pair of cards
    const cardPairs = generateCardPairs(1);
    const [card1] = cardPairs;
    const expectedPair = cardPairs.map((card) =>
      card.id === card1.id ? { ...card, revealed: true } : card
    );

    // game mock
    const game: Game = { players: [mockPlayer], cards: cardPairs };

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
    const game: Game = { players: [mockPlayer], cards: revealedPair };

    expect(gameReducer(game, cardsHide())).toEqual({
      ...game,
      cards: expectedPair,
    });
  });
});

export {};
