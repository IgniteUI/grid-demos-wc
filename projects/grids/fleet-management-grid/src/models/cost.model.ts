export interface CostRecord {
    vehicleId: string;
    costPerType: {
        ytd: CostPerTypeEntry[];
        '3months': CostPerTypeEntry[];
        '6months': CostPerTypeEntry[];
        '12months': CostPerTypeEntry[];
        [key: string]: CostPerTypeEntry[];
    };
    costsPerMeterPerQuarter: {
        ytd: CostsPerMeterQuarter[];
        "'2023'": CostsPerMeterQuarter[];
        "'2022'": CostsPerMeterQuarter[];
        "'2021'": CostsPerMeterQuarter[];
        "'2020'": CostsPerMeterQuarter[];
        [key: string]: CostsPerMeterQuarter[];
    };
    fuelCostsPerMonth: FuelCostsPerMonth[];
}

export interface CostPerTypeEntry {
    value: number;
    category: string;
    summary: string;
}

export interface CostsPerMeterQuarter {
    quarter: string;
    costPerMeter: number;
}

export interface FuelCostsPerMonth {
    month: string;
    cost: number;
}