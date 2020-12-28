import { FC, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "../domain/Card";
import { cardReveal, cardsHide, cardsInit } from "../features/game/reducer";
import { RootState } from "../store";
import styled from "styled-components";

type ICardContainer = {
  items: number;
};

const CardContainer = styled.div<ICardContainer>(({ items }) => ({
  display: "grid",
  flexWrap: "wrap",
  gridTemplateColumns: `${100 / items}vh `.repeat(items),
  gridTemplateRows: `${100 / items}vh `.repeat(items),
  // margin: "50px 10vw",
}));

const CardTile = styled.div({
  padding: "12px",
  margin: "8px",
  border: "thin solid black",
  // width: "10vh",
  // height: "10vh",
  fontSize: "5rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const Board: FC = () => {
  const dispatch = useDispatch();
  const cards = useSelector<RootState, Card[]>((state) => state.game.cards);
  const items = 4;
  useEffect(() => {
    dispatch(cardsInit());
  }, []);

  return (
    <div>
      <button onClick={() => dispatch(cardsHide())}>Hide</button>
      <CardContainer items={items}>
        {cards.map((card) => {
          return (
            <CardTile
              key={card.id}
              onClick={() => dispatch(cardReveal({ id: card.id }))}
            >
              {card.revealed ? card.icon : "foo"}
            </CardTile>
          );
        })}
      </CardContainer>
    </div>
  );
};

export default Board;
