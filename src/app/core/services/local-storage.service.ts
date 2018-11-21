import { Injectable } from '@angular/core';

export class Item {
  constructor(public key, public value) {}
}

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getItem(key: string): Item {
    return new Item(key, JSON.parse(localStorage.getItem(key)));

  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  getAll(): Item[] {
    const result = [];
    for (let i = 0, len = localStorage.length; i < len; ++i ) {
      const key = localStorage.key( i );
      result.push(new Item(key, localStorage.getItem(key)));
    }
    return result;
  }
}
