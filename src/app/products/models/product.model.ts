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
    lastUpdated: Date;

    constructor(public id: string = '', public name: string = '', public description: string = '', public price: number = 0,
            public category: Category = Category.Computers, public count: number = 0, public imageUrl?: string) {
        this.count = count || 1;
        this.imageUrl = imageUrl || '';
        this.lastUpdated = new Date();
    }
}
