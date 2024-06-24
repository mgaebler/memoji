import Board from "./Board/Board";
import { LayoutVertical2080 } from "../layouts/LayoutVertical2080";
import { Panels } from "../components/Panels";
import { useAppSelector } from "../hooks";
import { GameEndScreen } from "./GameEndScreen";

export function GameScreen() {
  const game = useAppSelector((state) => state.game);
  const gameState = game.gameState;

  switch (gameState) {
    case "finished":
      return <GameEndScreen />;

    default:
      return (
        <LayoutVertical2080 panel={<Panels />}>
          <Board />
        </LayoutVertical2080>
      );
  }
}
