import { Category } from 'app/shared/category.enum';

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    category: Category;
    isAvailable: boolean;
    imageUrl: string;
}

export class ProductModel implements Product {
    id: string;
    name: string;
    description: string;
    price: number;
    category: Category;
    isAvailable: boolean;
    imageUrl: string;

    constructor(id: string, name: string, description: string = '', price: number = 0,
            category: Category = Category.Computers, imageUrl: string = '', isAvailable: boolean = true) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.category = category;
        this.imageUrl = imageUrl;
        this.isAvailable = isAvailable;
    }
}
