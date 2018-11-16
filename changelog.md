- generate CoreModule using 'ng g m core' command
- generate SharedModule using 'ng g m core' command
- generate and implement ProductListComponent using 'ng g c productList' command
  * display products
  * add product to cart
- generate and implement ProductComponent as presentaion component using 'ng g c products/product'
- generate and inplement ProductService using 'ng g s core/services/products' command
- add 'Buy' button, implement (click) event: set it to unavailable and add to cart
- generate and implement CartCompoennt using 'ng g c cart' command
  * display cart items
  * display count of items
  * display subtotal
- generate and implement CartItemCompoennt using 'ng g c cart/cartItem' command
- use @Input and @Output decorators
- use ChangeDetectionStrategy.OnPush for CartItemComponent
- use ngOnInit() and ngOnDestroy()
- use (click) DOM-event
- generate and inplement CartService using 'ng g s core/services/cart' command
    * get all cart items
    * get count
    * get subtotal
- add to AppComponent <h1 #appTitle></h1> element and using @ViewChild() set title app
- add HightlightDirective using 'ng g d shared/hightlight' command
    * use @HostBinding, @HostListener decorators.
    * hightlight host element during mouseenter and blur when mouse leave
- use ngStyle in ProductComponent template



