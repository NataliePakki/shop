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

    constructor(public id: string, public name: string, public description: string = '', public price: number = 0,
            public category: Category = Category.Computers, public imageUrl: string = '', public isAvailable: boolean = true) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.category = category;
        this.imageUrl = imageUrl;
        this.isAvailable = isAvailable;
    }
}
