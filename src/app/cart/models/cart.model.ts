export interface Cart {
    id: string;
    name: string;
    price: number;
    count?: number;
    maxCount?: number;
}

export class CartModel implements Cart {
    constructor(public id: string, public name: string, public price: number = 0, public count?: number, public maxCount?: number) {
        this.count = count || 1;
        this.maxCount = maxCount || Number.POSITIVE_INFINITY;
    }
}
