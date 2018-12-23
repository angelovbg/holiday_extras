import { UserRouter } from '../routers';
import { CreateUserService, GetAllUsersService, GetUserService, UpdateUserService, DeleteUserService, ResponseSender } from './';
import { PostgresDb, Users } from '../models';

export class Context {
    private _database: PostgresDb;

    public constructor() {
        this.database = PostgresDb.Instance();
    }

    // routers
    get userRouter(): UserRouter {
        return new UserRouter(this.createUserService, this.getAllUsersService, this.getUserService, this.updateUserService, this.deleteUserService);
    }

    // services
    get createUserService(): CreateUserService {
        return new CreateUserService(this.users, this.responseSender);
    }

    get getAllUsersService(): GetAllUsersService {
        return new GetAllUsersService(this.users, this.responseSender);
    }

    get getUserService(): GetUserService {
        return new GetUserService(this.users, this.responseSender);
    }

    get updateUserService(): UpdateUserService {
        return new UpdateUserService(this.users, this.responseSender);
    }

    get deleteUserService(): DeleteUserService {
        return new DeleteUserService(this.users, this.responseSender);
    }

    get responseSender(): ResponseSender {
        return new ResponseSender();
    }

    // models
    get users(): Users {
        return new Users(this.database, this.responseSender);
    }

    get database(): PostgresDb {
        return this._database;
    }

    set database(value: PostgresDb) {
        this._database = value;
    }
}