export interface UtilizationRecord {
    vehicleId: string;
    utilization: UtilizationDataPoint[];
}

export interface UtilizationDataPoint {
    month: string;
    "'2023'": number;
    "'2024'": number;
}