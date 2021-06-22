import { inject, injectable } from 'tsyringe';

import IOrdersRepository from '@modules/orders/repositories/IOrdersRepository';
import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';
import Product from '../infra/typeorm/entities/Product';

interface IRequest {
    id: string;
}

@injectable()
class DeleteProductService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,

    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute({id}: IRequest): Promise<Product | undefined> {
    const product = await this.productsRepository.delete({id});
    
    return product;
  }
}

export default DeleteProductService;