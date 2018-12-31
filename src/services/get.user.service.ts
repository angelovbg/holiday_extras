import { ResponseSender } from './';
import { ApiConstants } from '../constants';

export class GetUserService implements IExecutable {
    private users: IUsers;
    private responseSender: IResponseSender;

    public constructor(users: IUsers, responseSender: IResponseSender) {
        this.users = users;
        this.responseSender = responseSender;
    }

    /**
     * Get user by id.
     * @param req - Request data.
     * @param res - Response data.
     */
    public execute(req: IRequest, res: IResponse): void {
        const userId = req.params.id;

        this.users.getById(userId)
            .then((user: IUsers) => {
                this.responseSender.setupValidData(ApiConstants.STATUS_OK, ApiConstants.MESSAGE_OK, user);
                this.responseSender.sendValidResponse(res);
            })
            .catch((err: any) => {
                if (err instanceof ResponseSender) {
                    err.sendErrorResponse(res);
                }
            });
    }
}