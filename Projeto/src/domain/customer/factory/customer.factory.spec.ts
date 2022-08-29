import Address from '../value-object/address'
import CustomerFactory from './customer.factory'

describe('Customer factory unity test', () => {
  it('Should create a customer', () => {
    let customer = CustomerFactory.create('John')

    expect(customer.id).toBeDefined()
    expect(customer.name).toBe('John')
    expect(customer.Address).toBeUndefined()
  })

  it('Should create a customer with an address', () => {
    const address = new Address('Street 1', 1, 'Zipcode 1', 'City 1')
    let customer = CustomerFactory.createWithAddress('John', address)

    expect(customer.id).toBeDefined()
    expect(customer.name).toBeDefined()
    expect(customer.id).toBeDefined()
  })
})
