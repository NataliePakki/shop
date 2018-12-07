import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Order } from '@order/models/order.model';
import { OrdersService } from '@core/services';

@Component({
  selector: 'app-order-items',
  templateUrl: './order-items.component.html',
  styleUrls: ['./order-items.component.css']
})
export class OrderItemsComponent implements OnInit, OnDestroy {
  id: string;
  order: Order;
  constructor(
    private orderService: OrdersService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    // console.log("I am here");
    // var res = this.route.snapshot.params;
    // this.route.params.subscribe((params) => {
    //   this.orderService.get(params.orderID).then((order) => {
    //     this.order = order;
    //   });
    // });
  }
  ngOnDestroy() {
    this.orderService.remove(this.order.id);
  }

}
