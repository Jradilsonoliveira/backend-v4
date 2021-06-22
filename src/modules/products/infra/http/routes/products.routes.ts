import { Router } from 'express';

import ProductsController from '../controller/ProductsController';

const productsRouter = Router();
const productsController = new ProductsController();

productsRouter.post('/', productsController.create);
productsRouter.get('/', productsController.index);
productsRouter.delete('/:id', productsController.delete);
productsRouter.put('/:id', productsController.update);
productsRouter.get('/:id', productsController.findOneById);

export default productsRouter;
