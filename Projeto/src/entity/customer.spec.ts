import Customer from './customer'

describe('Customer unit tests', () => {
  //
  it('should throw error when id is empty', () => {
    expect(() => {
      let customer = new Customer('', 'Rudison')
    }).toThrowError('Id is required')
  })

  it('should throw error when name is empty', () => {
    expect(() => {
      let customer = new Customer('123', '')
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
})