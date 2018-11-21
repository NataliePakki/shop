import { Component, OnInit, Injector, Inject, Optional } from '@angular/core';
import { ConstantsService, CONSTANTS, Generator, LocalStorageService, Item, ConfigOptionsService } from '@core/services';
@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  constants: ConstantsService;
  items: Item[];
  newItem: Item = new Item('', '');

  constructor(private injector: Injector, @Inject(Generator) private randonNumber: string,
            @Optional() private localStorage: LocalStorageService, private configService: ConfigOptionsService) {
    this.constants = this.injector.get(CONSTANTS);
  }

  ngOnInit() {
    this.init();
  }

  add() {
    this.items.push(new Item(this.newItem.key, this.newItem.value));
    this.localStorage && this.localStorage.setItem(this.newItem.key, this.newItem.value);
  }

  remove(key: string) {
    this.items = this.items.filter(it => it.key !== key);
    this.localStorage && this.localStorage.removeItem(key);
  }

  onClear() {
  }

  init() {
    this.items = this.localStorage ? this.localStorage.getAll() : [];
  }

}
