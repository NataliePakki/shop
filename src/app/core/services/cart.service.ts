import { Injectable, OnDestroy, OnInit } from '@angular/core';

import { Cart } from '@cart/models/cart.model';
import { LocalStorageService } from './local-storage.service';
import { CoreServicesModule } from '@core/core-services.module';

@Injectable({
  providedIn: CoreServicesModule
})
export class CartService implements OnInit, OnDestroy {
  private submitted = false;

  constructor(
    private localStorage: LocalStorageService
  ) { }

  ngOnInit() {}

  ngOnDestroy() {
    this.localStorage.removeItem('cart');
    this.localStorage.removeItem('count');
    this.localStorage.removeItem('subtotal');
  }

  getAll(): Cart[] {
    return this.localStorage.getItem('cart');
  }

  get(id: string) {
    return this.getAll().find(item => item.id === id);
  }

  add(item: Cart, count?: number): void {
    count = count || item.count || 1;
    const items = this.getAll();
    const itemIndex = items.findIndex((it => it.id === item.id));
    if (itemIndex > -1) {
      items[itemIndex].count += count;
      items[itemIndex].maxCount = item.maxCount;
    } else {
      item.count = count;
      items.push(item);
    }
    this.recalc(item.price, item.count);
    this.localStorage.setItem('cart', items);
  }

  getSubtotal(): number {
    return this.localStorage.getItem('subtotal');
  }

  getCount(): number {
    return this.localStorage.getItem('count');
  }

  toggleSubmit(): void {
    this.submitted = !this.submitted;
  }

  isSubmitted(): boolean {
    return this.submitted;
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
    const items = this.getAll();
    const itemIndex = items.findIndex(it => it.id === id);
    if (itemIndex > -1) {
      const item = items[itemIndex];
      item.count += count;
      item.maxCount -= count;
      if (item.count <= 0) {
        items.splice(itemIndex, 1);
      }
      this.recalc(item.price, count);
      this.localStorage.setItem('cart', items);
    }
  }
  clear(): void {
    this.localStorage.setItem('count', 0);
    this.localStorage.setItem('subtotal', 0);
    this.localStorage.setItem('cart', []);
  }

  remove(id: string): void {
    const items = this.getAll();
    const i = items.findIndex(p => p.id === id);

    if (i > -1) {
      this.recalc(items[i].price, -items[i].count);
      items.splice(i, 1);
    }
    this.localStorage.setItem('cart', items);
  }

  private recalc(price: number, count: number) {
    const currCount = +this.localStorage.getItem('count');
    const curSubtotal = +this.localStorage.getItem('subtotal');
    this.localStorage.setItem('count', currCount + count);
    this.localStorage.setItem('subtotal', curSubtotal + price * count);
  }
}
