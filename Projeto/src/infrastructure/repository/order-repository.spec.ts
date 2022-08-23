import { Sequelize } from 'sequelize-typescript'
import Address from '../../domain/entity/address'
import Customer from '../../domain/entity/customer'
import Order from '../../domain/entity/order'
import OrderItem from '../../domain/entity/order_item'
import Product from '../../domain/entity/product'
import CustomerModel from '../db/sequelize/model/customer.model'
import OrderItemModel from '../db/sequelize/model/order-item.model'
import OrderModel from '../db/sequelize/model/order.model'
import ProductModel from '../db/sequelize/model/product.model'
import CustomerRepository from './customer.repository'
import OrderRepository from './order.repository'
import ProductRepository from './product.repository'

describe('Order repository test', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    })

    sequelize.addModels([
      CustomerModel,
      OrderModel,
      OrderItemModel,
      ProductModel,
    ])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should create a new order', async () => {
    //
    const customerRepository = new CustomerRepository()

    const customer = new Customer('1', 'Customer 1')
    const address = new Address('Street 1', 1, 'Zipcode 1', 'City 1')
    customer.changeAddress(address)
    await customerRepository.create(customer)

    const productRepository = new ProductRepository()

    const product = new Product('1', 'Product 1', 100)
    await productRepository.create(product)

    const orderItem = new OrderItem(
      '1',
      product.name,
      product.price,
      product.id,
      2
    )

    const orderRepository = new OrderRepository()

    let order = new Order('1', '1', [orderItem])

    await orderRepository.create(order)

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ['items'],
    })

    expect(orderModel.toJSON()).toStrictEqual({
      id: '1',
      customer_id: '1',
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          order_id: '1',
          product_id: '1',
        },
      ],
    })
  })

  it('should update a order', async () => {
    const customerRepository = new CustomerRepository()
    const customer = new Customer('1', 'Customer 1')
    const address = new Address('Street 1', 1, 'Zipcode 1', 'City 1')
    customer.changeAddress(address)
    await customerRepository.create(customer)

    const productRepository = new ProductRepository()
    const product = new Product('1', 'Product 1', 100)
    await productRepository.create(product)

    const orderItem = new OrderItem(
      '1',
      product.name,
      product.price,
      product.id,
      2
    )

    const order = new Order('1', '1', [orderItem])

    const orderRepository = new OrderRepository()
    await orderRepository.create(order)

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ['items'],
    })

    expect(orderModel.items.length).toBe(1)
    //ate aqui ok

    const orderItem2 = new OrderItem(
      '2',
      product.name,
      product.price,
      product.id,
      2
    )

    order.addItem(orderItem2)

    const sequelize = OrderModel.sequelize

    await sequelize.transaction(async (t) => {
      await OrderItemModel.destroy({
        where: { order_id: order.id },
        transaction: t,
      })
      const items = order.items.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        product_id: item.productId,
        quantity: item.quantity,
        order_id: order.id,
      }))

      await OrderItemModel.bulkCreate(items, { transaction: t })
      await OrderModel.update(
        { total: order.total() },
        { where: { id: order.id }, transaction: t }
      )
    })

    const orderModel2 = await OrderModel.findOne({
      where: { id: order.id },
      include: ['items'],
    })

    expect(orderModel2.items.length).toBe(2)
  })

  it('should find a order', async () => {
    const customerRepository = new CustomerRepository()

    const customer = new Customer('1', 'Customer 1')
    const address = new Address('Street 1', 1, 'Zipcode 1', 'City 1')
    customer.changeAddress(address)
    await customerRepository.create(customer)

    const productRepository = new ProductRepository()

    const product = new Product('1', 'Product 1', 100)

    await productRepository.create(product)

    const orderItem = new OrderItem(
      '1',
      product.name,
      product.price,
      product.id,
      2
    )

    const orderRepository = new OrderRepository()

    let order = new Order('1', '1', [orderItem])

    await orderRepository.create(order)

    const orderResult = await OrderModel.findOne({
      where: { id: order.id },
      include: ['items'],
    })

    expect(orderResult.toJSON()).toMatchObject({
      id: '1',
      customer_id: '1',
      items: [
        {
          id: '1',
          name: 'Product 1',
          price: 200,
          product_id: '1',
          quantity: 2,
        },
      ],
      total: 200,
    })
  })

  it('should find all orders', async () => {
    const customerRepository = new CustomerRepository()
    const productRepository = new ProductRepository()
    const orderRepository = new OrderRepository()

    const customer = new Customer('1', 'Customer 1')
    const address = new Address('Street 1', 1, 'Zipcode 1', 'City 1')
    customer.changeAddress(address)
    await customerRepository.create(customer)

    const customer2 = new Customer('2', 'Customer 2')
    const address2 = new Address('Street 2', 1, 'Zipcode 2', 'City 2')
    customer2.changeAddress(address2)
    await customerRepository.create(customer2)

    const product = new Product('1', 'Product 1', 100)
    await productRepository.create(product)
    const orderItem = new OrderItem(
      '1',
      product.name,
      product.price,
      product.id,
      2
    )

    const product2 = new Product('2', 'Product 2', 200)
    await productRepository.create(product2)
    const orderItem2 = new OrderItem(
      '2',
      product2.name,
      product2.price,
      product2.id,
      2
    )

    const order = new Order('1', '1', [orderItem])
    const order2 = new Order('2', '2', [orderItem2])

    await orderRepository.create(order)
    await orderRepository.create(order2)

    const ordersFounds = await orderRepository.findAll()

    expect(ordersFounds.length).toBe(2)
  })
})
