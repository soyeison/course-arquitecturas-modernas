import { OrderLine } from './order-line.entity';
import { User } from './user.entity';

export class Order {
  public id: number;
  public totalPrice: number;
  public orderDate: Date;
  public addressFirstLine: string;
  public addressSecondLine: string;
  public addressCountry: string;
  public addressPostCode: string;
  public orderLines: OrderLine[];
  public user: User;
}
