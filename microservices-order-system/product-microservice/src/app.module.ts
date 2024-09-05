import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { TcpModule } from './transport/tcp.module';

@Module({
  imports: [ProductModule, TcpModule],
})
export class AppModule {}
