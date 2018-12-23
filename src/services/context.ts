import { UserRouter } from '../routers';
import { CreateUserService, GetAllUsersService, GetUserService, UpdateUserService, DeleteUserService } from './';

export class Context {
    public constructor() {

    };

    get userRouter(): UserRouter {
        return new UserRouter(this.createUserService, this.getAllUsersService, this.getUserService, this.updateUserService, this.deleteUserService);
    }

    get createUserService(): CreateUserService {
        return new CreateUserService();
    }

    get getAllUsersService(): GetAllUsersService {
        return new GetAllUsersService();
    }

    get getUserService(): GetUserService {
        return new GetUserService();
    }

    get updateUserService(): UpdateUserService {
        return new UpdateUserService();
    }

    get deleteUserService(): DeleteUserService {
        return new DeleteUserService();
    }
}