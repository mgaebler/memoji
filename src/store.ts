import { configureStore } from "@reduxjs/toolkit";

import { gameReducer as game } from "./features/game/reducer";

const store = configureStore({ reducer: { game } });

export type RootState = ReturnType<typeof store.getState>;

export default store;
