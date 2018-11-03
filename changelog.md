1. initialize a project using 'ng new shop' command
2. generate ProductsComponent using ng g c products' command
3. generate ProductComponent using 'ng g c products/product' command
3.1. add 'Buy' button, implement (click) event: set it to unavailable and add to cart
4. generate Product interface using 'ng g i products/models/product' command
4.1. implement ProductModel:
- id: string
- name: string
- description: string
- price: number
- category: enum
- imageUrl: string
- isAvailable: boolean
5. generate ProductsService using 'ng g s products/services/products' command
5.1. implement ProductsService:
- getAll(): Product[]
- get(id: string): Product
- add(product: Product): void
- remove(id: string): void
- toogleIsAvailable(id: string): void
6. generate CartComponent using 'ng g c cart' command
6.1. use *ngIf + else to display cart (CartComponent) if it is not empty, else display 'cart is empty' message
6.2. add 'Delete' button, implement (click) event: remove from cart, set it to availble in products list
7. generate Cart interface using 'ng g i cart/models/cart' command
7.1. Implement CartModel:
- id: string
- name: string
- price: number
8. generate CartService using 'ng g s cart/services/cart' command
8.1. implement CartService:
- getAll(): Cart[]
- get(id: string): Cart
- add(product: Product): void
- remove(id: string): void
9. use angular material