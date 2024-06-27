import { useEffect } from "react";
import {
  addPlayerAction,
  removePlayerAction,
} from "../features/game/gameActions";
import { useAppDispatch, useAppSelector } from "../hooks";

export const PlayerAddButton = () => {
  const dispatch = useAppDispatch();
  const players = useAppSelector((state) => state.game.players);
  const playersTotal = players.length;
  function addPlayer() {
    dispatch(addPlayerAction());
  }
  function removePlayer() {
    dispatch(removePlayerAction());
  }
  useEffect(() => {
    if (playersTotal === 0) {
      dispatch(addPlayerAction());
    }
  }, [playersTotal, dispatch]);

  return (
    <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center" }}>
      <button
        style={{ width: "4rem", height: "3.8rem", fontSize: "2rem" }}
        onClick={removePlayer}
      >
        {" "}
        -{" "}
      </button>
      <button
        style={{ width: "4rem", height: "3.8rem", fontSize: "2rem" }}
        onClick={addPlayer}
      >
        {" "}
        +{" "}
      </button>
      <br />
    </div>
  );
};
