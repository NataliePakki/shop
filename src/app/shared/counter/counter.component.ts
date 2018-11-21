import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-counter',
  template: `
  <button (click)="onDecrease()" [disabled]="isDecreaseDisabled()" class="badge badge-light">-</button>
    <span class="count badge badge-secondary">{{count}}</span>
  <button (click)="onIncrease()" [disabled]="isIncreaseDisabled()" class="badge badge-light">+</button>
  `,
  styles: [`
    :host {
      margin-left: 5px;
    }
    button {
      outline: none;
    }
    .count {
      margin-left: 5px;
      margin-right: 5px;
    }
    [disabled] {
      filter:opacity(.2);
    }
  `]
})
export class CounterComponent implements OnInit {
  @Output() increase = new EventEmitter();
  @Output() decrease = new EventEmitter();
  @Input() count?: number;
  @Input() maxCount?: number;
  @Input() minCount?: number;


  constructor() { }

  ngOnInit() {
    this.count = this.count || 1;

    this.maxCount = this.maxCount || Number.POSITIVE_INFINITY;
    this.minCount = this.minCount || 0;

  }

  onDecrease () {
    this.decrease.emit();
  }

  onIncrease() {
    this.increase.emit();
  }

  isIncreaseDisabled() {
    return this.count >= this.maxCount;
  }

  isDecreaseDisabled() {
    return this.count === this.minCount;
  }

}
