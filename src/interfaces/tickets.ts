export interface Ticket {
    price: number;
    carrier: string;
    segments: [Segment, Segment];
}

export interface Segment {
    origin: string;
    destination: string;
    date: string;
    stops: string[];
    duration: number;
}

export interface SearchIdApiResponse {
    searchId: string;
}

export interface TicketsApiResponse {
    tickets: Ticket[];
    stop: boolean;
}

export interface FilterOption {
    id: string;
    label: string;
    checked: boolean;
}

export type SortOption = 'cheapest' | 'fastest';