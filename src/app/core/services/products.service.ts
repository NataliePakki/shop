import { Injectable } from '@angular/core';
import { v4 as uuid } from 'uuid';

import { ProductModel, Product } from '@products/models/product.model';
import { Category } from '@products/models/category.enum';

const products: Product[] = [
  new ProductModel(uuid(), 'Nexus 7', '7.0 IPS (1280x800), Android, Memory 1 GB,  32 GB, 3G', 300, Category.Phones, 2,
      'https://upload.wikimedia.org/wikipedia/commons/c/cc/Nexus_7_%282013%29.png'),
  new ProductModel(uuid(), 'Nexus 6', '5.96 IPS (1440 x 2560), Android, Memory 3 GB,  32 GB, 3G', 350,
      Category.Phones, 2,
     'https://upload.wikimedia.org/wikipedia/commons/4/40/Nexus_6.png')
];
const productsPromise = Promise.resolve(products);

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor() {}

  getAll(): Promise<Product[]> {
    return productsPromise;
  }

  get(id: string): Product {
    return products.find((product) => product.id === id);
  }

  add(product: Product, count?: number): void {
    count = count || product.count || 1;
    product.count = count;
    products.push(product);
  }

  decreaseCount(id: string, count?: number): void {
    this.adjustCount(id, -count || -1);
  }

  increaseCount(id: string, count?: number): void {
    this.adjustCount(id, count || 1);
  }

  adjustCount(id: string, count: number) {
    const index = products.findIndex((product => product.id === id));
    if (index > -1) {
      products[index].lastUpdated = new Date();
      products[index].count += count;
    }
  }

  remove(id: string): void {
    const i = products.findIndex(p => p.id === id);

    if (i > -1) {
      products.splice(i, 1);
    }
  }
}
