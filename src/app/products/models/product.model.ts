import { Category } from './category.enum';

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    category: Category;
    count?: number;
    imageUrl?: string;
}

export class ProductModel implements Product {

    constructor(public id: string, public name: string, public description: string = '', public price: number = 0,
            public category: Category = Category.Computers, public count: number, public imageUrl?: string) {
        this.count = count || 1;
        this.imageUrl = imageUrl || '';
    }
}
