import { TemplateDataItem, TemplateDataItemExtended } from "../models/TemplateDataItem";

const DATA_URL = "https://staging.infragistics.com/grid-examples-data/data/erp/products.json";

class ErpDataService {
  public async getErpData(): Promise<TemplateDataItemExtended[]> {
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
      throw new Error("Failed to fetch data");
    }
  };

  private getLastMonthSoldUnits(product: TemplateDataItem): number {
    const lastItemIndex = product.salesTrendData.length - 1;
    return product.salesTrendData[lastItemIndex].unitsSold;
  }

  private calculateTotalNetProfit(product: TemplateDataItem): number {
    const unitsSold: number = product.unitsSold || 0;
    return unitsSold * (product.netPrice);
  }

}

export const erpDataService: ErpDataService = new ErpDataService();