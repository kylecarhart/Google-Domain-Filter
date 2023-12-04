import { Domain, DomainListType } from "../../../types";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { replaceInArray } from "../../../utils/array.util";
import { isValidDomain } from "../../../utils/domain.util";

export type DomainListState = {
  [key in DomainListType]: Domain[];
};

const initialState: DomainListState = {
  filterList: [],
  preferenceList: [],
};

export const domainListSlice = createSlice({
  name: "domainLists",
  initialState,
  reducers: {
    push: (
      state,
      action: PayloadAction<{ domain: Domain; type: DomainListType }>
    ) => {
      const { domain, type } = action.payload;

      // Check for domain validity and dont allow duplicates
      if (isValidDomain(state[type], domain)) {
        state[type] = [domain, ...state[type]];
      }
    },
    remove: (
      state,
      action: PayloadAction<{ domain: Domain; type: DomainListType }>
    ) => {
      const { domain, type } = action.payload;
      state[type] = state[type].filter((_domain) => _domain !== domain);
    },
    replace: (
      state,
      action: PayloadAction<{ from: Domain; to: Domain; type: DomainListType }>
    ) => {
      const { from, to, type } = action.payload;

      if (from !== to && isValidDomain(state[type], to)) {
        state[type] = replaceInArray(state[type], from, to);
      }
    },
    reorder: (
      state,
      action: PayloadAction<{
        domain: Domain;
        from: number;
        to: number;
        type: DomainListType;
      }>
    ) => {
      const { domain, from, to, type } = action.payload;
      state[type].splice(from, 1);
      state[type].splice(to, 0, domain);
    },
    set: (
      state,
      action: PayloadAction<{ domains: Domain[]; type: DomainListType }>
    ) => {
      const { domains, type } = action.payload;
      state[type] = domains;
    },
  },
});

// Action creators are generated for each case reducer function
export const { push, remove, replace, reorder, set } = domainListSlice.actions;

export const domainListReducer = domainListSlice.reducer;
