import { Category } from './category.enum';

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    count?: number;
    imageUrl?: string;
    lastUpdated: Date;
}

export class ProductModel implements Product {
    category: string;
    lastUpdated: Date;

    constructor(public id: string, public name: string, public description: string = '', public price: number = 0,
            category: Category = Category.Computers, public count: number, public imageUrl?: string) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.category = Category[category];
        this.count = count || 1;
        this.imageUrl = imageUrl || '';
        this.lastUpdated = new Date();
    }
}
