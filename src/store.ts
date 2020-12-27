import { configureStore } from "@reduxjs/toolkit";

import { gameReducer as game } from "./features/game/reducer";

export default configureStore({ reducer: { game } });
