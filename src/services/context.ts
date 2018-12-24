import { UserRouter } from '../routers';
import { CreateUserService, GetAllUsersService, GetUserService, UpdateUserService, DeleteUserService, ResponseSender,
        SecurityCreateUserService, SecurityDeleteUserService, SecurityUpdateUserService, SecurityGetUserService } from './';
import { PostgresDb, Users } from '../models';
import { Validator } from '../validators';

export class Context {
    private _database: IDatabase;

    public constructor() {
        this.database = PostgresDb.Instance();
    }

    // routers
    get userRouter(): UserRouter {
        return new UserRouter(this.securityCreateUserService, this.getAllUsersService, this.securityGetUserService, this.securityUpdateUserService, this.securityDeleteUserService);
    }

    // services
    get createUserService(): IExecutable {
        return new CreateUserService(this.users, this.responseSender);
    }

    get getAllUsersService(): IExecutable {
        return new GetAllUsersService(this.users, this.responseSender);
    }

    get getUserService(): IExecutable {
        return new GetUserService(this.users, this.responseSender);
    }

    get updateUserService(): IExecutable {
        return new UpdateUserService(this.users, this.responseSender);
    }

    get deleteUserService(): IExecutable {
        return new DeleteUserService(this.users, this.responseSender);
    }

    get responseSender(): IResponseSender {
        return new ResponseSender();
    }

    // security service
    get securityCreateUserService(): IExecutable {
        return new SecurityCreateUserService(this.users, this.responseSender, this.createUserService, this.validator);
    }

    get securityUpdateUserService(): IExecutable {
        return new SecurityUpdateUserService(this.users, this.responseSender, this.updateUserService, this.validator);
    }

    get securityDeleteUserService(): IExecutable {
        return new SecurityDeleteUserService(this.deleteUserService, this.responseSender);
    }

    get securityGetUserService(): IExecutable {
        return new SecurityGetUserService(this.getUserService, this.responseSender);
    }

    // models
    get users(): IUsers {
        return new Users(this.database, this.validator, this.responseSender);
    }

    get database(): IDatabase {
        return this._database;
    }

    set database(value: IDatabase) {
        this._database = value;
    }

    // validators
    get validator(): Validator {
        return new Validator();
    }
}