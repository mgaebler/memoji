import styled from "styled-components";
import {
  Emoticon,
  emoticonCategories,
  emoticons,
} from "../../assets/emoticons";
import { cardsInit, setThemeAction } from "../../features/game/gameActions";
import { useAppDispatch, useAppSelector } from "../../hooks";

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

export function MenuThemeSelect() {
  const dispatch = useAppDispatch();
  const currentTheme = useAppSelector((state) => state.game.currentTheme);
  const categories = emoticonCategories;

  function selectCategory(e: React.ChangeEvent<HTMLSelectElement>) {
    dispatch(setThemeAction(e.target.value as Emoticon));
    dispatch(cardsInit());
  }
  return (
    <ToolbarCell>
      <Label htmlFor="theme-select">Theme</Label>
      <ToolbarSelect
        id="theme-select"
        onChange={selectCategory}
        value={currentTheme}
      >
        {categories.map((category) => (
          <option key={category} value={category}>
            {emoticons[category][0]} {category}
          </option>
        ))}
      </ToolbarSelect>
    </ToolbarCell>
  );
}
