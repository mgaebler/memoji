import { Card } from "./Card";
import { Player } from "./Player";

export interface Game {
  cards: Card[];
  players: Player[];
}
