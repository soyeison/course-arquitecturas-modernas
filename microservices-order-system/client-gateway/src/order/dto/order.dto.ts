import { OrderLineDto } from './order-line.dto';

export class OrderDto {
  public userId: number;
  public orderLines: OrderLineDto[];
}
