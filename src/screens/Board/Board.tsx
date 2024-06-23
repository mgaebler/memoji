import { FC, useEffect } from "react";

import {
  cardReveal,
  cardsHide,
  cardsInit,
  cardAssign,
} from "../../features/game/gameActions";

import { CardGrid, GridTile } from "./CardGrid";
import { CardContainer, CardFront, CardBack, CardImage } from "./Card";
import { useAppDispatch, useAppSelector } from "../../hooks";

const DEFAULT_TIMEOUT = 1200;

const Board: FC = () => {
  const dispatch = useAppDispatch();

  const cards = useAppSelector((state) => state.game.cards);
  const players = useAppSelector((state) => state.game.players);
  const verticalItemsNum = Math.sqrt(cards.length);
  const player1 = players[0];
  useEffect(() => {
    dispatch(cardsInit());
  }, [dispatch]);

  const revealedCards = cards.filter((card) => card.revealed === true);
  const assignedCards = cards.filter((card) => card.playerId);

  useEffect(() => {
    // if revealed Cards = 2,
    if (revealedCards.length === 2) {
      if (revealedCards[0].icon === revealedCards[1].icon) {
        // if icons are the same, assign user id to card
        // this means the cards are out of game
        setTimeout(
          () =>
            dispatch(
              cardAssign({
                playerId: player1.id,
                cardIds: [revealedCards[0].id, revealedCards[1].id],
              }),
            ),
          DEFAULT_TIMEOUT,
        );
      } else {
        // if icons are not the same, hide all cards -- dispatch(cardsHide)
        setTimeout(() => dispatch(cardsHide()), DEFAULT_TIMEOUT);
      }
    }
  }, [revealedCards, dispatch, player1]);

  const handleReveal = (cardId: string) => {
    dispatch(cardReveal({ id: cardId }));
  };

  return (
    <CardGrid items={verticalItemsNum}>
      {cards.map((card) => {
        return (
          <GridTile key={card.id}>
            <CardContainer
              flipped={card.revealed || Boolean(card.playerId)}
              onClick={() => {
                // prevent click if two cards are already revealed
                if (revealedCards.length < 2) handleReveal(card.id);
              }}
            >
              <CardFront>
                <CardImage>{card.icon}</CardImage>
              </CardFront>
              <CardBack />
            </CardContainer>
          </GridTile>
        );
      })}
    </CardGrid>
  );
};

export default Board;
