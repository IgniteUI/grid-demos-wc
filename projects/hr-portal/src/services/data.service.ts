const DATA_URL = "https://staging7.infragistics.com/grid-examples-data/data/hr/hr.json";

export class DataService {
    public async fetchData(): Promise<any> {
      try {
        const response = await fetch(DATA_URL);
        const jsonData = await response.json();
        return jsonData; 
      } catch (error) {
        console.error('Error fetching HR data:', error);
        throw error;
      }
    }
  }