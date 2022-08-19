import Address from './entity/address'
import Customer from './entity/customer'
import Order from './entity/order'
import OrderItem from './entity/order_item'

let customer = new Customer('123', 'Rudison')
const address = new Address('Rua 50', 2, '78140-340', 'Mato Grosso')
customer.Address = address
customer.activate()

//relação de entidade
const item1 = new OrderItem('001', 'ITEM 1', 100)
const item2 = new OrderItem('002', 'ITEM 2', 200)
const order = new Order('1', '123', [item1, item2])
