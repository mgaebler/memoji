import styled from "styled-components";
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

  let buttonText;
  if (gameState === "idle") buttonText = "Select Players";
  if (gameState === "player_select") buttonText = "Start";
  if (gameState === "playing") buttonText = "Stop Game";
  if (gameState === "finished") buttonText = "Start Over";

  function setGameState() {
    switch (gameState) {
      case "idle":
        // transition to player select
        dispatch(setGameStateAction("player_select"));
        break;
      case "player_select":
        if (players.length < 1) throw new Error("No players in game");
        dispatch(cardsInit());
        // set first player active
        dispatch(setCurrentPlayerAction({ id: players[0].id }));
        dispatch(setGameStateAction("playing"));
        break;
      case "playing":
        dispatch(setGameStateAction("finished"));
        break;
      case "finished":
        dispatch(setGameStateAction("idle"));
        dispatch(cardsInit());
        break;
    }
  }
  return (
    <ButtonStyled onClick={setGameState}>
      {buttonText}
    </ButtonStyled>
  );
};

const ButtonStyled = styled.button({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "#5b42f3",
  border: "none",
  borderRadius: 8,
  padding: "8px 18px",
  fontSize: 14,
  fontWeight: 600,
  color: "white",
  cursor: "pointer",
  whiteSpace: "nowrap",
  transition: "background 200ms",
  "&:hover": {
    background: "#4a35d4",
  },
});
