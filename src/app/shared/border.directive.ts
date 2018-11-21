import { Directive, HostListener, ElementRef, Renderer2, Input } from '@angular/core';

@Directive({
  selector: '[appBorder]'
})
export class BorderDirective {
  @Input() appBorder: string;
  @HostListener('click') onClick() {
    this.appBorder = this.appBorder || 'yellow';
    this.render.setStyle(this.el.nativeElement, 'border', '2px solid ' + this.appBorder);
  }
  constructor(private el: ElementRef, private render: Renderer2) { }

}
