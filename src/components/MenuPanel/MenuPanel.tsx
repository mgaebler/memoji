import styled from "styled-components";
import { cardsInit, setCardMultiplier } from "../../features/game/gameActions";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { MenuThemeSelect } from "./MenuThemeSelect";

const gridSizes = [2, 4, 6, 8, 10];

const ToolbarCell = styled.div({
  display: "flex",
  flexDirection: "column",
  padding: "8px 16px",
});

const Label = styled.label({
  fontSize: "0.6rem",
  textTransform: "uppercase",
  color: "#999",
  letterSpacing: "1px",
  marginBottom: 3,
});

const ToolbarSelect = styled.select({
  appearance: "none",
  background: "transparent",
  border: "none",
  fontSize: 14,
  color: "#333",
  cursor: "pointer",
  outline: "none",
  paddingRight: 16,
  backgroundImage:
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23bbb' stroke-width='1.5' fill='none'/%3E%3C/svg%3E\")",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right 0 center",
});

const Divider = styled.div({
  width: 1,
  background: "#e8e8e8",
  margin: "4px 0",
});

export const MenuPanel = () => {
  const dispatch = useAppDispatch();
  const game = useAppSelector((state) => state.game);
  const cardsNumber = game.cardMultiplier;

  function changeGridSize(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = Number(e.target.value);
    dispatch(setCardMultiplier({ numberOfCards: value }));
    dispatch(cardsInit());
  }

  return (
    <>
      <MenuThemeSelect />
      <Divider />
      <ToolbarCell>
        <Label htmlFor="grid-size-select">Schwierigkeit</Label>
        <ToolbarSelect
          id="grid-size-select"
          value={cardsNumber}
          onChange={changeGridSize}
        >
          {gridSizes.map((size) => (
            <option key={size} value={size}>
              {size}×{size}
            </option>
          ))}
        </ToolbarSelect>
      </ToolbarCell>
    </>
  );
};
