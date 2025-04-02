const VEHICLE_DATA_URL =
  'https://www.infragistics.com/grid-examples-data/data/fleet/vehicles.json';
const DRIVERS_DATA_URL =
  'https://www.infragistics.com/grid-examples-data/data/fleet/drivers.json';
const COST_DATA_URL =
  'https://www.infragistics.com/grid-examples-data/data/fleet/cost.json';
const MAINTENANCE_DATA_URL =
  'https://www.infragistics.com/grid-examples-data/data/fleet/maintenance.json';
const UTILIZATION_DATA_URL =
  'https://www.infragistics.com/grid-examples-data/data/fleet/utilization.json';
const TRIP_HISTORY_DATA_URL =
  'https://www.infragistics.com/grid-examples-data/data/fleet/trip_history.json';

export class DataService {
    private vehiclesData: any[] = [];
    private driversData: any[] = [];
    private tripHistoryData: any[] = [];
    private maintenanceData: any[] = [];
    private costData: any[] = [];
    private utilizationData: any[] = [];
    private fuelCostsCache: { [key: string]: any[] } = {};

    async loadAllData(): Promise<void> {
      const [
        vehicles,
        drivers,
        tripHistory,
        maintenance,
        cost,
        utilization
      ] = await Promise.all([
        fetch(VEHICLE_DATA_URL).then(res => res.json()),
        fetch(DRIVERS_DATA_URL).then(res => res.json()),
        fetch(TRIP_HISTORY_DATA_URL).then(res => res.json()),
        fetch(MAINTENANCE_DATA_URL).then(res => res.json()),
        fetch(COST_DATA_URL).then(res => res.json()),
        fetch(UTILIZATION_DATA_URL).then(res => res.json())
      ]);

      this.vehiclesData = vehicles;
      this.driversData = drivers;
      this.tripHistoryData = tripHistory;
      this.maintenanceData = maintenance;
      this.costData = cost;
      this.utilizationData = utilization.map((vehicle: any) => {
        (vehicle.utilization as any).__dataIntents = {
          "'2023'": ['SeriesTitle/2023'],
          "'2024'": ['SeriesTitle/2024']
        };
        return vehicle;
      });
    }

    getVehiclesData() {
      return this.vehiclesData;
    }

    getDriverData(name: string) {
      return this.driversData.find(driver => driver.name === name);
    }
  
    getDriverPhoto(name: string) {
      return this.getDriverData(name)?.photo;
    }
  
    getTripHistoryData(vehicleId: string) {
      return this.tripHistoryData.find(d => d.vehicleId === vehicleId)?.tripHistory;
    }
  
    getMaintenanceData(vehicleId: string) {
      return this.maintenanceData.find(d => d.vehicleId === vehicleId)?.maintenance;
    }
  
    getCostsPerTypeData(vehicleId: string, period: any) {
      const item = this.costData.find(d => d.vehicleId === vehicleId) as any;
      return item?.costPerType[period] || [];
    }
  
    getCostsPerMeterData(vehicleId: string, period: any) {
      const item = this.costData.find(d => d.vehicleId === vehicleId) as any;
      return item?.costsPerMeterPerQuarter[period] || [];
    }
  
    getFuelCostsData(vehicleId: string, period: any) {
      const cacheKey = vehicleId + period;
  
      if (this.fuelCostsCache[cacheKey]) {
        return this.fuelCostsCache[cacheKey];
      }
  
      const item = this.costData.find(d => d.vehicleId === vehicleId) as any;
      const data = item?.fuelCostsPerMonth ?? [];
  
      let result: any[];
      switch (period) {
        case 'ytd':
        case '12months':
          result = data;
          break;
        case '6months':
          result = data.slice(-6);
          break;
        case '3months':
          result = data.slice(-3);
          break;
        default:
          console.warn('Invalid period:', period);
          return [];
      }
  
      this.fuelCostsCache[cacheKey] = result;
      return result;
    }
  
    getUtilizationData(vehicleId: string) {
      return this.utilizationData.find(d => d.vehicleId === vehicleId)?.utilization ?? [];
    }
  }
  
  export const dataService = new DataService();