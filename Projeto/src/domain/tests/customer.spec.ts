import Address from '../entity/address'
import Customer from '../entity/customer'

describe('Customer unit tests', () => {
  //
  it('should throw error when id is empty', () => {
    expect(() => {
      const customer = new Customer('', 'Rudison')
    }).toThrowError('Id is required')
  })

  it('should throw error when name is empty', () => {
    expect(() => {
      const customer = new Customer('123', '')
    }).toThrowError('Name is required')
  })

  it('should change name', () => {
    //Arrange
    const customer = new Customer('123', 'Marcos')
    //Act
    customer.changeName('Novo Cliente')
    //Assert
    expect(customer.name).toBe('Novo Cliente')
  })

  it('should activate customer', () => {
    const customer = new Customer('123', 'Customer 1')
    const address = new Address('Street 1', 123, '78140340', 'VG')
    customer.Address = address

    customer.activate()

    expect(customer.isActive()).toBe(true)
  })

  it('should throw error when address is undefined when you activate a customer', () => {
    expect(() => {
      const customer = new Customer('123', 'Customer 1')
      customer.activate()
    }).toThrowError('Address is mandatory to activate a customer')
  })

  it('should deactivate customer', () => {
    const customer = new Customer('123', 'Customer 1')

    customer.deactivate()

    expect(customer.isActive()).toBe(false)
  })

  it('should add reward points', () => {
    const customer = new Customer('1', 'Customer 1')

    expect(customer.rewardPoins).toBe(0)

    customer.addRewardPoins(10)
    expect(customer.rewardPoins).toBe(10)

    customer.addRewardPoins(10)
    expect(customer.rewardPoins).toBe(20)
  })
})
