import { DataPoint } from "./DataPoint";
import { Order } from "./Order";

export interface TemplateDataItem {
  sku: string;
  imageUrl: string;
  productName: string;
  category: string;
  rating: number;
  unitsSold?: number;
  grossPrice: number;
  netPrice: number;
  totalNetProfit?: number;
  salesTrendData: DataPoint[];
  orders: Order[];
}

export interface TemplateDataItemExtended extends TemplateDataItem {
    unitsSold: number;
    totalNetProfit: number;
}