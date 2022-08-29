export default class Address {
  _street: string = ''
  _number: number = 0
  _zipcode: string = ''
  _city: string = ''

  constructor(street: string, number: number, zipcode: string, city: string) {
    this._street = street
    this._number = number
    this._zipcode = zipcode
    this._city = city
    this.validate()
  }

  get street() {
    return this._street
  }
  get number() {
    return this._number
  }
  get zipcode() {
    return this._zipcode
  }
  get city() {
    return this._city
  }

  validate() {
    if (this._street.length === 0) {
      throw new Error('Street is Required')
    }
    if (this._number === 0) {
      throw new Error('Number is Required')
    }
    if (this.zipcode.length === 0) {
      throw new Error('Zip is Required')
    }
    if (this._city.length === 0) {
      throw new Error('City is Required')
    }
  }

  toString() {
    return `${this._street}, ${this._number}, ${this.zipcode}, ${this._city}`
  }
}
