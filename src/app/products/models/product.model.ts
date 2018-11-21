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
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.category = category;
        this.count = count || 1;
        this.imageUrl = imageUrl || '';
    }
}
