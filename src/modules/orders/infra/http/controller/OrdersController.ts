import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateOrderService from '@modules/orders/services/CreateOrderService';
import FindOrderService from '@modules/orders/services/FindOrderService';
import FindAllOrdersService from '@modules/orders/services/FindAllOrdersService';
import FindOrderByDateService from '@modules/orders/services/findOrderByDateService';

export default class OrdersController {
  public async show(request: Request, response: Response): Promise<Response> {
    // TODO
    const { id } = request.params;

    const findOrder = container.resolve(FindOrderService);

    const order = await findOrder.execute({ id });

    return response.json(order);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    // TODO
    const { customer_id, products } = request.body;

    const createOrder = container.resolve(CreateOrderService);

    const order = await createOrder.execute({ customer_id, products });

    return response.json(order);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const date = request.query.date as string;

    if(date){
      console.log(date);
      const searchOrders = container.resolve(FindOrderByDateService);

      const orders = await searchOrders.execute({date});

      return response.json(orders);
    }

    const findAllOrders = container.resolve(FindAllOrdersService);

    const orders = await findAllOrders.execute();

    return response.json(orders);

  }
}
