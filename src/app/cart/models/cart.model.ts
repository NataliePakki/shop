import { Category } from '@shared/category.enum';

export interface Cart {
    id: string;
    name: string;
    price: number;
}

export class CartModel implements Cart {
    id: string;
    name: string;
    price: number;

    constructor(id: string, name: string, price: number = 0) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
}
