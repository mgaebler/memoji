import styled from "styled-components";
import { PlayButton } from "../components/PlayButton";
import { PlayerAddButton } from "../components/PlayerAddButton";
import { PlayerPanel } from "../components/PlayerPanel";
import { LayoutFullScreen } from "../layouts/LayoutFullScreen";

export function PlayerSelectScreen() {
  return (
    <LayoutFullScreen>
      <div style={{ display: "flex", flexDirection: "column", alignContent: "center" }}>
        <Spacer>
          <h1 style={{ fontSize: "4rem" }}>Player Select</h1>
        </Spacer>

        <Spacer>
          <PlayerPanel />
        </Spacer>

        <Spacer>
          <PlayerAddButton />
        </Spacer>

        <PlayButton />
      </div>
    </LayoutFullScreen>
  );
}

const Spacer = styled.div`
  margin-bottom: 2rem;
`;

