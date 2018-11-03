import { Injectable } from '@angular/core';
import { v4 as uuid } from 'uuid';

import { ProductModel, Product } from '../models/product.model';
import { Category } from '@shared/category.enum';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private products: Product[] = [];

  constructor() {
    this.products.push(new ProductModel(uuid(), 'Nexus 7', '7.0 IPS (1280x800), Android, Memory 1 GB,  32 GB, 3G', 300, Category.Phones,
        'https://upload.wikimedia.org/wikipedia/commons/c/cc/Nexus_7_%282013%29.png'));
    this.products.push(new ProductModel(uuid(), 'Nexus 6', '5.96 IPS (1440 x 2560), Android, Memory 3 GB,  32 GB, 3G', 300, Category.Phones,
        'https://upload.wikimedia.org/wikipedia/commons/4/40/Nexus_6.png'));
  }

  getAll() {
    return this.products;
  }

  get(id: string) {
    return this.products.find((product) => product.id === id);
  }

  add(product: Product) {
    this.products.push(product);
  }

  toggleIsAvailable(id: string) {
    const index = this.products.findIndex((product => product.id === id));
    if (index > -1) {
      this.products[index].isAvailable = !this.products[index].isAvailable;
    }
  }

  remove(id: string) {
    this.products = this.products.filter((product) => product.id !== id);
  }
}
