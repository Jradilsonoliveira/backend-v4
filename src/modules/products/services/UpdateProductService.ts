import { inject, injectable } from 'tsyringe';

import IOrdersRepository from '@modules/orders/repositories/IOrdersRepository';
import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';
import Product from '../infra/typeorm/entities/Product';

interface IFindProducts {
    id: string;
}

interface IRequest {
    image: string;
    name: string;
    price: number;
    quantity: number;
    available: true
}

@injectable()
class UpdateProductService {
    constructor(
        @inject('OrdersRepository')
        private ordersRepository: IOrdersRepository,

        @inject('ProductsRepository')
        private productsRepository: IProductsRepository,

        @inject('CustomersRepository')
        private customersRepository: ICustomersRepository,
    ) {}

    public async execute({id}: IFindProducts, {image, name, price, quantity, available}: IRequest): Promise<Product | undefined> {

        const updateProduct = await this.productsRepository.update({id}, {image, name, price, quantity, available});

        return updateProduct;
    }
}

export default UpdateProductService;
