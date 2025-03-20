const DATA_URL = "https://staging.infragistics.com/grid-examples-data/data/erp/products.json";

class ErpDataService {
  public getErpData = async () => {
    try {
      const response = await fetch(DATA_URL);
      if (!response.ok) {
        console.error(response.statusText);
        return Promise.resolve([]);
      }
      const currData = await response.json();

      currData.forEach((record: any) => {
        // Set unitsSold
        record["unitsSold"] = this.getLastMonthSoldUnits(record);

        // calculate totalNetProfit
        record["totalNetProfit"] = this.calculateTotalNetProfit(record);

      });

      return currData;
    } catch (err) {
      console.error(err);
    }
  };

  private getLastMonthSoldUnits(product: any): void {
    const lastItemIndex = product.salesTrendData.length - 1;
    return product.salesTrendData[lastItemIndex].unitsSold;
  }

  private calculateTotalNetProfit(product: any): number {
    const unitsSold: number = product.unitsSold || 0;
    return unitsSold * (product.netPrice);
  }

}

export const erpDataService: ErpDataService = new ErpDataService();