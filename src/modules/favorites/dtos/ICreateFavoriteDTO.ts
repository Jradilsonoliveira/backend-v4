import Product from '@modules/products/infra/typeorm/entities/Product';

export default interface ICreateFavoriteDTO {
  product: Product;
}

