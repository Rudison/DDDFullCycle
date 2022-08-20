import Order from '../entity/order'
import OrderItem from '../entity/order_item'

describe('Order unit tests', () => {
  //
  it('should throw error when id is empty', () => {
    expect(() => {
      let order = new Order('', '123', [])
    }).toThrowError('Id is required')
  })

  it('should throw error when customerId is empty', () => {
    expect(() => {
      let order = new Order('123', '', [])
    }).toThrowError('CustomerId is required')
  })

  it('should throw error when customerId is empty', () => {
    expect(() => {
      let order = new Order('123', '123', [])
    }).toThrowError('Items are Required')
  })

  it('should calculate total', () => {
    const item1 = new OrderItem('1', 'Item 1', 30, 'p1', 2)
    const item2 = new OrderItem('2', 'Item 2', 30, 'p2', 2)
    const item3 = new OrderItem('3', 'Item 3', 30, 'p3', 2)

    const order = new Order('1', '1', [item1, item2, item3])

    const total = order.total()

    expect(total).toBe(180)
  })

  it('should throw error if the item quantity is greater than 0', () => {
    expect(() => {
      const item1 = new OrderItem('1', 'Item 1', 30, 'p1', 0)
      const order = new Order('1', '1', [item1])
    }).toThrowError('Quantity must be greater than 0')
  })
})
