import { inject, injectable } from 'tsyringe';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import Product from '../infra/typeorm/entities/Product';

interface IRequest {
    id: string;
}

@injectable()
class FindOneByIdProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({id}: IRequest): Promise<Product | undefined> {
    const product = await this.productsRepository.findOneById({id});

    return product;
  }
}

export default FindOneByIdProductService;
