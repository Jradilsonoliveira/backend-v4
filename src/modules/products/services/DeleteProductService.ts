import { inject, injectable } from 'tsyringe';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import Product from '../infra/typeorm/entities/Product';

interface IRequest {
    id: string;
}

@injectable()
class DeleteProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({id}: IRequest): Promise<Product | undefined> {
    const product = await this.productsRepository.delete({id});

    return product;
  }
}

export default DeleteProductService;
