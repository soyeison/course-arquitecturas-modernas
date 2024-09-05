import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { TcpModule } from './transport/tcp.module';
import { UserModule } from './user/user.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [ProductModule, TcpModule, UserModule, OrderModule],
})
export class AppModule {}
