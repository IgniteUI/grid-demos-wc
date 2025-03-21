import VEHICLES_DATA from '../assets/data/vehicles.json'
import DRIVERS_DATA from '../assets/data/drivers.json';
import TRIP_HISTORY_DATA from '../assets/data/trip_history.json';
import MAINTENANCE_DATA from '../assets/data/maintenance.json';
import COST_DATA from '../assets/data/cost.json';
import UTILIZATION_DATA from '../assets/data/utilization.json';

export class DataService {
    private static instance: DataService;
    private vehiclesData: any[] = VEHICLES_DATA;
    private driversData: any[] = DRIVERS_DATA;
    private tripHistoryData: any[] = TRIP_HISTORY_DATA;
    private maintenanceData: any[] = MAINTENANCE_DATA;
    private costData: any[] = COST_DATA;
    private utilizationData: any[] = UTILIZATION_DATA;
    private fuelCostsCache: { [key: string]: any[] } = {};

    constructor() {
      this.utilizationData.forEach(vehicle => {
        vehicle.utilization.__dataIntents = {
          "'2023'": ["SeriesTitle/2023"],
          "'2024'": ["SeriesTitle/2024"]
        };
      });
    }

    getVehiclesData() {
        return this.vehiclesData;
    }
    
    getDriverData(driverName: string) {
        return this.driversData.find(data => data.name === driverName);
    }
    
    getDriverPhoto(driverName: string) {
        return this.getDriverData(driverName)?.photo;
    }
    
    getTripHistoryData(vehicleId: string) {
        return this.tripHistoryData.find(data => data.vehicleId === vehicleId)?.tripHistory;
    }
    
    getMaintenanceData(vehicleId: string) {
        return this.maintenanceData.find(data => data.vehicleId === vehicleId)?.maintenance;
    }
    
    getCostsPerTypeData(vehicleId: string, period: any) {
        const dataItem = this.costData.find(data => data.vehicleId === vehicleId);
        return dataItem ? dataItem.costPerType[period] : [];
    }
    
    getCostsPerMeterData(vehicleId: string, period: any) {
        const dataItem = this.costData.find(data => data.vehicleId === vehicleId);
        return dataItem ? dataItem.costsPerMeterPerQuarter[period] : [];
    }

    getFuelCostsData(vehicleId: string, period: any) {
        if (this.fuelCostsCache[vehicleId + period]) {
          return this.fuelCostsCache[vehicleId + period];
        }
    
        const dataItem = this.costData.find(data => data.vehicleId === vehicleId);
        if (!dataItem) return [];
    
        let fuelCostsPerMonthPeriod;
    
        switch (period) {
          case 'ytd':
          case '12months':
            fuelCostsPerMonthPeriod = dataItem.fuelCostsPerMonth;
            break;
          case '6months':
            fuelCostsPerMonthPeriod = [...dataItem.fuelCostsPerMonth].slice(-6);
            break;
          case '3months':
            fuelCostsPerMonthPeriod = [...dataItem.fuelCostsPerMonth].slice(-3);
            break;
          default:
            console.warn("Invalid period:", period);
            return [];
        }
    
        this.fuelCostsCache[vehicleId + period] = fuelCostsPerMonthPeriod;
        return fuelCostsPerMonthPeriod;
    }
    
    getUtilizationData(vehicleId: string) {
        const dataItem = this.utilizationData.find(data => data.vehicleId === vehicleId);
        return dataItem ? dataItem.utilization : [];
    }
}

export const dataService = new DataService();