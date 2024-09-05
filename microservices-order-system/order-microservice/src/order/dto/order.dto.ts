import { OrderLine } from '../entity/order-line.entity';

export class OrderDto {
  public userId: number;
  public orderLines: OrderLine[];
}
