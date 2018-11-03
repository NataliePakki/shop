import { Injectable } from '@angular/core';
import { Cart } from '../models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: Cart[] = [];

  constructor() { }

  getAll() {
    return this.items;
  }

  get(id: string) {
    return this.items.find(item => item.id === id);
  }

  add(item: Cart) {
    this.items.push(item);
  }

  remove(id: string) {
    this.items = this.items.filter((i) =>  i.id !== id );
  }
}
