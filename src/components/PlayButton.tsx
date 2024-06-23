import {
  cardsInit,
  setCurrentPlayerAction,
  setGameStateAction,
} from "../features/game/gameActions";
import { useAppDispatch, useAppSelector } from "../hooks";

export const PlayButton = () => {
  const dispatch = useAppDispatch();
  const game = useAppSelector((state) => state.game);
  const gameState = game.gameState;
  const players = game.players;
  const gameIsIdle = gameState === "idle";

  let buttonText = "Start";
  if (gameState === "playing") buttonText = "Stop";
  if (gameState === "finished") buttonText = "Reset";

  function setGameState() {
    if (gameIsIdle) {
      if (players.length < 1) throw new Error("No players in game");
      dispatch(setGameStateAction("playing"));
      dispatch(cardsInit());
      // set first player active
      dispatch(setCurrentPlayerAction({ id: players[0].id }));
    } else if (gameState === "playing") {
      dispatch(setGameStateAction("finished"));
    } else if (gameState === "finished") {
      dispatch(setGameStateAction("idle"));
      dispatch(cardsInit());
    }
  }
  return (
    <button onClick={setGameState} className="start-btn">
      {buttonText}
    </button>
  );
};
