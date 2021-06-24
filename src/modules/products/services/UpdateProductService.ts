import { inject, injectable } from 'tsyringe';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import Product from '../infra/typeorm/entities/Product';

interface IFindProducts {
    id: string;
}

interface IRequest {
    image: string;
    name: string;
    price: number;
    quantity: number;
    available: true;
    favorite: false;
}

@injectable()
class UpdateProductService {
    constructor(
        @inject('ProductsRepository')
        private productsRepository: IProductsRepository,
    ) {}

    public async execute({id}: IFindProducts, {image, name, price, quantity, available, favorite}: IRequest): Promise<Product | undefined> {

        const updateProduct = await this.productsRepository.update({id}, {image, name, price, quantity, available,favorite});

        return updateProduct;
    }
}

export default UpdateProductService;
