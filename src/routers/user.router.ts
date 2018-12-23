import { Request, Response, Router } from 'express';
import { CreateUserService, GetAllUsersService, GetUserService, UpdateUserService, DeleteUserService } from '../services';
import BaseRouter from './base.router';

export class UserRouter extends BaseRouter {
    private _router: Router;
    private createUserService: CreateUserService;
    private getAllUsersService: GetAllUsersService;
    private getUserService: GetUserService;
    private updateUserService: UpdateUserService;
    private deleteUserService: DeleteUserService;

    public constructor(createUserService: CreateUserService, getAllUsersService: GetAllUsersService, getUserService: GetUserService, updateUserService: UpdateUserService, deleteUserService: DeleteUserService) {
        super();

        this._router = Router();
        this.routes();

        this.createUserService = createUserService;
        this.getAllUsersService = getAllUsersService;
        this.getUserService = getUserService;
        this.updateUserService = updateUserService;
        this.deleteUserService = deleteUserService;
    }

    get router(): Router {
        return this._router;
    }

    public routes(): void {
        this.router.get('/', (req: Request, res: Response, next: any) => {
            console.log('here');
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
            this.getUserService.execute(req, res);
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
            this.createUserService.execute(req, res);
        });

        this.router.put('/:id', (req: Request, res: Response, next: any) => {
            console.log('here');
            super.checkAccessRoute(req, res)
                .then(() => {
                    console.log('here resolve');
                    next();
                })
                .catch((err: any) => {
                    console.log('here reject');
                });
        },
        (req: Request, res: Response) => {
            this.updateUserService.execute(req, res);
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
            this.deleteUserService.execute(req, res);
        });
    }
}