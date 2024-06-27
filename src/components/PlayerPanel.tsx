import { Player } from "../domain/Player";

import { useAppSelector } from "../hooks";
import { PanelBody } from "../lib/Panel/PanelBody";
import { PanelItem } from "../lib/Panel/PanelItem";

export type InputChangeEvent = React.ChangeEvent<HTMLInputElement>;

export const PlayerPanel = () => {
  const players = useAppSelector((state) => state.game.players);

  return (
    <PanelBody style={{ justifyContent: "center" }}>
      {players.map((player, index) => (
        <PlayerItem key={index} player={player} />
      ))}
    </PanelBody>
  );
};

const PlayerItem = ({ player }: { player: Player }) => {
  const active = useAppSelector(
    (state) => state.game.currentPlayerId === player.id,
  );

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
