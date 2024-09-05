import { Controller, ParseIntPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { OrderService } from './order.service';
import { OrderDto } from './dto/order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @MessagePattern({ cmd: 'find-order-by-id' })
  findById(@Payload('id', ParseIntPipe) id: number) {
    return this.orderService.findById(id);
  }

  @MessagePattern({ cmd: 'add-order' })
  addOrder(@Payload() orderDto: OrderDto) {
    return this.orderService.addOrder(orderDto);
  }

  @MessagePattern({ cmd: 'find-all-orders' })
  findAll() {
    return this.orderService.findAll();
  }
}
