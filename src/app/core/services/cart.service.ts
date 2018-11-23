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

  add(item: Cart, count?: number): void {
    count = count || 1;
    const itemIndex = this.items.findIndex((it => it.id === item.id));
    if (itemIndex > -1) {
      this.items[itemIndex].count += count;
      this.items[itemIndex].maxCount = item.maxCount;
    } else {
      item.count = item.count || count;
      this.items.push(item);
    }
    this.recalc(item.price, item.count);
  }

  getSubtotal(): number {
    return this.subtotal;
  }

  getCount(): number {
    return this.count;
  }

  decreaseCount(id: string, count?: number): void {
    count = count || 1;
    this.adjustCount(id, -count);
  }

  increaseCount(id: string, count?: number): void {
    count = count || 1;
    this.adjustCount(id, count);
  }

  adjustCount(id: string, count: number) {
    const itemIndex = this.items.findIndex(it => it.id === id);
    if (itemIndex > -1) {
      const item = this.items[itemIndex];
      item.count += count;
      item.maxCount -= count;
      if (item.count <= 0) {
        this.items.splice(itemIndex, 1);
      }
      this.recalc(item.price, count);
    }
  }
  clear(): void {
    this.items = [];
    this.count = 0;
    this.subtotal = 0;
  }

  remove(id: string): void {
    const i = this.items.findIndex(p => p.id === id);

    if (i > -1) {
      this.recalc(this.items[i].price, -this.items[i].count);
      this.items.splice(i, 1);
    }
  }

  private recalc(price: number, count: number) {
    this.count += count;
    this.subtotal += price * count;
  }
}
