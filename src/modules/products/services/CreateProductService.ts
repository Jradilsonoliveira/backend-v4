import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Product from '../infra/typeorm/entities/Product';
import IProductsRepository from '../repositories/IProductsRepository';

interface IRequest {
  image: string;
  name: string;
  price: number;
  quantity: number;
  avaliable: boolean;
}

@injectable()
class CreateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository
  ) {}

  public async execute({image, name, price, quantity }: IRequest): Promise<Product> {
    const checkProduct = await this.productsRepository.findByName(name);

    if (checkProduct) {
      throw new AppError('Product already registered.');
    }

    const product = await this.productsRepository.create({
      image,
      name,
      price,
      quantity,
      available: true
    });

    return product;
  }
}

export default CreateProductService;
