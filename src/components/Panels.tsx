import styled from "styled-components";
import { MenuPanel } from "./MenuPanel/MenuPanel";
import { PlayerPanel } from "./PlayerPanel";

const PanelsStyle = styled.div(() => ({
  borderBottom: "1px solid #eaecef",
  boxShadow: "0 2px 4px rgba(0, 0, 0, .1)",
}));

export const Panels = () => {
  return (
    <PanelsStyle>
      <MenuPanel />
      <PlayerPanel />
    </PanelsStyle>
  );
};
