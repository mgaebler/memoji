import { Card } from "./Card";
import { Player } from "./Player";

export interface Game {
  numberOfCards: number;
  cards: Card[];
  players: Player[];
}
