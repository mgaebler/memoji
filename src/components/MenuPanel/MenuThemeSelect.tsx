import {
  Emoticon,
  emoticonCategories,
  emoticons,
} from "../../assets/emoticons";
import { cardsInit, setThemeAction } from "../../features/game/gameActions";
import { useAppDispatch, useAppSelector } from "../../hooks";

export function MenuThemeSelect() {
  const dispatch = useAppDispatch();
  const currentTheme = useAppSelector((state) => state.game.currentTheme);
  const categories = emoticonCategories;

  function selectCategory(e: React.ChangeEvent<HTMLSelectElement>) {
    dispatch(setThemeAction(e.target.value as Emoticon));
    // update the cards to the new theme
    dispatch(cardsInit());
  }
  return (
    <>
      <label htmlFor="theme-select">
        Select Theme:
      </label>
      {' '}
      <select id="theme-select" onChange={selectCategory} value={currentTheme}>
        {categories.map((category) => (
          <option key={category} value={category}>
            {emoticons[category][0]} {category}
          </option>
        ))}
      </select>
    </>
  );
}
