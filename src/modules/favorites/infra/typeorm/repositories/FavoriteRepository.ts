import { DeleteResult, getRepository, Repository } from 'typeorm';

import IFavoritesRepository from '@modules/favorites/repositories/IFavoritesRepository';

import Favorite from '../entities/Favorite';
import IFindFavoriteByProductIdDTO from '@modules/favorites/dtos/IFindFavoriteByProductIdDTO';
import ICreateFavoriteDTO from '@modules/favorites/dtos/ICreateFavoriteDTO';
import IDeleteFavoriteByIdDTO from '@modules/favorites/dtos/IDeleteFavoriteByIdDTO';
import Product from '@modules/products/infra/typeorm/entities/Product';
import AppError from '@shared/errors/AppError';

class FavoritesRepository implements IFavoritesRepository {
  private ormRepository: Repository<Favorite>;
  private productRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Favorite);
    this.productRepository = getRepository(Product);
  }
    public async create({
      product
    }: ICreateFavoriteDTO): Promise<Favorite> {
      const productFavorite = this.ormRepository.create({
        product
      });

      await this.ormRepository.save(productFavorite);

      return productFavorite;
    }

    public async index(): Promise<Favorite[] | undefined> {
      const favorites = await this.ormRepository.find();


      return favorites;
    }

    public async delete({id}: IDeleteFavoriteByIdDTO): Promise<DeleteResult> {
      const favorite = await this.findByProductId({id});
      if(!favorite){
        throw new AppError('Favorite not found!');
      }
      const deletedFavorite = await this.ormRepository.delete(favorite?.id);

      return deletedFavorite;
    }

    public async findByProductId({id}: IFindFavoriteByProductIdDTO): Promise<Favorite | undefined> {
      const product = await this.productRepository.findOne(id);
      if(!product){
        throw new AppError('Product not find');
      }
      const checkProduct = await this.ormRepository.findOne({
        where: {
          product
        }
      });
      return checkProduct;
    }
  }

  export default FavoritesRepository;
