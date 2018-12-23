import { UserRouter } from '../routers';
import { CreateUserService, GetAllUsersService, GetUserService, UpdateUserService, DeleteUserService } from './';
import { Users } from '../models';

export class Context {
    public constructor() {

    }

    // routers
    get userRouter(): UserRouter {
        return new UserRouter(this.createUserService, this.getAllUsersService, this.getUserService, this.updateUserService, this.deleteUserService);
    }

    // services
    get createUserService(): CreateUserService {
        return new CreateUserService(this.users);
    }

    get getAllUsersService(): GetAllUsersService {
        return new GetAllUsersService(this.users);
    }

    get getUserService(): GetUserService {
        return new GetUserService(this.users);
    }

    get updateUserService(): UpdateUserService {
        return new UpdateUserService(this.users);
    }

    get deleteUserService(): DeleteUserService {
        return new DeleteUserService(this.users);
    }

    // models
    get users(): Users {
        return new Users();
    }
}