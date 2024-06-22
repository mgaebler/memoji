import { configureStore } from "@reduxjs/toolkit";

import game from "./features/game/gameReducer";

const store = configureStore({ reducer: { game } });

export type RootState = ReturnType<typeof store.getState>;

export default store;
