import type { RootState } from '@/app/store';
import type { FilterOption, SortOption, Ticket } from '@/interfaces/tickets';
import { createSelector } from '@reduxjs/toolkit';


const selectTickets = (state: RootState) => state.tickets.tickets;
const selectCurrentSort = (state: RootState) => state.sort.currentSort;
const selectFiltersOptions = (state: RootState) => state.filters.options;

const selectActiveTransferFilters = createSelector(
  selectFiltersOptions,
  (filters: FilterOption[]) => {
    const activeIds = filters.filter(f => f.checked).map(f => f.id);

    if (activeIds.includes('all')) {
      return null; 
    }

    const transferCounts: number[] = [];
    if (activeIds.includes('no-transfer')) {
      transferCounts.push(0);
    }
    if (activeIds.includes('one-transfer')) {
      transferCounts.push(1);
    }
    if (activeIds.includes('two-transfers')) {
      transferCounts.push(2);
    }
    if (activeIds.includes('three-transfers')) {
      transferCounts.push(3);
    }

    return transferCounts;
  }
);


export const selectFilteredAndSortedTickets = createSelector(
  [selectTickets, selectCurrentSort, selectActiveTransferFilters],
  (tickets: Ticket[], currentSort: SortOption, activeTransferCounts: number[] | null) => {
    let filteredTickets = [...tickets]; 

    if (activeTransferCounts !== null && activeTransferCounts.length > 0) {
      filteredTickets = filteredTickets.filter(ticket => {
        return ticket.segments.some(segment => activeTransferCounts.includes(segment.stops.length));
      });
    }

    if (currentSort === 'cheapest') {
      filteredTickets.sort((a, b) => a.price - b.price);
    } else if (currentSort === 'fastest') {
      filteredTickets.sort((a, b) => {
        const durationA = a.segments.reduce((sum, segment) => sum + segment.duration, 0);
        const durationB = b.segments.reduce((sum, segment) => sum + segment.duration, 0);
        return durationA - durationB;
      });
    }

    return filteredTickets;
  }
);