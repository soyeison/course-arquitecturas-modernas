import { Controller, ParseIntPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ProductService } from './product.service';
import { RemoveStockDto } from './dto/remove-stock-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @MessagePattern({ cmd: 'find-product-by-id' })
  findById(@Payload('id', ParseIntPipe) id: number) {
    return this.productService.findById(id);
  }

  @MessagePattern({ cmd: 'find-all-products' })
  findAll() {
    return this.productService.findAll();
  }

  @MessagePattern({ cmd: 'remove-stock-products' })
  removeStock(@Payload() removeStockProducts: RemoveStockDto) {
    return this.productService.removeStock(removeStockProducts);
  }
}
