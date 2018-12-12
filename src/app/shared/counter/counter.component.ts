import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
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
