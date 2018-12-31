import { ApiConstants } from '../constants';
import { ResponseSender } from './';

export class DeleteUserService implements IExecutable {
    private users: IUsers;
    private responseSender: IResponseSender;

    public constructor(users: IUsers, responseSender: IResponseSender) {
        this.users = users;
        this.responseSender = responseSender;
    }

    /**
     * Delete user by id.
     * @param req - Request data.
     * @param res - Response data.
     */
    public execute(req: IRequest, res: IResponse): void {
        const userId = req.params.id;

        this.users.delete(userId)
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