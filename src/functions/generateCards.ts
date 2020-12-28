// function generates cards with param amount
// each iteration should generate 2 cards with same icon but different IDs

import { Card } from "../domain/Card";
import { cardsInit } from "../features/game/reducer";
import { v4 as uuidv4 } from "uuid";
import emoji from "node-emoji";

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

export function randomArrayShuffle<ArrayType>(array: ArrayType[]) {
  let currentIndex: number = array.length;
  let temporaryValue;
  let randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

}
