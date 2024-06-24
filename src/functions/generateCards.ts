import { Card } from "../domain/Card";

import { v4 as uuidv4 } from "uuid";
import { Emoticon, emoticons } from "../assets/emoticons";

const getRandomItemFromArray = (items: Array<string>) =>
  items[Math.floor(Math.random() * items.length)];

/**
 * generates cards with param amount
 * each iteration should generate 2 cards with same icon but different IDs
 */
export function generateCardPairs(
  amount: number,
  theme: Emoticon = "nature",
): Card[] {
  const emoticonSet = emoticons[theme];
  if (emoticonSet.length < amount / 2) {
    throw Error("Not enough items in array for required amount of cards");
  }

  let cards: Card[] = [];
  for (let i = 0; i < amount; i++) {
    // create emoji for both cards
    let icon = getRandomItemFromArray(emoticonSet);

    const itemsInUse = cards.map((card) => card.icon);
    while (itemsInUse.includes(icon)) {
      console.info("Icon already exist, try another one.");
      icon = getRandomItemFromArray(emoticonSet);
    }

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
