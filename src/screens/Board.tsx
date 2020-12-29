import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "../domain/Card";
import { cardReveal, cardsHide, cardsInit } from "../features/game/reducer";
import { RootState } from "../store";
import styled from "styled-components";

type ICardGrid = {
  items: number;
};

const CardGrid = styled.div<ICardGrid>(({ items }) => ({
  display: "grid",
  gridTemplateColumns: `${100 / items}vh `.repeat(items),
  gridTemplateRows: `${100 / items}vh `.repeat(items),
}));

const GridTile = styled.div({
  // outline: "thin dashed red",
  padding: "12px",
});

const CardContainer = styled.div({
  fontSize: "6rem",
  cursor: "pointer",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  width: "100%",
});

const CardFront = styled(CardContainer)({
  border: "thin solid gray",
  borderRadius: 4,
});
const CardBack = styled(CardContainer)({
  border: "thin solid gray",
  borderRadius: 4,
});

const Board: FC = () => {
  const dispatch = useDispatch();
  const cards = useSelector<RootState, Card[]>((state) => state.game.cards);
  const items = 4;
  useEffect(() => {
    dispatch(cardsInit());
  }, [dispatch]);

  return (
    <div>
      <button onClick={() => dispatch(cardsHide())}>Hide</button>
      <CardGrid items={items}>
        {cards.map((card) => {
          return (
            <GridTile key={card.id}>
              <CardContainer
                onClick={() => dispatch(cardReveal({ id: card.id }))}
              >
                {card.revealed ? (
                  <CardFront>{card.icon}</CardFront>
                ) : (
                  <CardBack>foo</CardBack>
                )}
              </CardContainer>
            </GridTile>
          );
        })}
      </CardGrid>
    </div>
  );
};

export default Board;
