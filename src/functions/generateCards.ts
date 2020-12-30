import { Card } from "../domain/Card";

import { v4 as uuidv4 } from "uuid";
import emoji from "node-emoji";

/**
 * generates cards with param amount
 * each iteration should generate 2 cards with same icon but different IDs
 */
export function generateCardPairs(amount: number): Card[] {
  let cards = [];
  for (let i = 0; i < amount; i++) {
    // create emoji for both cards
    const icon = emoji.random().emoji;
    // create card 1
    const card = {
      id: uuidv4(),
      icon: icon,
      revealed: false,
    };
    cards.push(card);

    // create card 2
    const card2 = {
      id: uuidv4(),
      icon: icon,
      revealed: false,
    };
    cards.push(card2);
  }
  return cards;
}
