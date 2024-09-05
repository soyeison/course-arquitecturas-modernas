import { Module } from '@nestjs/common';
import { OrderModule } from './order/order.module';
import { TcpModule } from './transport/tcp.module';

@Module({
  imports: [OrderModule, TcpModule],
})
export class AppModule {}
