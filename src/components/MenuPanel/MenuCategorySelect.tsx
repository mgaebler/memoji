import { Emoticon, emoticonCategories } from "../../assets/emoticons";
import { setThemeAction } from "../../features/game/gameActions";
import { useAppDispatch, useAppSelector } from "../../hooks";

export function MenuCategorySelect() {
  const dispatch = useAppDispatch();
  const currentTheme = useAppSelector((state) => state.game.currentTheme);
  const categories = emoticonCategories;
  function selectCategory(e: React.ChangeEvent<HTMLSelectElement>) {
    dispatch(setThemeAction(e.target.value as Emoticon));
  }
  return (
    <select onChange={selectCategory} value={currentTheme}>
      {categories.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </select>
  );
}
