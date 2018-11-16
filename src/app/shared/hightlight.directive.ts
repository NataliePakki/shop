import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[appHightlight]'
})
export class HightlightDirective {

  constructor() { }

  @HostBinding('style.boxShadow') boxShadow: string;

  @HostListener('mouseenter') onMouseEnter () {
    this.hightlight();
  }

  @HostListener('mouseleave') onMouseLeave () {
    this.blur();
  }

  private hightlight() {
    this.boxShadow = '0 0 1em cadetblue';
  }

  private blur() {
    this.boxShadow = '';
  }
}
