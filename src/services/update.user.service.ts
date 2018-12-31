import { ApiConstants } from '../constants';
import { ResponseSender } from './';

export class UpdateUserService implements IExecutable {
    private users: IUsers;
    private responseSender: IResponseSender;

    public constructor(users: IUsers, responseSender: IResponseSender) {
        this.users = users;
        this.responseSender = responseSender;
    }

    /**
     * Update user data by id.
     * @param req - Request data.
     * @param res - Response data.
     */
    public execute(req: IRequest, res: IResponse): void {
        const user: IUsers = this.users;
        const userId: number = req.params.id;

        user.email = req.body.email;
        user.given_name = req.body.given_name;
        user.family_name = req.body.family_name;

        user.update(userId)
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