- use CurrencyPipe in CartComponent, CartItemComponent and ProductComponent template for price
- use DatePipe in ProductComponent template for last Updated fieild
- use UppercasePipe in ProductComponent template for category name
- modify ProductsService:
    * getAll(): Promise<Product[]>
- use AsyncPipe
- implement OrderByPipe and register it to SharedModule