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
    /**
     *
     * @returns {UserRouter}
     */
    get userRouter(): UserRouter {
        return new UserRouter(this.securityCreateUserService, this.getAllUsersService, this.securityGetUserService, this.securityUpdateUserService, this.securityDeleteUserService);
    }

    // services
    /**
     *
     * @returns {CreateUserService}
     */
    get createUserService(): IExecutable {
        return new CreateUserService(this.users, this.responseSender);
    }

    /**
     *
     * @returns {GetAllUsersService}
     */
    get getAllUsersService(): IExecutable {
        return new GetAllUsersService(this.users, this.responseSender);
    }

    /**
     *
     * @returns {GetUserService}
     */
    get getUserService(): IExecutable {
        return new GetUserService(this.users, this.responseSender);
    }

    /**
     *
     * @returns {UpdateUserService}
     */
    get updateUserService(): IExecutable {
        return new UpdateUserService(this.users, this.responseSender);
    }

    /**
     *
     * @returns {DeleteUserService}
     */
    get deleteUserService(): IExecutable {
        return new DeleteUserService(this.users, this.responseSender);
    }

    /**
     *
     * @returns {ResponseSender}
     */
    get responseSender(): IResponseSender {
        return new ResponseSender();
    }

    // security service
    /**
     *
     * @returns {SecurityCreateUserService}
     */
    get securityCreateUserService(): IExecutable {
        return new SecurityCreateUserService(this.users, this.responseSender, this.createUserService, this.validator);
    }

    /**
     *
     * @returns {SecurityUpdateUserService}
     */
    get securityUpdateUserService(): IExecutable {
        return new SecurityUpdateUserService(this.users, this.responseSender, this.updateUserService, this.validator);
    }

    /**
     *
     * @returns {SecurityDeleteUserService}
     */
    get securityDeleteUserService(): IExecutable {
        return new SecurityDeleteUserService(this.deleteUserService, this.responseSender);
    }

    /**
     *
     * @returns {SecurityGetUserService}
     */
    get securityGetUserService(): IExecutable {
        return new SecurityGetUserService(this.getUserService, this.responseSender);
    }

    // models
    /**
     *
     * @returns {Users}
     */
    get users(): IUsers {
        return new Users(this.database, this.validator, this.responseSender);
    }

    /**
     *
     * @returns {IDatabase}
     */
    get database(): IDatabase {
        return this._database;
    }

    /**
     *
     * @param value
     */
    set database(value: IDatabase) {
        this._database = value;
    }

    // validators
    /**
     *
     * @returns {Validator}
     */
    get validator(): Validator {
        return new Validator();
    }
}