import { FC, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "../domain/Card";
import { cardReveal, cardsHide, cardsInit } from "../features/game/reducer";
import { RootState } from "../store";
import styled from "styled-components";

const CardContainer = styled.div({
  display: "grid",
  flexWrap: "wrap",
  gridTemplateColumns: "20vw 20vw 20vw 20vw",
  margin: "50px 10vw",
});

const CardTile = styled.div({
  padding: "12px",
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

  useEffect(() => {
    dispatch(cardsInit());
  }, []);

  return (
    <div>
      <button onClick={() => dispatch(cardsHide())}>Hide</button>
      <CardContainer>
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
