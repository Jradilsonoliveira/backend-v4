import { container } from 'tsyringe';

import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';
import CustomersRepository from '@modules/customers/infra/typeorm/repositories/CustomersRepository';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ProductsRepository from '@modules/products/infra/typeorm/repositories/ProductsRepository';

import IOrdersRepository from '@modules/orders/repositories/IOrdersRepository';
import OrdersRepository from '@modules/orders/infra/typeorm/repositories/OrdersRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserTokenRepository from '@modules/users/infra/typeorm/repositories/UserTokenRepository';

import IFavoritesRepository from '@modules/favorites/repositories/IFavoritesRepository';
import FavoritesRepository from '@modules/favorites/infra/typeorm/repositories/FavoriteRepository';

// TODO
container.registerSingleton<IFavoritesRepository>(
  'FavoritesRepository',
  FavoritesRepository,
);

container.registerSingleton<ICustomersRepository>(
    'CustomersRepository',
    CustomersRepository,
);

container.registerSingleton<IProductsRepository>(
    'ProductsRepository',
    ProductsRepository,
);

container.registerSingleton<IOrdersRepository>(
    'OrdersRepository',
    OrdersRepository,
);

container.registerSingleton<IUsersRepository>(
    'UsersRepository',
    UsersRepository
);

container.registerSingleton<IUserTokensRepository>(
    'UserTokensRepository',
    UserTokenRepository
);
