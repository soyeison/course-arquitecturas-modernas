import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { OrderDto } from './dto/order.dto';

@Controller('order')
export class OrderController {
  constructor(
    @Inject('ORDER_SERVICE') private readonly orderMicroservice: ClientProxy,
  ) {}

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.orderMicroservice
      .send({ cmd: 'find-order-by-id' }, { id })
      .pipe(
        catchError((err) => {
          throw new Error(err);
        }),
      );
  }

  @Post()
  async addOrder(@Body() payload: OrderDto) {
    return this.orderMicroservice.send({ cmd: 'add-order' }, payload).pipe(
      catchError((err) => {
        throw new Error(err.message);
      }),
    );
  }
}
