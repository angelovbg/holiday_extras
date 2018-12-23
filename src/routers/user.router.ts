import { Request, Response, Router } from 'express';

export class UserRouter {
    private _router: Router;

    public constructor() {
        this._router = Router();
        this.routes();
    }

    get router(): Router {
        return this._router;
    }

    public routes(): void {
        this.router.get('/', (req: Request, res: Response) => {

        });
    }
}