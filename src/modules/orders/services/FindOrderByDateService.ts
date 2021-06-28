import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import Order from "../infra/typeorm/entities/Order";

import IOrdersRepository from '../repositories/IOrdersRepository';

interface IRequest {
  date: string;
}

@injectable()
class FindOrderByDateService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
  ) {}

  public async execute({date}: IRequest): Promise<Order[] | undefined> {
    const order = await this.ordersRepository.findByDate(date);

    if(!order){
      throw new AppError('Order does not exist.');
    }
    return order;
  }
}

export default FindOrderByDateService;
