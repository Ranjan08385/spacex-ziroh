import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  spaceXdata: [],
};

export const spaceXdataSlice = createSlice({
  name: "spacex",
  initialState,
  reducers: {
    allSpacexData: (state, action) => {
      state.spaceXdata = [...state.spaceXdata, action.payload];
    },
  },
});

export const { allSpacexData } = spaceXdataSlice.actions;

export const selectItems = (state) => state.basket.spaceXdata;

export default spaceXdataSlice.reducer;
