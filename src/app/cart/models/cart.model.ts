export interface Cart {
    id: string;
    name: string;
    price: number;
}

export class CartModel implements Cart {
    constructor(public id: string, public name: string, public price: number = 0) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
}
