import { Request, Response } from 'express';
import { Users } from '../models';
import { ApiConstants } from '../constants';
import { ResponseSender } from './';

export class CreateUserService {
    private users: Users;
    private responseSender: ResponseSender;

    public constructor(users: Users, responseSender: ResponseSender) {
        this.users = users;
        this.responseSender = responseSender;
    }

    public execute(req: Request, res: Response): void {
        const user = this.users;

        user.email = req.body.email;
        user.given_name = req.body.given_name;
        user.family_name = req.body.family_name;

        user.create()
            .then(() => {
                this.responseSender.setupValidData(ApiConstants.STATUS_OK, ApiConstants.MESSAGE_OK, '');
                this.responseSender.sendValidResponse(res);
            })
            .catch((err: any) => {
                if (err instanceof ResponseSender) {
                    err.sendErrorResponse(res);
                }
            });
    }
}