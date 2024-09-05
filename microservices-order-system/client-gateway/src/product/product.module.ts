import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { TcpModule } from '../transport/tcp.module';

@Module({
  controllers: [ProductController],
  imports: [TcpModule],
})
export class ProductModule {}
