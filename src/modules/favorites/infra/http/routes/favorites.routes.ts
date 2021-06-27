import { Router } from 'express';

import ProductsController from '../../../../products/infra/http/controller/ProductsController';

const favoritesRouter = Router();
const productsController = new ProductsController();

favoritesRouter.get('/', productsController.listFavorite);
favoritesRouter.get('/:id', productsController.findFavoriteById);

export default favoritesRouter;


