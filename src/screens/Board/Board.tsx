import { FC, useEffect } from "react";

import {
  cardReveal,
  cardsHide,
  cardsInit,
  cardAssign,
  nextPlayerAction,
} from "../../features/game/gameActions";

import { CardGrid, GridTile } from "./CardGrid";
import { CardContainer, CardFront, CardBack, CardImage } from "./Card";
import { useAppDispatch, useAppSelector } from "../../hooks";

const DEFAULT_TIMEOUT = 1200;

const Board: FC = () => {
  const dispatch = useAppDispatch();

  const game = useAppSelector((state) => state.game);
  const cards = game.cards;
  const currentPlayerId = game.currentPlayerId;
  const verticalItemsNum = Math.sqrt(cards.length);

  useEffect(() => {
    // initialize but only to show the amount
    // dispatch(cardsInit());
  }, []);

  const revealedCards = cards.filter((card) => card.revealed === true);

  useEffect(() => {
    if (!currentPlayerId) return;
    if (revealedCards.length === 2) {
      // successful revealed
      if (revealedCards[0].icon === revealedCards[1].icon) {
        // if icons are the same, assign user id to card
        // this means the cards are out of game
        setTimeout(() => {
          dispatch(
            cardAssign({
              playerId: currentPlayerId,
              cardIds: [revealedCards[0].id, revealedCards[1].id],
            }),
          );
        }, DEFAULT_TIMEOUT);
      } else {
        // if icons are not the same, hide all cards -- dispatch(cardsHide)
        setTimeout(() => {
          dispatch(cardsHide());
          // next player
          dispatch(nextPlayerAction());
        }, DEFAULT_TIMEOUT);
      }
    }
  }, [revealedCards, dispatch, currentPlayerId]);

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
