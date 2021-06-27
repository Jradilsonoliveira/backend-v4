import { inject, injectable } from 'tsyringe';

import IFavoritesRepository from '@modules/favorites/repositories/IFavoritesRepository';
import Favorite from '../../favorites/infra/typeorm/entities/Favorite';

interface IRequest {
    id: string;
}

@injectable()
class FindFavoriteByIdService {
  constructor(
    @inject('FavoritesRepository')
    private favoriteRepository: IFavoritesRepository,
  ) {}

  public async execute({id}: IRequest): Promise<Favorite | undefined> {
    const favorite = await this.favoriteRepository.findOneById({id});

    return favorite;
  }
}

export default FindFavoriteByIdService;
