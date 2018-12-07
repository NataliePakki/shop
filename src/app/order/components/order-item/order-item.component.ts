import { Component, OnInit, Input } from '@angular/core';

import { Product } from '@products/models/product.model';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.css']
})
export class OrderItemComponent implements OnInit {
  @Input() item: Product;
  constructor() { }

  ngOnInit() {
  }

}
