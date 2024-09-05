import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { ProductRepository } from './repository/product.repository';
import { ClientProxy } from '@nestjs/microservices';
import { RemoveStockDto } from './dto/remove-stock-product.dto';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    @Inject('USER_SERVICE') private readonly userService: ClientProxy,
  ) {}

  async findById(id: number) {
    const product = this.productRepository.findById(id);
    /* const userFind = await firstValueFrom(
      this.userService.send({ cmd: 'find_user_by_id' }, { id: 1 }),
    );
    console.log('User Find: ', JSON.stringify(userFind, null, 4)); */
    if (!product) {
      throw new BadRequestException(`Product with id #${id} not found`);
    }

    return product;
  }

  async findAll() {
    const products = this.productRepository.findAll();

    if (!products) {
      throw new BadRequestException('Products not found');
    }

    return products;
  }

  async removeStock(removeStockProducts: RemoveStockDto) {
    const product = await this.findById(removeStockProducts.id);

    const newStock = product.stock - removeStockProducts.unitsToRemove;

    if (newStock < 0) {
      throw new ConflictException("There isn't stock to reduce");
    }

    return this.productRepository.update(removeStockProducts.id, {
      stock: newStock,
    });
  }
}
