import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { OrderDto } from './dto/order.dto';
import { ClientProxy } from '@nestjs/microservices';
import { User } from './entity/user.entity';
import { UserDto } from './dto/user.dto';
import { firstValueFrom } from 'rxjs';
import { AddressDto } from './dto/address.dto';
import { UserRepository } from '../user/user.repository';
import { Order } from './entity/order.entity';
import { OrderRepository } from './repository/order.repository';
import { OrderLine } from './entity/order-line.entity';
import { OrderLineDto } from './dto/order-line.dto';
import { ProductDto } from './dto/product.dto';

@Injectable()
export class OrderService {
  constructor(
    @Inject('USER_SERVICE') private readonly userMicroservice: ClientProxy,
    @Inject('PRODUCT_SERVICE')
    private readonly productMicroservice: ClientProxy,
    private readonly userRepository: UserRepository,
    private readonly orderRepository: OrderRepository,
  ) {}

  async findById(id: number) {
    const order = this.orderRepository.findById(id);
    if (!order) {
      throw new BadRequestException(`Order with id #${id} not found`);
    }
    return order;
  }

  private createOrder(user: User) {
    const order = new Order();
    order.addressFirstLine = user.addressFirstLine;
    order.addressSecondLine = user.addressSecondLine;
    order.addressCountry = user.addressCountry;
    order.addressPostCode = user.addressPostCode;
    order.orderDate = new Date();
    order.user = user;
    return order;
  }

  private async createOrderLine(ol: OrderLineDto) {
    const orderLine = new OrderLine();
    orderLine.productId = ol.productId;
    orderLine.quantity = ol.quantity;

    // Requiero el producto
    const product: ProductDto = await firstValueFrom(
      this.productMicroservice.send(
        { cmd: 'remove-stock-products' },
        { id: orderLine.productId, unitsToRemove: orderLine.quantity },
      ),
    );
    orderLine.productName = product.name;
    orderLine.productPrice = product.price;

    const linePrice = product.price * ol.quantity;
    orderLine.lineTotalPrice = linePrice;
    return orderLine;
  }

  private async fillOrderLines(order: Order, orderDto: OrderDto) {
    let totalPrice = 0;
    const orderLines: OrderLine[] = [];
    for (const ol of orderDto.orderLines) {
      const orderLine = await this.createOrderLine(ol);
      orderLine.orderId = order.id;
      orderLines.push(orderLine);
      totalPrice += orderLine.lineTotalPrice;
    }

    order.totalPrice = totalPrice;
    order.orderLines = orderLines;
  }

  async addOrder(orderDto: OrderDto) {
    const user = await this.findAndMapUser(orderDto);
    this.userRepository.save(user);

    const order: Order = this.createOrder(user);
    await this.fillOrderLines(order, orderDto);
    return this.orderRepository.save(order);
  }

  private async findAndMapUser(order: OrderDto) {
    const userDto: UserDto = await firstValueFrom(
      this.userMicroservice.send(
        { cmd: 'find_user_by_id' },
        { id: order.userId },
      ),
    );

    const user = new User();
    user.id = userDto.id;
    user.fullName = userDto.fullName;
    console.log('Addressess: ', userDto);
    const defaultAddress: AddressDto = userDto.addresses.find(
      (address) => address.isDefault,
    );
    user.addressFirstLine = defaultAddress.firstLine;
    user.addressSecondLine = defaultAddress.secondLine;
    user.addressCountry = defaultAddress.country;
    user.addressPostCode = defaultAddress.postCode;

    return user;
  }

  async findAll() {
    return this.orderRepository.findAll();
  }
}
