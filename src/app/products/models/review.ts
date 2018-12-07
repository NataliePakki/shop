import { v4 as uuid } from 'uuid';

export class Review {
    id: string;

    constructor(public productId, public author: string, public text: string, public stars: number, public createdDate: Date) {
      this.id = uuid();
    }
}
