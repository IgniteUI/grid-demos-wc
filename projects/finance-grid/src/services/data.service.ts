const DATA_URL = "https://www.infragistics.com/grid-examples-data/data/finance/finance.json";

class DataService {
  public getFinanceData = async () => {
    try {
      const response = await fetch(DATA_URL);
      if (!response.ok) {
        console.error(response.statusText);
        return Promise.resolve([]);
      }
      return response.json();
    } catch (err) {
      console.error(err);
    }
  };
}

export const dataService: DataService = new DataService();
