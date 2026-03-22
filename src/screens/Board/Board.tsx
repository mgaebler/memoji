import { FC, useEffect, useMemo, useRef } from "react";

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

  const revealedCards = useMemo(
    () => cards.filter((card) => card.revealed === true),
    [cards],
  );
  const allCardsAssigned =
    cards.length > 0 && cards.every((card) => Boolean(card.playerId));

  const matchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cardsRef = useRef(cards);
  cardsRef.current = cards;

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

    const currentCards = cardsRef.current;
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    let currentIndex = 0;

    function revealNextCard() {
      const cardId = currentCards[currentIndex].id;
      dispatch(cardReveal({ id: cardId }));
      currentIndex++;
      if (currentIndex < currentCards.length) {
        const t = setTimeout(revealNextCard, 100);
        timeouts.push(t);
      } else {
        const t = setTimeout(() => dispatch(cardsHide()), 1000);
        timeouts.push(t);
      }
    }
    revealNextCard();

    return () => {
      timeouts.forEach((t) => clearTimeout(t));
    };
  }, [theme, game.gameState, game.cards.length, dispatch]);

  // Match/mismatch logic with proper cleanup
  const revealedCount = revealedCards.length;
  useEffect(() => {
    if (!currentPlayerId) return;
    if (revealedCount !== 2) return;

    const revealed = cardsRef.current.filter((card) => card.revealed === true);
    if (revealed.length !== 2) return;

    // Clear any pending timeout from previous reveal
    if (matchTimeoutRef.current) {
      clearTimeout(matchTimeoutRef.current);
    }

    const isMatch = revealed[0].icon === revealed[1].icon;

    matchTimeoutRef.current = setTimeout(() => {
      if (isMatch) {
        dispatch(
          cardAssign({
            playerId: currentPlayerId,
            cardIds: [revealed[0].id, revealed[1].id],
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
  }, [revealedCount, dispatch, currentPlayerId]);

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
