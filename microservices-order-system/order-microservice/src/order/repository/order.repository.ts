import { Order } from '../entity/order.entity';
import { User } from '../entity/user.entity';

export class OrderRepository {
  private orders: Order[] = [
    {
      id: 1,
      totalPrice: 1,
      orderDate: new Date(),
      addressFirstLine: 'Primera direccion',
      addressSecondLine: 'Segunda direccion',
      addressCountry: '',
      addressPostCode: '',
      orderLines: [],
      user: new User(),
    },
  ];

  findById(id: number) {
    return this.orders.find((order) => order.id === id);
  }

  findAll() {
    return this.orders;
  }

  save(order: Order) {
    if (!order.id) {
      order.id = 5;
    }
    this.orders.push(order);
    return order;
  }
}
