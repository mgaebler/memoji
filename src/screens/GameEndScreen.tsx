import styled from "styled-components";
import { useAppSelector } from "../hooks";
import { LayoutFullScreen } from "../layouts/LayoutFullScreen";
import { PlayButton } from "../components/PlayButton";

export function GameEndScreen() {
  const game = useAppSelector((state) => state.game);
  const players = game.players;
  // sort players by score descending
  let sortedPlayers = [...players].sort((a, b) => {
    return b.score - a.score;
  });
  return (
    <LayoutFullScreen>
      <div>
        <h1
          style={{
            fontSize: "5rem",
            textAlign: "center",
            marginBottom: "2rem",
          }}
        >
          🎊
        </h1>
        <div style={{ paddingBottom: "2rem" }}>
          {sortedPlayers.map((player, index) => (
            <PlayerItem
              key={player.id}
              style={{ backgroundColor: player.color }}
            >
              <div>{index + 1}</div>
              <div>{"🙋"}</div>
              <div>{player.score}</div>
            </PlayerItem>
          ))}
        </div>

        <div style={{ textAlign: "center" }}>
          <PlayButton />
        </div>
      </div>
    </LayoutFullScreen>
  );
}

const PlayerItem = styled.div(() => ({
  padding: "10px",
  minWidth: 200,
  display: "flex",
  justifyContent: "space-between",
  fontSize: "3rem",
}));
