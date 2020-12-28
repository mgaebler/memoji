import { FC } from "react";
import { useDispatch } from "react-redux";
import { cardReveal, cardsHide } from "../features/game/reducer";

const Board: FC = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <button onClick={() => dispatch(cardReveal({ id: "asdlfasdkfja" }))}>
        cardReveal
      </button>
      <button onClick={() => dispatch(cardsHide())}>Hide</button>
    </div>
  );
};

export default Board;
