import { Card } from "./Card";
import { Player } from "./Player";

export type GameState = "idle" | "playing" | "finished";

export interface Game {
  gameState: GameState;
  cardMultiplier: number;
  cards: Card[];
  players: Player[];
  currentPlayerId?: string;
}
