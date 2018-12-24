import { Request, Response, Router } from 'express';
import BaseRouter from './base.router';

export class UserRouter extends BaseRouter {
    private _router: Router;
    private securityCreateUserService: IExecutable;
    private getAllUsersService: IExecutable;
    private securityGetUserService: IExecutable;
    private securityUpdateUserService: IExecutable;
    private securityDeleteUserService: IExecutable;

    public constructor(securityCreateUserService: IExecutable, getAllUsersService: IExecutable, securityGetUserService: IExecutable,
                       securityUpdateUserService: IExecutable, securityDeleteUserService: IExecutable) {
        super();

        this._router = Router();
        this.routes();

        this.securityCreateUserService = securityCreateUserService;
        this.getAllUsersService = getAllUsersService;
        this.securityGetUserService = securityGetUserService;
        this.securityUpdateUserService = securityUpdateUserService;
        this.securityDeleteUserService = securityDeleteUserService;
    }

    get router(): Router {
        return this._router;
    }

    public routes(): void {
        this.router.get('/', (req: Request, res: Response, next: any) => {
            super.checkAccessRoute(req, res)
                .then(() => {
                    next();
                })
                .catch((err: any) => {

                });
        },
        (req: Request, res: Response) => {
            this.getAllUsersService.execute(req, res);
        });

        this.router.get('/:id', (req: Request, res: Response, next: any) => {
            super.checkAccessRoute(req, res)
                .then(() => {
                    next();
                })
                .catch((err: any) => {

                });
        },
        (req: Request, res: Response) => {
            this.securityGetUserService.execute(req, res);
        });

        this.router.post('/', (req: Request, res: Response, next: any) => {
            super.checkAccessRoute(req, res)
                .then(() => {
                    next();
                })
                .catch((err: any) => {

                });
        },
        (req: Request, res: Response) => {
            this.securityCreateUserService.execute(req, res);
        });

        this.router.put('/:id', (req: Request, res: Response, next: any) => {
            super.checkAccessRoute(req, res)
                .then(() => {
                    next();
                })
                .catch((err: any) => {

                });
        },
        (req: Request, res: Response) => {
            this.securityUpdateUserService.execute(req, res);
        });

        this.router.delete('/:id', (req: Request, res: Response, next: any) => {
            super.checkAccessRoute(req, res)
                .then(() => {
                    next();
                })
                .catch((err: any) => {

                });
        },
        (req: Request, res: Response) => {
            this.securityDeleteUserService.execute(req, res);
        });
    }
}