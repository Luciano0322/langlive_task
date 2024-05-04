import { configureStore } from "@reduxjs/toolkit";
import drawSlice from "./slices/drawSlice";

const store = configureStore({
  reducer: {
    draw: drawSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>

export default store;