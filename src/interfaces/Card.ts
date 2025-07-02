export interface FlightOption {
    price: number;
    airline: string;
    segments: Segment[];
}

export interface Segment {
    from: string;
    to: string;
    departure: string;
    arrival: string;
    duration: string;
    transfers: string[];
}
