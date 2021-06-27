import { Request, Response } from 'express';

import { container } from 'tsyringe';
import CreateProductService from '@modules/products/services/CreateProductService';
import CreateToggleFavoriteProductService from '@modules/products/services/ToggleFavoriteProductService';
import FindProductService from '@modules/products/services/FindProductService';
import DeleteProductService from '@modules/products/services/DeleteProductService';
import UpdateProductService from '@modules/products/services/UpdateProductService';
import findOneByIdProductService from '@modules/products/services/FindProductById';
import ListFavoriteService from '@modules/products/services/ListFavoritesService';
import FindFavoriteByIdService from '@modules/products/services/FindFavoriteByIdService';

export default class ProductsController {

  public async index(request: Request, response: Response): Promise<Response> {
    const indexProduct = container.resolve(FindProductService);
    console.log('cheguei index');
    const products = await indexProduct.execute();

    return response.json(products);
  }

  public async listFavorite(request: Request, response: Response): Promise<Response> {
    const listFavorite = container.resolve(ListFavoriteService);
    console.log('cheguei aqui');

    const products = await listFavorite.execute();

    return response.json(products);
  }

  public async findFavoriteById(request: Request, response: Response): Promise<Response> {
    const {id} = request.params;

    const findFavoriteById = container.resolve(FindFavoriteByIdService);

    const favorite = await findFavoriteById.execute({id});

    return response.json(favorite);
  }

  public async findOneById(request: Request, response: Response): Promise<Response> {
    const { id} = request.params;

    const findOneByIdProduct = container.resolve(findOneByIdProductService);

    const product = await findOneByIdProduct.execute({id});

    return response.json(product);
  }


  public async create(request: Request, response: Response): Promise<Response> {
    const {
      image,
      name,
      price,
      quantity,
      avaliable,
    } = request.body;

    const createProduct = container.resolve(CreateProductService);

    const product = await createProduct.execute({
      image,
      name,
      price,
      quantity,
      avaliable,
    });

    return response.json(product);
  }

  public async toggleFavorite(request: Request, response: Response): Promise<Response> {
    const {
      id
    } = request.params;

    const createFavoriteProduct = container.resolve(CreateToggleFavoriteProductService);

    const product = await createFavoriteProduct.execute({
      id
    });

    return response.json(product);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteProduct = container.resolve(DeleteProductService);

    const product = await deleteProduct.execute({id});

    return response.json(product);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const {
      image,
      name,
      price,
      quantity,
      available,
      favorite
    } = request.body;

    const updateProduct = container.resolve(UpdateProductService);

    const product = await updateProduct.execute({id}, {image, name, price, quantity, available, favorite});

    return response.json(product);
  }
}
