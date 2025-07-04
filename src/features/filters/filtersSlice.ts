// src/features/filters/filtersSlice.ts
// Твої початкові фільтри

import type { FilterOption } from "@/interfaces/Filters";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { checkboxFilters } from "../../../constantsVariable";

interface FiltersState {
  options: FilterOption[];
}

const initialState: FiltersState = {
  options: checkboxFilters, 
};

export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<FilterOption[]>) => {
      state.options = action.payload;
    },
    toggleFilter: (state, action: PayloadAction<string>) => {
      const idToToggle = action.payload;
      const allFilter = state.options.find(f => f.id === 'all');
      const noTransferFilter = state.options.find(f => f.id === 'no-transfer');

      if (idToToggle === 'all') {
        state.options = state.options.map(filter =>
          filter.id === 'all' ? { ...filter, checked: true } : { ...filter, checked: false }
        );
      } else if (idToToggle === 'no-transfer') {
        const currentNoTransferChecked = noTransferFilter?.checked;
        state.options = state.options.map(filter => {
          if (filter.id === 'no-transfer') {
            return { ...filter, checked: !currentNoTransferChecked };
          }
          return { ...filter, checked: false }; 
        });
      }
      else {
        const clickedFilter = state.options.find(f => f.id === idToToggle);
        if (clickedFilter) {
          clickedFilter.checked = !clickedFilter.checked; 

          if (allFilter && allFilter.checked) {
            allFilter.checked = false;
          }
          if (noTransferFilter && noTransferFilter.checked) {
            noTransferFilter.checked = false;
          }

          const allSpecificFiltersUnchecked = state.options
            .filter(f => f.id !== 'all' && f.id !== 'no-transfer')
            .every(f => !f.checked);

          if (allSpecificFiltersUnchecked) {
            if (allFilter) allFilter.checked = true;
          }
        }
      }
    },
  },
});

export const { setFilters, toggleFilter } = filtersSlice.actions;
export default filtersSlice.reducer;