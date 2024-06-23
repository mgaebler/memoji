import { Player } from "../domain/Player";
import {
  addPlayerAction,
  cardsInit,
  removePlayerAction,
  setCardMultiplier,
} from "../features/game/gameActions";
import { useAppDispatch, useAppSelector } from "../hooks";
import { PanelBody } from "../lib/Panel/PanelBody";
import { PanelItem } from "../lib/Panel/PanelItem";
import { useEffect } from "react";

export type InputChangeEvent = React.ChangeEvent<HTMLInputElement>;

export const PlayerPanel = () => {
  const dispatch = useAppDispatch();
  const players = useAppSelector((state) => state.game.players);
  const gameState = useAppSelector((state) => state.game.gameState);
  const playersTotal = players.length;

  useEffect(() => {
    if (playersTotal === 0) {
      dispatch(addPlayerAction());
    }
  }, [playersTotal]);

  return (
    <PanelBody style={{ justifyContent: "center" }}>
      {players.map((player, index) => (
        <PlayerItem key={index} player={player} />
      ))}
      {playersTotal <= 4 && gameState === "idle" && (
        <PanelItem>
          <PlayerAddButton />
        </PanelItem>
      )}
    </PanelBody>
  );
};

const PlayerAddButton = () => {
  const dispatch = useAppDispatch();
  function addPlayer() {
    dispatch(addPlayerAction());
  }
  function removePlayer() {
    dispatch(removePlayerAction());
  }

  return (
    <div>
      <button onClick={addPlayer}>Add Player</button>
      <br />
      <button onClick={removePlayer}>Remove Player</button>
    </div>
  );
};

const PlayerItem = ({ player }: { player: Player }) => {
  const active = useAppSelector(
    (state) => state.game.currentPlayerId === player.id,
  );
  // const activeStyle = { boxShadow: "2px 2px 3px #999" };
  const activeIcon = "🙋";
  return (
    <PanelItem
      style={{
        // ...(active ? activeStyle : {}),
        backgroundColor: player.color,
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
      }}
    >
      <div style={{ fontSize: "2rem" }}>{active ? activeIcon : "🙆"}</div>
      <div style={{ fontSize: "1.5rem", textShadow: "1px 0 0 white" }}>
        {player.score}
      </div>
      {/* {player.id} */}
    </PanelItem>
  );
};
