import { getRepository, Repository, In, SimpleConsoleLogger } from 'typeorm';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';
import IUpdateProductDTO from '@modules/products/dtos/IUpdateProductDTO';
import IUpdateProductsQuantityDTO from '@modules/products/dtos/IUpdateProductsQuantityDTO';
import Product from '../entities/Product';
import AppError from '@shared/errors/AppError';

interface IFindProducts {
  id: string;
}

class ProductsRepository implements IProductsRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  public async create({
    image,
    name,
    price,
    quantity,
    available,
  }: ICreateProductDTO): Promise<Product> {
    const product = this.ormRepository.create({
      image,
      name,
      price,
      quantity,
      available,
    });

    await this.ormRepository.save(product);

    return product;
  }

  public async update({id}: IFindProducts, {image, name, price, quantity, available}: IUpdateProductDTO): Promise<Product | undefined> {
    const updateProduct = await this.ormRepository.update({id}, {image, name, price, quantity, available});

    if (updateProduct.affected === 1) {
      const product = await this.ormRepository.findOne({id});
      return product;
    }

    throw new AppError('Product not find');
  }

  public async delete({id}: IFindProducts): Promise<Product | undefined> {
    const product = await this.ormRepository.findOne(id);

    await this.ormRepository.delete(id);

    return product;
  }

  public async findOneById({id}: IFindProducts): Promise<Product | undefined> {
    const product = await this.ormRepository.findOne(id);



    return product;
  }

  public async index(): Promise<Product[] | undefined> {
    const products = await this.ormRepository.find();

    return products;
  }

  public async findByName(name: string): Promise<Product | undefined> {
    const findProduct = await this.ormRepository.findOne({
      where: {
        name,
      },
    });

    return findProduct;
  }

  public async findAllById(products: IFindProducts[]): Promise<Product[]> {
    const idList = products.map(product => product.id);

    const orderList = await this.ormRepository.find({ id: In(idList) });

    if (idList.length !== orderList.length) {
      throw new AppError('Missing Product');
    }

    return orderList;
  }

  public async updateQuantity(
    products: IUpdateProductsQuantityDTO[],
  ): Promise<Product[]> {
    const productsData = await this.findAllById(products);

    const newProducts = productsData.map(productData => {
      const productFind = products.find(
        product => product.id === productData.id,
      );

      if (!productFind) {
        throw new AppError('Product not find');
      }

      if (productData.quantity < productFind.quantity) {
        throw new AppError('Insufficient product quantity');
      }

      const newProduct = productData;

      newProduct.quantity -= productFind.quantity;

      return newProduct;
    });

    await this.ormRepository.save(newProducts);

    return newProducts;
  }
}

export default ProductsRepository;
