import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateUsersService';

class UsersController {
    public async create(request: Request, response: Response): Promise<Response> {
        const { name, email, password } = request.body;

        const userService = container.resolve(CreateUserService);

        const user = await userService.execute({
            name,
            email,
            password,
        });

        const userWP = {
            id: user.id,
            name: user.name,
            email: user.email,
            created_at: user.created_at,
            updated_at: user.updated_at,
        };

        return response.json(userWP);
    }
}

export default new UsersController();