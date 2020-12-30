import { generateCardPairs } from "./generateCards";

test("should create random cards", () => {
  const pair = generateCardPairs(1);
  const [card1, card2] = pair;
  // pairs item should be the same
  expect(card1.icon).toBe(card2.icon);
  // pairs id should be not the same
  expect(card1.id).not.toBe(card2.id);
});

export {};
