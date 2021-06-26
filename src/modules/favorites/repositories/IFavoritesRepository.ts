import Favorite from '../infra/typeorm/entities/Favorite';

import ICreateFavoriteDTO from '../dtos/ICreateFavoriteDTO';
import IFindFavoriteByProductIdDTO from '../dtos/IFindFavoriteByProductIdDTO';
import IDeleteFavoriteByIdDTO from '../dtos/IDeleteFavoriteByIdDTO';
import { DeleteResult } from 'typeorm';

export default interface IFavoritesRepository {
  create(data: ICreateFavoriteDTO): Promise<Favorite>;
  findByProductId(id: IFindFavoriteByProductIdDTO): Promise<Favorite | undefined>;
  delete(id: IDeleteFavoriteByIdDTO): Promise<DeleteResult>;
  index(): Promise<Favorite[] | undefined>;
}
