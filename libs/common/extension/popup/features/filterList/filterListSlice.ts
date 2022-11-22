import { Domain } from "@common/types";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { replaceInArray } from "@utils/array.util";
import { isValidDomain } from "@utils/domain.util";

export interface FilterListState {
  domains: Domain[];
}

const initialState: FilterListState = {
  domains: [],
};

export const filterListSlice = createSlice({
  name: "filterList",
  initialState,
  reducers: {
    push: (state, action: PayloadAction<Domain>) => {
      const domain = action.payload;

      // Check for domain validity and dont allow duplicates
      if (isValidDomain(state.domains, domain)) {
        state.domains = [action.payload, ...state.domains];
      }
    },
    remove: (state, action: PayloadAction<Domain>) => {
      state.domains = state.domains.filter(
        (_domain) => _domain !== action.payload
      );
    },
    replace: (state, action: PayloadAction<{ from: Domain; to: Domain }>) => {
      const { from, to } = action.payload;

      if (from !== to && isValidDomain(state.domains, to)) {
        state.domains = replaceInArray(state.domains, from, to);
      }
    },
    reorder: (
      state,
      action: PayloadAction<{ domain: Domain; from: number; to: number }>
    ) => {
      const { domain, from, to } = action.payload;
      state.domains.splice(from, 1);
      state.domains.splice(to, 0, domain);
    },
  },
});

// Action creators are generated for each case reducer function
export const { push, remove, replace, reorder } = filterListSlice.actions;

export const filterListReducer = filterListSlice.reducer;
