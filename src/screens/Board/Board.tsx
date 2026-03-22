import { FC, useEffect, useRef } from "react";

import {
  cardReveal,
  cardsHide,
  cardsInit,
  cardAssign,
  nextPlayerAction,
  setGameStateAction,
} from "../../features/game/gameActions";

import { CardGrid, GridTile } from "./CardGrid";
import { CardContainer, CardFront, CardBack, CardImage } from "./Card";
import { useAppDispatch, useAppSelector } from "../../hooks";

const DEFAULT_TIMEOUT = 1200;

const Board: FC = () => {
  const dispatch = useAppDispatch();

  const game = useAppSelector((state) => state.game);
  const theme = game.currentTheme;
  const cards = game.cards;
  const currentPlayerId = game.currentPlayerId;
  const verticalItemsNum = Math.sqrt(cards.length);

  const revealedCards = cards.filter((card) => card.revealed === true);
  const allCardsAssigned =
    cards.length > 0 && cards.every((card) => Boolean(card.playerId));

  const matchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Initialize cards on mount
  useEffect(() => {
    dispatch(cardsInit());
  }, [dispatch]);

  // Check win condition
  useEffect(() => {
    if (allCardsAssigned) {
      dispatch(setGameStateAction("finished"));
    }
  }, [allCardsAssigned, dispatch]);

  // Theme demo — reveal cards sequentially when idle
  useEffect(() => {
    if (game.gameState !== "idle") return;
    if (game.cards.length < 1) return;

    const timeouts: ReturnType<typeof setTimeout>[] = [];
    let currentIndex = 0;

    function revealCard() {
      const cardId = cards[currentIndex].id;
      dispatch(cardReveal({ id: cardId }));
      currentIndex++;
      if (currentIndex < cards.length) {
        const t = setTimeout(revealCard, 100);
        timeouts.push(t);
      } else {
        const t = setTimeout(() => dispatch(cardsHide()), 1000);
        timeouts.push(t);
      }
    }
    revealCard();

    return () => {
      timeouts.forEach((t) => clearTimeout(t));
    };
  }, [theme, game.gameState, game.cards.length, cards, dispatch]);

  // Match/mismatch logic with proper cleanup
  useEffect(() => {
    if (!currentPlayerId) return;
    if (revealedCards.length !== 2) return;

    // Clear any pending timeout from previous reveal
    if (matchTimeoutRef.current) {
      clearTimeout(matchTimeoutRef.current);
    }

    const isMatch = revealedCards[0].icon === revealedCards[1].icon;

    matchTimeoutRef.current = setTimeout(() => {
      if (isMatch) {
        dispatch(
          cardAssign({
            playerId: currentPlayerId,
            cardIds: [revealedCards[0].id, revealedCards[1].id],
          }),
        );
      } else {
        dispatch(cardsHide());
        dispatch(nextPlayerAction());
      }
      matchTimeoutRef.current = null;
    }, DEFAULT_TIMEOUT);

    return () => {
      if (matchTimeoutRef.current) {
        clearTimeout(matchTimeoutRef.current);
        matchTimeoutRef.current = null;
      }
    };
  }, [revealedCards, dispatch, currentPlayerId]);

  const handleReveal = (cardId: string) => {
    dispatch(cardReveal({ id: cardId }));
  };

  return (
    <CardGrid $items={verticalItemsNum}>
      {cards.map((card) => {
        return (
          <GridTile key={card.id}>
            <CardContainer
              $flipped={card.revealed || Boolean(card.playerId)}
              onClick={() => {
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
