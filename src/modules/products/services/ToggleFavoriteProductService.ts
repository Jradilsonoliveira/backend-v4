import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Product from '../infra/typeorm/entities/Product';
import IProductsRepository from '../repositories/IProductsRepository';
import IFavoritesRepository from '../../favorites/repositories/IFavoritesRepository';

interface IRequest {
  id: string;
}

@injectable()
class ToggleFavoriteProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('FavoritesRepository')
    private favoritesRepository: IFavoritesRepository
  ) {}

  public async execute({id}: IRequest): Promise<Product> {
    const checkProduct = await this.productsRepository.findOneById({id});

    if (!checkProduct) {
      throw new AppError('Can not find product.');
    }

    const existsFavorite = await this.favoritesRepository.findByProductId({id: checkProduct.id})

    if(existsFavorite){
      await this.favoritesRepository.delete({id: checkProduct.id })
    }else{
      await this.favoritesRepository.create({product: checkProduct});
    }
    return checkProduct;
  }
}

export default ToggleFavoriteProductService;
