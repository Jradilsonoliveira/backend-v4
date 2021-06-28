import { Between, getRepository, Repository } from 'typeorm';

import IOrdersRepository from '@modules/orders/repositories/IOrdersRepository';
import ICreateOrderDTO from '@modules/orders/dtos/ICreateOrderDTO';
import Order from '../entities/Order';

class OrdersRepository implements IOrdersRepository {
  private ormRepository: Repository<Order>;

  constructor() {
    this.ormRepository = getRepository(Order);
  }

  public async create({ customer, products }: ICreateOrderDTO): Promise<Order> {
    // TODO
    const order = this.ormRepository.create({
      customer,
      order_products: products,
    });

    await this.ormRepository.save(order);

    return order;
  }

  public async findById(id: string): Promise<Order | undefined> {
    // TODO
    const order = await this.ormRepository.findOne(id);

    return order;
  }

  public async findByDate(date: string): Promise<Order[] | undefined> {
    // TODO
    const order = await this.ormRepository.find({
      where: {
        created_at: Between(
          new Date(`${date} 00:00:00`).toISOString(),
          new Date(`${date} 23:59:59`).toISOString(),
        )
      }
    });

    return order;
  }


  public async index(): Promise<Order[] | undefined> {
    const orders = await this.ormRepository.find();

    return orders;
  }
}

export default OrdersRepository;
