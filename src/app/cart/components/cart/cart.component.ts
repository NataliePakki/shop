import { Component, OnInit, OnDestroy } from '@angular/core';

import { CartService, ProductsService, OrdersService } from '@core/services';
import { Cart } from '@cart/models/cart.model';
import { Router } from '@angular/router';
import { Order } from '@order/models/order.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit, OnDestroy {
  public orderByValues = [ 'count', 'price', 'name' ];
  public currOrderBy = 'name';
  public desc = true;
  constructor(
    public cartService: CartService,
    private productsService: ProductsService,
    private ordersService: OrdersService,
    private router: Router,
  ) { }

  ngOnInit() {}

  ngOnDestroy() {}

  onSubmit($event: any) {
    $event.target.disabled = true;
    this.cartService.toggleSubmit();
    const newOrder = this.createNewOrder();
    this.ordersService.add(newOrder);
    this.router.navigate(['checkout', newOrder.id]);
  }

  onDelete(id: string) {
    const item = this.cartService.get(id);
    const count = item.count;
    this.cartService.remove(id);
    this.productsService.increaseCount(id, count);
  }

  onAdjusted(item: Cart) {
    this.cartService.adjustCount(item.id, item.count);
    this.productsService.adjustCount(item.id, -item.count);
  }

  onOrderByChanged(orderByValue: string) {
    if (this.currOrderBy === orderByValue) {
      this.desc = !this.desc;
    } else {
      this.currOrderBy = orderByValue;
    }
  }

  onOrderChanged() {
    this.desc = !this.desc;
  }

  clear(event: any) {
    event && event.preventDefault();
    this.cartService.getAll().forEach(item => {
      this.productsService.adjustCount(item.id, item.count);
    });
    this.cartService.clear();
  }

  getCount(): number {
    return this.cartService.getCount();
  }

  getSubtotal(): number {
    return this.cartService.getSubtotal();
  }

  private createNewOrder(): Order {
    const products = [];
    this.cartService.getAll().forEach((item) => {
      this.productsService.get(item.id)
      .then(pr =>  {
          const product = {...pr};
          product.count = item.count;
          products.push(product);
      });
    });

    return new Order(products, this.cartService.getSubtotal());
  }
}
