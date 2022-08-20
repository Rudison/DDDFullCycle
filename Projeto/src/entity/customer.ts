import Address from './address'

export default class Customer {
  private _id: string
  private _name: string
  private _address!: Address
  private _active: boolean = true
  private _rewardPoins: number = 0

  constructor(id: string, name: string) {
    this._id = id
    this._name = name
    this.validate()
  }

  get name(): string {
    return this._name
  }

  get id(): string {
    return this._id
  }

  get rewardPoins(): number {
    return this._rewardPoins
  }

  validate(): boolean {
    if (this._id.length === 0) {
      throw new Error('Id is required')
    }
    if (this._name.length === 0) {
      throw new Error('Name is required')
    }
    return true
  }

  changeName(name: string) {
    this._name = name
    this.validate()
  }

  isActive() {
    return this._active
  }

  activate() {
    if (this._address === undefined) {
      throw new Error('Address is mandatory to activate a customer')
    }
    this._active = true
  }

  deactivate() {
    this._active = false
  }

  addRewardPoins(points: number): void {
    this._rewardPoins += points
  }

  set Address(address: Address) {
    this._address = address
  }
}
//uma entidade por padrao ela sempre vai ter que se auto validar
