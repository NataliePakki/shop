import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Product } from '../models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Input() product: Product;
  @Output() bought = new EventEmitter();

  constructor() { }

  ngOnInit() {}

  onBuy(event: any) {
    event && event.preventDefault();
    this.bought.emit(this.product.id);
  }
}
