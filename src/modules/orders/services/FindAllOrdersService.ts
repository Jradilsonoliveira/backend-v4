import { inject, injectable } from "tsyringe";

import Order from '../infra/typeorm/entities/Order';
import IOrdersRepository from '../repositories/IOrdersRepository';

@injectable()
class FindAllOrdersService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
  ) {}

  public async execute(): Promise<Order[] | undefined> {
    const orders = await this.ordersRepository.index();

    return orders;
  }
}

export default FindAllOrdersService;
