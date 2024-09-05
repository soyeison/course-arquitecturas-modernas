import { Product } from '../entity/product.entity';

export class ProductRepository {
  private products: Product[] = [
    {
      id: 1,
      name: 'Teclado',
      description: 'Producto 1 descripcion mas larga',
      price: 10,
      stock: 3,
    },
    {
      id: 2,
      name: 'Computador',
      description: 'Computador portatil muy bueno buenisismo',
      price: 50,
      stock: 10,
    },
  ];

  findById(id: number) {
    return this.products.find((product) => product.id === id);
  }

  findAll() {
    return this.products;
  }

  update(id: number, product: Partial<Product>) {
    const productIndex = this.products.findIndex(
      (product) => product.id === id,
    );
    this.products[productIndex] = {
      ...this.products[productIndex],
      ...product,
    };

    return this.products[productIndex];
  }
}
