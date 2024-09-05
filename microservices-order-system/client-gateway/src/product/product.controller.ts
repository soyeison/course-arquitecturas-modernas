import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { RemoveStockDto } from './dto/remove-stock-product.dto';

@Controller('product')
export class ProductController {
  constructor(
    @Inject('PRODUCT_SERVICE')
    private readonly productMicroservice: ClientProxy,
  ) {}

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productMicroservice
      .send({ cmd: 'find-product-by-id' }, { id })
      .pipe(
        catchError((err) => {
          throw new Error(err);
        }),
      );
  }

  @Put(':id')
  async removeStock(
    @Param('id', ParseIntPipe) id: number,
    @Body() removeStockDto: RemoveStockDto,
  ) {
    return this.productMicroservice.send(
      { cmd: 'remove-stock-products' },
      { id, unitsToRemove: removeStockDto.unitsToRemove },
    );
  }
}
