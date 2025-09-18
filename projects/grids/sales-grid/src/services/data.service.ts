class DataService {
    public DATA_URL = 'https://www.infragistics.com/grid-examples-data/data/sales/sales.json';

    public async getSalesData() {
        try {
            const response = await fetch(this.DATA_URL);
            if (!response.ok) {
                console.error(response.statusText);
                return [];
            }

            const json = await response.json();
            return json;
        } catch(error: any) {
            console.error(error.message);
        }
    }
}

export const SalesDataService: DataService = new DataService();