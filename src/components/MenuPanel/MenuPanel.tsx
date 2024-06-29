import { cardsInit, setCardMultiplier } from "../../features/game/gameActions";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { PanelBody } from "../../lib/Panel/PanelBody";
import { PanelItem } from "../../lib/Panel/PanelItem";
import { MenuThemeSelect } from "./MenuThemeSelect";

export type InputChangeEvent = React.ChangeEvent<HTMLInputElement>;

export const MenuPanel = () => {
  const dispatch = useAppDispatch();
  const game = useAppSelector((state) => state.game);
  const cardsNumber = game.cardMultiplier;

  function changeGameType(e: InputChangeEvent) {
    const value = e.target.valueAsNumber;
    dispatch(setCardMultiplier({ numberOfCards: value }));
    dispatch(cardsInit());
  }

  return (
    <PanelBody>
      <PanelItem>
        <MenuThemeSelect />
      </PanelItem>
      <PanelItem>
        GameType:{" "}
        <input
          type="number"
          value={cardsNumber}
          min={2}
          max={10}
          step={2}
          onChange={changeGameType}
        />
      </PanelItem>

      {/* <PanelItem>Cards: {cardsTotal}</PanelItem> */}
    </PanelBody>
  );
};
