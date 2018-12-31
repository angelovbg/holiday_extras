import { ResponseSender } from './';
import { ApiConstants } from '../constants';

export class GetAllUsersService implements IExecutable {
    private users: IUsers;
    private responseSender: IResponseSender;

    public constructor(users: IUsers, responseSender: IResponseSender) {
        this.users = users;
        this.responseSender = responseSender;
    }

    /**
     * Get all users from db.
     * @param req - Request data.
     * @param res - Response data.
     */
    public execute(req: IRequest, res: IResponse): void {
        this.users.getAll()
            .then((users: IUsers[]) => {
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