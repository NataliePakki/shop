import { TestBed } from '@angular/core/testing';

import { CartModel } from '@cart/models/cart.model';
import { CartService } from './cart.service';
import { LocalStorageService } from './local-storage.service';

describe('OrderService', () => {
  let service: CartService;
  let localStorageSpy: jasmine.SpyObj<LocalStorageService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('HttpClient', ['setItem', 'getItem', 'removeItem']);
    TestBed.configureTestingModule({
      providers: [ CartService, { provide: LocalStorageService, useValue: spy } ]
    });
    service = TestBed.get(CartService);
    localStorageSpy = TestBed.get(LocalStorageService);
  });

  it('getAll should return stubbed value from a LocalStorageService spy', () => {
    const stubValue = [ new CartModel('1', 'name') ];
    localStorageSpy.getItem.and.returnValue(stubValue);

    expect(service.getAll()).toBe(stubValue, 'service returned stub value');
    expect(localStorageSpy.getItem.calls.count()).toBe(
      1,
      'stubbed method was called once'
    );
    expect(localStorageSpy.getItem.calls.mostRecent().returnValue).toBe(
      stubValue
    );
  });

  it('getSubtotal should return stubbed value from a LocalStorageService spy', () => {
    const stubValue = 3;
    localStorageSpy.getItem.and.returnValue(stubValue);

    expect(service.getSubtotal()).toBe(stubValue, 'service returned stub value');
    expect(localStorageSpy.getItem.calls.count()).toBe(
      1,
      'stubbed method was called once'
    );
    expect(localStorageSpy.getItem.calls.mostRecent().returnValue).toBe(
      stubValue
    );
  });

  it('getCount should return stubbed value from a LocalStorageService spy', () => {
    const stubValue = 3;
    localStorageSpy.getItem.and.returnValue(stubValue);

    expect(service.getCount()).toBe(stubValue, 'service returned stub value');
    expect(localStorageSpy.getItem.calls.count()).toBe(
      1,
      'stubbed method was called once'
    );
    expect(localStorageSpy.getItem.calls.mostRecent().returnValue).toBe(
      stubValue
    );
  });

  it('toggleSubmit', () => {
    expect(service.isSubmitted()).toBeFalsy();

    service.toggleSubmit();

    expect(service.isSubmitted()).toBeTruthy();

    service.toggleSubmit();

    expect(service.isSubmitted()).toBeFalsy();
  });


  it('adjustCount', () => {
    const stubValue = [ new CartModel('1', 'name') ];
    localStorageSpy.getItem.and.returnValue(stubValue);

    service.toggleSubmit();

    expect(service.isSubmitted()).toBeTruthy();

    service.toggleSubmit();

    expect(service.isSubmitted()).toBeFalsy();
  });
});
