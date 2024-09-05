import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ProductRepository } from './repository/product.repository';
import { TcpModule } from '../transport/tcp.module';

@Module({
  providers: [ProductService, ProductRepository],
  controllers: [ProductController],
  imports: [TcpModule],
})
export class ProductModule {}
