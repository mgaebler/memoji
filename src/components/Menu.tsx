import { cardsInit, setCardMultiplier } from "../features/game/gameActions";
import { useAppDispatch, useAppSelector } from "../hooks";
import { PanelBody } from "../lib/Panel/PanelBody";
import { PanelItem } from "../lib/Panel/PanelItem";
import { calculateNumberOfCards } from "../features/game/calculateNumberOfCards";

export type InputChangeEvent = React.ChangeEvent<HTMLInputElement>;

export const Menu = () => {
  const dispatch = useAppDispatch();
  const game = useAppSelector((state) => state.game);
  const playerNum = game.players.length;
  const cardsNumber = game.cardMultiplier;
  const cardsTotal = calculateNumberOfCards(cardsNumber);

  function initGame() {
    dispatch(cardsInit());
  }

  function changeGameType(e: InputChangeEvent) {
    const value = e.target.valueAsNumber;
    console.log(value);
    dispatch(setCardMultiplier({ numberOfCards: value }));
    dispatch(cardsInit());
  }

  return (
    <PanelBody>
      <PanelItem>Spieler: {playerNum}</PanelItem>
      <PanelItem>
        GameType:{" "}
        <input
          type="number"
          value={cardsNumber}
          min={2}
          max={10}
          onChange={changeGameType}
        />
      </PanelItem>
      <PanelItem>Cards: {cardsTotal}</PanelItem>
      <PanelItem>
        <button onClick={initGame}>Start</button>
      </PanelItem>
    </PanelBody>
  );
};
