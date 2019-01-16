/**
 * Shallow Test
 */
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { HeaderComponent } from './header.component';
import { RouterLinkStubDirective } from 'tests/router-stubs';
import { CartService } from '@core/services';

let fixture: ComponentFixture<HeaderComponent>;
let cartSertviceSpy: jasmine.SpyObj<CartService>;

describe('HeaderComponent (Shallow)', () => {
  beforeEach(() => {
    cartSertviceSpy = jasmine.createSpyObj('CartSertvice', ['getCount']);
    TestBed.configureTestingModule({
      declarations: [HeaderComponent, RouterLinkStubDirective],
      providers: [{ provide: CartService, useValue: cartSertviceSpy }],
      schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(HeaderComponent);
    fixture.detectChanges();

    linkDes = fixture.debugElement.queryAll(
      By.directive(RouterLinkStubDirective)
    );

    links = linkDes.map(
      d => d.injector.get(RouterLinkStubDirective) as RouterLinkStubDirective
    );
  });

  let links: RouterLinkStubDirective[], linkDes: DebugElement[];

  beforeEach(() => {});

  it('can get RouterLinks from template', () => {
    expect(links.length).toBe(4, 'should have 4 links');
    expect(links[0].linkParams).toEqual(
      ['/admin'],
      '1st link should go to Admin'
    );
    expect(links[1].linkParams).toEqual(['/login'], '2nd link should go to Login');
    expect(links[2].linkParams).toEqual(['/products'], '3rd link should go to Products');
    expect(links[3].linkParams).toEqual(['/cart'], '4th link should go to Cart');

  });

  it('can click Admin link in template', () => {
    const adminLinkDe = linkDes[0],
      adminLink = links[0];

    expect(adminLink.navigatedTo).toBeNull(
      'link should not have navigated yet'
    );

    adminLinkDe.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(adminLink.navigatedTo).toEqual(['/admin']);
  });

  it('can click Login link in template', () => {
    const loginLinkDe = linkDes[1],
      loginLink = links[1];

    expect(loginLink.navigatedTo).toBeNull(
      'link should not have navigated yet'
    );

    loginLinkDe.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(loginLink.navigatedTo).toEqual(['/login']);
  });

  it('can click Products link in template', () => {
    const productLinkDe = linkDes[2],
      productLink = links[2];

    expect(productLink.navigatedTo).toBeNull(
      'link should not have navigated yet'
    );

    productLinkDe.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(productLink.navigatedTo).toEqual(['/products']);
  });

  it('can click Cart link in template', () => {
    const cartLinkDe = linkDes[3],
      cartLink = links[3];

    expect(cartLink.navigatedTo).toBeNull(
      'link should not have navigated yet'
    );

    cartLinkDe.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(cartLink.navigatedTo).toEqual(['/cart']);
  });
});
