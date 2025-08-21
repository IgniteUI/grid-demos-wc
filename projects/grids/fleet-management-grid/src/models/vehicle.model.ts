export interface Vehicle {
    vehicleId: string;
    licensePlate: string;
    make: string;
    model: string;
    type: string;
    vin: string;
    status: string;
    locationCity: string;
    locationGps: string;
    details: VehicleDetails
}

export interface VehicleDetails {
    generation: string;
    yearOfManufacture: number;
    fuelType: string;
    doors: number;
    seats: number;
    transmission: string;
    engine: string;
    power: string;
    mileage: string;
    cubature: string;
    color: string;
    msrp: string;
    tollPassId: string
}

export interface OverlayVehicle {
    vehiclePhoto: string;
    make: string;
    model: string;
    mileage: string;
    markerLocations: MarkerPoint[];
}

export interface MarkerPoint {
    latitude: number;
    longitude: number;
}