import { inject, injectable } from 'tsyringe';

import Favorite from '../../favorites/infra/typeorm/entities/Favorite';
import IFavoritesRepository from '@modules/favorites/repositories/IFavoritesRepository';

@injectable()
class ListFavoriteService {
  constructor(
    @inject('FavoritesRepository')
    private favoritesRepository: IFavoritesRepository,
  ) {}

  public async execute(): Promise<Favorite[] | undefined> {
    const favorites = await this.favoritesRepository.index();

    return favorites;
  }
}

export default ListFavoriteService;
