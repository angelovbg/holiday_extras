import { Request, Response } from 'express';
import { Users } from '../models';
import { ApiConstants } from '../constants';
import { ResponseSender } from './';

export class DeleteUserService {
    private users: Users;
    private responseSender: ResponseSender;

    public constructor(users: Users, responseSender: ResponseSender) {
        this.users = users;
        this.responseSender = responseSender;
    }

    public execute(req: Request, res: Response): void {
        const userId = req.params.id;

        this.users.delete(userId)
            .then(() => {
                this.responseSender.setupValidData(ApiConstants.STATUS_NO_CONTENT, ApiConstants.MESSAGE_NO_CONTENT, '');
                this.responseSender.sendValidResponse(res);
            })
            .catch((err: any) => {
                if (err instanceof ResponseSender) {
                    err.sendErrorResponse(res);
                }
            });
    }
}