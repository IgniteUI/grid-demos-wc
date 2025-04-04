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
    private vehiclesRecords: any[] = [];
    private driverRecords: any[] = [];
    private tripHistoryRecords: any[] = [];
    private maintenanceRecords: any[] = [];
    private costRecords: any[] = [];
    private utilizationRecords: any[] = [];

    private fuelCostsCache: { [key: string]: any[] } = {};

    async getVehiclesData() {
      const response = await fetch(VEHICLE_DATA_URL);
      this.vehiclesRecords = await response.json();
    }

    public async getDriverData() {
      const response = await fetch(DRIVERS_DATA_URL);
      this.driverRecords = await response.json();
    }
  
    public async getTripHistoryData() {
      const response = await fetch(TRIP_HISTORY_DATA_URL);
      this.tripHistoryRecords = await response.json();
    }
  
    public async getMaintenanceData() {
      const response = await fetch(MAINTENANCE_DATA_URL);
      this.maintenanceRecords = await response.json();
    }
  
    public async getCostData() {
      const response = await fetch(COST_DATA_URL);
      this.costRecords = await response.json();
    }
  
    public async getUtilizationData() {
      const response = await fetch(UTILIZATION_DATA_URL);
      const data = await response.json();
  
      data.forEach((vehicle: any) => {
        vehicle.utilization.__dataIntents = {
          "'2023'": ['SeriesTitle/2023'],
          "'2024'": ['SeriesTitle/2024']
        };
      });
  
      this.utilizationRecords = data;
    }

    public async loadOptionalData() {
      await Promise.all([
        this.getDriverData(),
        this.getTripHistoryData(),
        this.getMaintenanceData(),
        this.getCostData(),
        this.getUtilizationData()
      ]);
    }

    public findDriverByName(driverName: string) {
      return this.driverRecords.find((d: any) => d.name === driverName)
    }

    public getDriverPhoto(driverName: string) {
      return this.findDriverByName(driverName)?.photo;
    }

    public findTripHistoryById(vehicleId: string) {
      return this.tripHistoryRecords.find((d: any) => d.vehicleId === vehicleId)?.tripHistory;
    }

    public findMaintenanceDataById(vehicleId: string) {
      return this.maintenanceRecords.find((d: any) => d.vehicleId === vehicleId)?.maintenance;
    }

    public findCostsPerTypeData(vehicleId: string, period: any) {
      const item = this.costRecords.find((d: any) => d.vehicleId === vehicleId);
      return item?.costPerType?.[period] || [];
    }

    public findCostsPerMeterData(vehicleId: string, period: any) {
      const item = this.costRecords.find((d: any) => d.vehicleId === vehicleId);
      return item?.costsPerMeterPerQuarter?.[period] || [];
    }

    public getFuelCostsData(vehicleId: string, period: any) {
      const cacheKey = vehicleId + period;
      if (this.fuelCostsCache[cacheKey]) {
        return this.fuelCostsCache[cacheKey];
      }
  
      const item = this.costRecords.find((d: any) => d.vehicleId === vehicleId);
      const fuelCosts = item?.fuelCostsPerMonth || [];
  
      let result: any[] = [];
      switch (period) {
        case 'ytd':
        case '12months':
          result = fuelCosts;
          break;
        case '6months':
          result = fuelCosts.slice(-6);
          break;
        case '3months':
          result = fuelCosts.slice(-3);
          break;
        default:
          console.warn('Invalid period:', period);
          return [];
      }
  
      this.fuelCostsCache[cacheKey] = result;
      return result;
    }

    public findUtilizationDataById(vehicleId: string) {
      const item = this.utilizationRecords.find((d: any) => d.vehicleId === vehicleId);
      return item ? item.utilization : [];
    }

    public get vehicleList() {
      return this.vehiclesRecords;
    }
    public get driverList() {
      return this.driverRecords;
    }
  }
  
  export const dataService = new DataService();