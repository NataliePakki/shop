- modify CartService:
* add new functionality:
    * add several products
    * remove several products
    * adjust count of products
    * remove all products
    * recalc count and subtotal
- implement LocalStorageService:
    * setItem(key, value): void
    * getItem(key): any
    * removeItem(key): void
- implement ConfigOptionsService
    * setConfig(value: any): void
    * getConfig(): any
- implement ConstantsService :{ App: "TaskManager", Ver: "1.0" } and register it to module using 'useValue'
- implement GeneratorService, which generate random n-string (a-z, A-Z, 0-9), use 'useFactory' to set n
- register all services in CoreModule
- create ContactUs demo-component and inject all services
- implement BorderDirective using ElementRef/Renderer2



