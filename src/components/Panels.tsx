import styled from "styled-components";
import { MenuPanel } from "./MenuPanel/MenuPanel";
import { PlayerPanel } from "./PlayerPanel";
import { useAppSelector } from "../hooks";
import { PlayButton } from "./PlayButton";
import { PanelBody } from "../lib/Panel/PanelBody";
import { PanelItem } from "../lib/Panel/PanelItem";
import Logo from "./Logo";

const PanelsStyle = styled.div(() => ({
  borderBottom: "1px solid #eaecef",
  boxShadow: "0 2px 4px rgba(0, 0, 0, .1)",
}));

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
          <MenuPanel />
          <PanelBody>
            <PanelItem>
              <PlayButton />
            </PanelItem>
          </PanelBody>
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
