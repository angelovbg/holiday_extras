import { UserRouter } from '../routers';
import { CreateUserService, GetAllUsersService, GetUserService, UpdateUserService, DeleteUserService, ResponseSender,
        SecurityCreateUserService, SecurityDeleteUserService, SecurityUpdateUserService, SecurityGetUserService } from './';
import { PostgresDb, Users } from '../models';
import { Validator } from '../validators';

export class Context {
    private _database: PostgresDb;

    public constructor() {
        this.database = PostgresDb.Instance();
    }

    // routers
    get userRouter(): UserRouter {
        return new UserRouter(this.securityCreateUserService, this.getAllUsersService, this.securityGetUserService, this.securityUpdateUserService, this.securityDeleteUserService);
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

    // security service
    get securityCreateUserService(): SecurityCreateUserService {
        return new SecurityCreateUserService(this.users, this.responseSender, this.createUserService, this.validator);
    }

    get securityUpdateUserService(): SecurityUpdateUserService {
        return new SecurityUpdateUserService(this.users, this.responseSender, this.updateUserService, this.validator);
    }

    get securityDeleteUserService(): SecurityDeleteUserService {
        return new SecurityDeleteUserService(this.deleteUserService, this.responseSender);
    }

    get securityGetUserService(): SecurityGetUserService {
        return new SecurityGetUserService(this.getUserService, this.responseSender);
    }

    // models
    get users(): Users {
        return new Users(this.database, this.validator, this.responseSender);
    }

    get database(): PostgresDb {
        return this._database;
    }

    set database(value: PostgresDb) {
        this._database = value;
    }

    // validators
    get validator(): Validator {
        return new Validator();
    }
}