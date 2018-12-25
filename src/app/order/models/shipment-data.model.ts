

export class AddressData {
  constructor(public country: string = '', public city: string = '', public zip: string = '', public street: string = '') {}
}
export class ShipmentData {
    constructor(
    public name: string = '',
    public addressData: AddressData = new AddressData(),
    public phones: string[] = [''],
    public email: string = '') {}
}
