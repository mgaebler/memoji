import { cardsInit, setCardMultiplier } from "../../features/game/gameActions";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { PanelBody } from "../../lib/Panel/PanelBody";
import { PanelItem } from "../../lib/Panel/PanelItem";
import { calculateNumberOfCards } from "../../features/game/calculateNumberOfCards";
import { PlayButton } from "../PlayButton";
import { MenuThemeSelect } from "./MenuThemeSelect";

export type InputChangeEvent = React.ChangeEvent<HTMLInputElement>;

export const MenuPanel = () => {
  const dispatch = useAppDispatch();
  const game = useAppSelector((state) => state.game);
  const playerNum = game.players.length;
  const cardsNumber = game.cardMultiplier;
  const cardsTotal = calculateNumberOfCards(cardsNumber);

  function changeGameType(e: InputChangeEvent) {
    const value = e.target.valueAsNumber;
    dispatch(setCardMultiplier({ numberOfCards: value }));
    dispatch(cardsInit());
  }

  return (
    <PanelBody>
      <PanelItem>Players: {playerNum}</PanelItem>
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

      <PanelItem>Cards: {cardsTotal}</PanelItem>
      <PanelItem>
        <PlayButton />
      </PanelItem>
    </PanelBody>
  );
};
