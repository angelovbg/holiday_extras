import { UserRouter } from '../routers';

export class Context {
    public constructor() {

    };

    get userRouter(): UserRouter {
        return new UserRouter();
    }
}