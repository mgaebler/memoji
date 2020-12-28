export interface Card {
  id: string;
  icon: string;
  revealed: boolean;
  playerId?: string; //if undefined its not assigned to a player
}
