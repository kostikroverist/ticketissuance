import type { Ticket } from "@/interfaces/tickets";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";


interface TicketState {
    searchId: string | null;
    tickets: Ticket[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    stopFetching: boolean;
}

const initialState: TicketState = {
    searchId: null,
    tickets: [],
    status: 'idle',
    error: null,
    stopFetching: false,
};


export const ticketsSlice = createSlice({
    name: 'tickets',
    initialState,
    reducers: {
        fetchSearchIdStart(state) {
            state.status = 'loading';
            state.error = null;
        },
        fetchSearchIdSuccess: (state, action: PayloadAction<string>) => {
            state.searchId = action.payload;
        },
        fetchSearchIdFailure: (state, action: PayloadAction<string>) => {
            state.status = 'failed';
            state.error = action.payload;
            state.stopFetching = true;
        },
        fetchTicketsStart: (state) => {
            state.error = null;
        },
        fetchTicketsSuccess: (state, action: PayloadAction<{ tickets: Ticket[]; stop: boolean }>) => {
            state.tickets.push(...action.payload.tickets);
            state.stopFetching = action.payload.stop;

            if (action.payload.stop) {
                state.status = 'succeeded';
            }
        },
        fetchTicketsFailure: (state, action: PayloadAction<string>) => {
            state.status = 'failed';
            state.error = action.payload;
            state.stopFetching = true;
        },
    },
});
export const {
    fetchSearchIdStart,
    fetchSearchIdSuccess,
    fetchSearchIdFailure,
    fetchTicketsStart,
    fetchTicketsSuccess,
    fetchTicketsFailure
} = ticketsSlice.actions;

export default ticketsSlice.reducer;