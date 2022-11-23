import { AppOptions } from "@common/types";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

const initialState: AppOptions = {
  filterListEnabled: true,
  preferenceListEnabled: true,
  filterMode: "default",
};

export const optionsSlice = createSlice({
  name: "options",
  initialState,
  reducers: {
    setOptions: (state, action: PayloadAction<Partial<AppOptions>>) => {
      return { ...state, ...action.payload };
    },
  },
});

// Action creators are generated for each case reducer function
export const { setOptions } = optionsSlice.actions;

export const optionsReducer = optionsSlice.reducer;
