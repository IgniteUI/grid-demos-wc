export interface MaintenanceHistory {
    vehicleId: string;
    maintenance: Maintenance[]
}

export interface Maintenance {
    id: number;
    event: string;
    date: string;
    location: string;
    type: string;
    remarks: string
}