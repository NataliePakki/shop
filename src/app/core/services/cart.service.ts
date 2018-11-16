import { Injectable, OnDestroy } from '@angular/core';
import { Cart } from '@cart/models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService implements OnDestroy {
  private items: Cart[] = [];
  private subtotal = 0;
  private count = 0;

  constructor() { }

  ngOnDestroy() {
    this.items = [];
    this.subtotal = 0;
    this.count = 0;
  }

  getAll(): Cart[] {
    return this.items;
  }

  get(id: string) {
    return this.items.find(item => item.id === id);
  }

  add(item: Cart): void {
    this.items.push(item);
    this.count ++;
    this.subtotal += item.price;
  }

  getSubtotal(): number {
    return this.subtotal;
  }

  getCount(): number {
    return this.count;
  }
  remove(id: string): void {
    const item = this.get(id);
    this.items = this.items.filter((i) =>  i.id !== id );
    this.count--;
    this.subtotal -= item.price;
  }
}
