import { Request, Response } from 'express';
import { Users } from '../models';

export class GetUserService {
    private users: Users;

    public constructor(users: Users) {
        this.users = users;
    }

    public execute(req: Request, res: Response): void {
        console.log('get user');
    }
}