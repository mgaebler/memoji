import styled from "styled-components";
import { MenuPanel } from "./MenuPanel/MenuPanel";
import { PlayerPanel } from "./PlayerPanel";
import { useAppSelector } from "../hooks";
import { PlayButton } from "./PlayButton";
import Logo from "./Logo";

const PanelsStyle = styled.div(() => ({
  borderBottom: "1px solid #eaecef",
  boxShadow: "0 2px 4px rgba(0, 0, 0, .1)",
}));

const Toolbar = styled.div({
  display: "flex",
  justifyContent: "center",
  padding: "0.75rem 1rem",
});

const ToolbarInner = styled.div({
  display: "inline-flex",
  alignItems: "stretch",
  background: "white",
  borderRadius: 14,
  padding: 6,
  gap: 4,
  boxShadow: "0 1px 4px rgba(0, 0, 0, 0.08)",
});

const Divider = styled.div({
  width: 1,
  background: "#e8e8e8",
  margin: "4px 0",
});

export const Panels = () => {
  const gameState = useAppSelector((state) => state.game.gameState);
  return (
    <PanelsStyle>
      {gameState === "idle" && (
        <>
          <div style={{ textAlign: 'center', fontSize: '3rem' }}>
            <Logo />
            <div style={{ fontSize: '0.75rem', color: '#999', marginTop: -4 }}>
              <a href="https://mgaebler.me" target="_blank" rel="noopener noreferrer" style={{ color: '#999', textDecoration: 'none' }}>
                mgaebler.me
              </a>
            </div>
          </div>
          <Toolbar>
            <ToolbarInner>
              <MenuPanel />
              <Divider />
              <PlayButton />
            </ToolbarInner>
          </Toolbar>
        </>
      )}

      {gameState === "playing" && (
        <>
          <PlayerPanel />
        </>
      )}
    </PanelsStyle>
  );
};
