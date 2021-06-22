import Product from '../infra/typeorm/entities/Product';

import ICreateProductDTO from '../dtos/ICreateProductDTO';
import IUpdateProductDTO from '../dtos/IUpdateProductDTO';
import IUpdateProductsQuantityDTO from '../dtos/IUpdateProductsQuantityDTO';

interface IFindProducts {
  id: string;
}

export default interface IProductsRepository {
  create(data: ICreateProductDTO): Promise<Product>;
  delete(id: IFindProducts): Promise<Product | undefined>;
  index(): Promise<Product[] | undefined>;
  update(id: IFindProducts, data: IUpdateProductDTO): Promise<Product | undefined>;
  findByName(name: string): Promise<Product | undefined>;
  findOneById(id: IFindProducts): Promise<Product | undefined>;
  findAllById(products: IFindProducts[]): Promise<Product[]>;
  updateQuantity(products: IUpdateProductsQuantityDTO[]): Promise<Product[]>;
}
