import Order from '../../../../domain/checkout/entity/order'
import OrderItem from '../../../../domain/checkout/entity/order_item'
import OrderRepositoryInterface from '../../../../domain/checkout/repository/order-repository,interface'
import OrderItemModel from './order-item.model'
import OrderModel from './order.model'

export default class OrderRepository implements OrderRepositoryInterface {
  //
  async create(entity: Order): Promise<void> {
    //
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        include: [{ model: OrderItemModel }],
      }
    )
  }

  async update(entity: Order): Promise<void> {
    console.table(entity.items)

    await OrderModel.update(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items,
      },
      {
        where: {
          id: entity.id,
        },
      }
    )
  }

  async find(id: string): Promise<Order> {
    let orderModel

    try {
      orderModel = await OrderModel.findOne({
        where: { id },
        rejectOnEmpty: true,
      })
    } catch (error) {
      throw new Error('Order not found')
    }

    const Items = orderModel.items.map(
      (items) => new OrderItem(items.id, items.name, items.price, items.product_id, items.quantity)
    )

    orderModel = new Order(id, orderModel.customer_id, Items)

    return orderModel
  }

  async findAll(): Promise<Order[]> {
    //
    const orderModel = await OrderModel.findAll({
      include: [{ model: OrderItemModel }],
    })

    const orders = orderModel.map((orderModels) => {
      //
      const orderItems = orderModels.items.map(
        (items) =>
          new OrderItem(items.id, items.name, items.price, items.product_id, items.quantity)
      )

      return new Order(orderModels.id, orderModels.customer_id, orderItems)
    })

    return orders
  }
}
