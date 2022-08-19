import Address from './address'

export default class Customer {
  private _id: string
  private _name: string
  private _address!: Address
  private _active: boolean = true

  constructor(id: string, name: string) {
    this._id = id
    this._name = name
  }

  get name(): string {
    return this._name
  }

  validate() {
    if (this._id.length === 0) {
      throw new Error('Id is Required')
    }
    if (this._name.length === 0) {
      throw new Error('Name is Required')
    }
  }

  changeName(name: string) {
    this._name = name
    this.validate()
  }

  activate() {
    if (this._address === undefined)
      throw new Error('Address is mandatory to activate a customer')
    this._active = true
  }

  deactivate() {
    this._active = false
  }

  set Address(address: Address) {
    this._address = address
  }
}
//uma entidade por padrao ela sempre vai ter que se auto validar
