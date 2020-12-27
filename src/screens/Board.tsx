import { FC } from "react";
import { useDispatch } from "react-redux";
import { cardReveal } from "../features/game/reducer";

const Board: FC = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <button onClick={() => dispatch(cardReveal({ id: "asdlfasdkfja" }))}>
        Click
      </button>
    </div>
  );
};

export default Board;
