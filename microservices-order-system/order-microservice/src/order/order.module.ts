import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { TcpModule } from '../transport/tcp.module';
import { OrderRepository } from './repository/order.repository';
import { UserRepository } from '../user/user.repository';

@Module({
  controllers: [OrderController],
  providers: [OrderService, OrderRepository, UserRepository],
  imports: [TcpModule],
})
export class OrderModule {}
