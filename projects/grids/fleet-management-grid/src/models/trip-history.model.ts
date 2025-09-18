export interface TripHistory {
    vehicleId: string;
    tripHistory: Trip[]
}

export interface Trip {
    id: number;
    driverName: string;
    start: string;
    end: string;
    startLocation: string;
    endLocation: string;
    startMeter: string;
    endMeter: string;
    distance: string;
    totalTime: string
}