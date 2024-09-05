import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { TcpModule } from '../transport/tcp.module';

@Module({
  controllers: [OrderController],
  imports: [TcpModule],
})
export class OrderModule {}
