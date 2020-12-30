import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "../domain/Card";
import { cardReveal, cardsHide, cardsInit } from "../features/game";
import { RootState } from "../store";
import styled from "styled-components";
import IconDiamond from "./assets/diamond.svg";

type ICardGrid = {
  items: number;
};

const CardGrid = styled.div<ICardGrid>(({ items }) => ({
  display: "grid",
  // alignItems: "center",
  justifyContent: "center",
  gridTemplateColumns: `${100 / items}vh `.repeat(items),
  gridTemplateRows: `${100 / items}vh `.repeat(items),
}));

const GridTile = styled.div({
  // outline: "thin dashed red",
  padding: "12px",
  perspective: "600px",
});

type ICardContainer = {
  flipped: boolean;
};

const CardContainer = styled.div<ICardContainer>((props) => ({
  fontSize: "6rem",
  cursor: "pointer",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  width: "100%",

  position: "relative",
  transition: "transform 600ms",
  transformStyle: "preserve-3d",
  transform: props.flipped ? "rotateY(180deg)" : "rotateY(0deg)",
}));

const CardBase = styled.div({
  height: "100%",
  width: "100%",
  position: "absolute",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  border: "thin solid #ffffff60",
  backfaceVisibility: "hidden",
  borderRadius: 16,
  boxShadow: "1px 1px 5px",
});

const CardFront = styled(CardBase)({
  backgroundColor: "#f5f5f5",
  transform: "rotateY(180deg)",
});

const CardBack = styled(CardBase)({
  backgroundColor: "#bbdefb",
  backgroundImage: `url(${IconDiamond})`,
  backgroundRepeat: "repeat",
  backgroundSize: 16,
});

const Board: FC = () => {
  const dispatch = useDispatch();
  const cards = useSelector<RootState, Card[]>((state) => state.game.cards);
  const items = 4;
  useEffect(() => {
    dispatch(cardsInit());
  }, [dispatch]);

  const revealedCards = cards.filter((card) => card.revealed === true);
  console.log(revealedCards);

  useEffect(() => {
    // if revealed Cards = 2,
    if (revealedCards.length === 2) {
      if (revealedCards[0].icon === revealedCards[1].icon) {
        // if icons are the same, assign user id to card
        console.log("awesome");
      } else {
        // if icons are not the same, hide all cards -- dispatch(cardsHide)
        console.log("not so lucky");
        setTimeout(() => dispatch(cardsHide()), 1500);
      }
    }
  }, [revealedCards, dispatch]);

  const handleReveal = (cardId: string) => {
    dispatch(cardReveal({ id: cardId }));
  };

  return (
    <div>
      {/* <button onClick={() => dispatch(cardsHide())}>Hide</button> */}
      <CardGrid items={items}>
        {cards.map((card) => {
          return (
            <GridTile key={card.id}>
              <CardContainer
                flipped={card.revealed}
                onClick={() => {
                  // prevent click if two cards are already revealed
                  if (revealedCards.length < 2) handleReveal(card.id);
                }}
              >
                <CardFront>{card.icon}</CardFront>
                <CardBack></CardBack>
              </CardContainer>
            </GridTile>
          );
        })}
      </CardGrid>
    </div>
  );
};

export default Board;
