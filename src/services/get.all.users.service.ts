import { Request, Response } from 'express';
import { Users } from '../models';
import { ResponseSender } from './';
import { ApiConstants } from '../constants';

export class GetAllUsersService {
    private users: Users;
    private responseSender: ResponseSender;

    public constructor(users: Users, responseSender: ResponseSender) {
        this.users = users;
        this.responseSender = responseSender;
    }

    public execute(req: Request, res: Response): void {
        this.users.getAll()
            .then((users: Users[]) => {
                this.responseSender.setupValidData(ApiConstants.STATUS_OK, ApiConstants.MESSAGE_OK, users);
                this.responseSender.sendValidResponse(res);
            })
            .catch((err: any) => {
                if (err instanceof ResponseSender) {
                    err.sendErrorResponse(res);
                }
            });
    }
}