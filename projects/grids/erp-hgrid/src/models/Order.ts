import { DeliveryDetails } from "./DeliveryDetails";
import { OrderDetails } from "./OrderDetails";
import { OrderStatus } from "./OrderStatus";

export interface Order {
  orderId: number;
  status: OrderStatus;
  delivery: DeliveryDetails;
  orderInformation: OrderDetails;
}