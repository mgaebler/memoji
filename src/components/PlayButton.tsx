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
    <ButtonStyled onClick={setGameState} className="start-btn">
      <ButtonSpan>{buttonText}</ButtonSpan>
    </ButtonStyled>
  );
};

const ButtonStyled = styled.button`
  align-items: center;
  background-image: linear-gradient(144deg, #af40ff, #5b42f3 50%, #00ddeb);
  border: 0;
  border-radius: 8px;
  box-shadow: rgba(151, 65, 252, 0.2) 0 15px 30px -5px;
  box-sizing: border-box;
  color: #ffffff;
  display: flex;
  font-family: Phantomsans, sans-serif;
  font-size: 20px;
  justify-content: center;
  line-height: 1em;
  max-width: 100%;
  min-width: 140px;
  padding: 3px;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  white-space: nowrap;
  cursor: pointer;
  width: 100%;
`;

const ButtonSpan = styled.span`
  background-color: rgb(5, 6, 45);
  padding: 16px 24px;
  border-radius: 6px;
  width: 100%;
  height: 100%;
  transition: 300ms;
  &:hover {
    background: none;
  }
`;
