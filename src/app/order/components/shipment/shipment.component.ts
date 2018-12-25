import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, AbstractControl } from '@angular/forms';

import { Observable, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import { AppState } from '@core/+store';
import * as OrderActions from '@store/orders/orders.actions';
import * as RouterActions from '@store/router';

import { CartService, ProductsService } from '@core/services';
import { Order, OrderState } from '@order/models/order.model';
import { CanComponentDeactivate } from '@core/interfaces/can-component-deactivate.interface';
import { AutoUnsubscribe } from '@core/decorators/auto-unsubscribe.decorator';

@Component({
  templateUrl: './shipment.component.html',
  styleUrls: ['./shipment.component.css']
})
@AutoUnsubscribe()
export class ShipmentComponent implements OnInit, OnDestroy, CanComponentDeactivate {
  order: Order;
  orderForm: FormGroup;
  originalOrder: Order;

  sub: Subscription;

  placeholder = {
    email: 'Email (required)',
    phone: 'Phone',
    firstPhone: 'Phone'
  };
  countries: Array<string> = ['Ukraine', 'Armenia', 'Belarus', 'Hungary', 'Kazakhstan', 'Poland', 'Russia'];
  validationMessages = {};

  get phones(): FormArray {
    return <FormArray>this.orderForm.get('shipmentDate.phones');
  }

  private messages = {
    email: {
      required: 'Please enter your email address.',
      pattern: 'Please enter a valid email address.',
      email: 'Please enter a valid email address.'
    },
    phone: {
      required: 'Please enter your email phone.',
    },
    name: {
      required: 'Please enter your name.',
    },
    street: {
      required: 'Please enter your street.',
    },
    zip: {
      required: 'Please enter your zip.',
    },
    city: {
      required: 'Please enter your city.',
    },
    country: {
      required: 'Please enter your country.',
    }
  };

  constructor(
    private store: Store<AppState>,
    private cartService: CartService,
    private productsService: ProductsService,
    private fb: FormBuilder
    ) { }

  ngOnInit() {
    this.buildForm();
    this.order = this.createNewOrder();
    this.watchValueChanges();
    this.originalOrder = {...this.order};
  }

  ngOnDestroy() {
    if (this.order.state !== OrderState.Submitted) {
      this.cartService.toggleSubmit();
    }
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.order.state !== OrderState.Submitted) {
      const flags = Object.keys(this.originalOrder).map(key => {
        if (this.originalOrder[key] === this.order[key]) {
          return true;
        }
        return false;
      });

      if (flags.every(el => el)) {
        return true;
      }

      return window.confirm('Discard changes?');
    }
    return true;
  }

  onSubmit() {
    this.order = { ...this.order,
      shipmentDate: this.orderForm.value.shipmentDate,
      state: OrderState.Submitted
    };
    this.store.dispatch(new OrderActions.CreateOrder(this.order));
    this.cartService.clear();
  }

  onGoBack() {
    this.cartService.toggleSubmit();
    this.store.dispatch(new RouterActions.Back());
  }

  onBlur(control, name) {
    const emailControl = this.orderForm.get(control);
    this.setValidationMessage(emailControl, name);
  }

  onAddPhone(): void {
    this.phones.push(this.fb.control(['']));
  }

  onDeletePhone(index: number): void {
    this.phones.removeAt(index);
  }

  private buildForm() {
    this.orderForm = this.fb.group({
      shipmentDate: this.fb.group({
        name: ['', [ Validators.required ]],
        addressData: this.fb.group({
          country: ['', [ Validators.required] ],
          city: ['', [ Validators.required] ],
          zip: ['', [ Validators.required] ],
          street: ['', [ Validators.required] ]
        }, [Validators.required]),
        phones: this.fb.array(['']),
        email: ['', [ Validators.required, Validators.email ]]
      }),
      notification: 'email'
    });
  }

  private createNewOrder(): Order {
    const products = [];
    this.cartService.getAll().forEach((item) => {
      this.productsService.get(item.id)
      .then(pr =>  {
          const product = {...pr};
          product.count = item.count;
          products.push(product);
      });
    });

    return new Order(products, this.cartService.getSubtotal());
  }

  private watchValueChanges() {
    this.sub = this.orderForm.get('notification').valueChanges
              .pipe(
                debounceTime(500)
              )
              .subscribe(value => this.setNotification(value));
  }

  private setNotification(notifyVia: string) {
    const controls = new Map();
    controls.set('firstPhoneControl', this.phones.controls[0]);
    controls.set('emailControl', this.orderForm.get('shipmentDate.email'));

    if (notifyVia === 'text') {
      controls.get('firstPhoneControl').setValidators(Validators.required);
      controls.get('emailControl').clearValidators();

      this.placeholder = { ...this.placeholder,
        firstPhone: 'Phone (required)',
        email: 'Email',
      };

      this.validationMessages['email'] = '';
    } else {
      controls
        .get('emailControl')
        .setValidators([
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+'),
          Validators.email
        ]);
      controls.get('firstPhoneControl').clearValidators();

      this.placeholder = { ... this.placeholder,
        firstPhone: 'Phone',
        email: 'Email (required)',
      };
      this.validationMessages['phone'] = '';

    }
    controls.forEach(control => control.updateValueAndValidity());
  }

  private setValidationMessage(c: AbstractControl, controlName: string) {
    this.validationMessages[controlName] = '';

    if ((c.touched || c.dirty) && c.errors) {
      this.validationMessages[controlName] = Object.keys(c.errors)
        .map(key => this.messages[controlName][key])
        .join(' ');
    }
  }
}
