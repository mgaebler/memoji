import { Card } from "./Card";
import { Player } from "./Player";

export interface Game {
  cardMultiplier: number;
  cards: Card[];
  players: Player[];
}
