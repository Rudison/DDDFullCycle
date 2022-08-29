import Address from './domain/customer/value-object/address'
import Customer from './domain/customer/entity/customer'
import Order from './domain/checkout/entity/order'
import OrderItem from './domain/checkout/entity/order_item'

let customer = new Customer('123', 'Rudison')
const address = new Address('Rua 50', 2, '78140-340', 'Mato Grosso')
customer.Address = address
customer.activate()

//relação de entidade
const item1 = new OrderItem('001', 'ITEM 1', 100, 'p1', 2)
const item2 = new OrderItem('002', 'ITEM 2', 200, 'p2', 2)
const order = new Order('1', '123', [item1, item2])
