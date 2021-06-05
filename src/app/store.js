import { configureStore } from "@reduxjs/toolkit";
import spacexReducer from "../slices/spaceXdataSlice";

export const store = configureStore({
  reducer: {
    basket: spacexReducer,
  },
});
