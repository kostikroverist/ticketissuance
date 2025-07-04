// src/features/sort/sortSlice.ts

import type { SortOption } from "@/interfaces/tickets";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface SortState {
  currentSort: SortOption;
}

const initialState: SortState = {
  currentSort: 'cheapest', 
};

export const sortSlice = createSlice({
  name: 'sort',
  initialState,
  reducers: {
    setSortOption: (state, action: PayloadAction<SortOption>) => {
      state.currentSort = action.payload;
    },
  },
});

export const { setSortOption } = sortSlice.actions;
export default sortSlice.reducer;