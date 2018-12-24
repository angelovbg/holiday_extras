import { ApiConstants } from '../constants';
import { ResponseSender } from './';

export class CreateUserService implements IExecutable {
    private users: IUsers;
    private responseSender: IResponseSender;

    public constructor(users: IUsers, responseSender: IResponseSender) {
        this.users = users;
        this.responseSender = responseSender;
    }

    /**
     *
     * @param req
     * @param res
     */
    public execute(req: IRequest, res: IResponse): void {
        const user = this.users;

        user.email = req.body.email;
        user.given_name = req.body.given_name;
        user.family_name = req.body.family_name;

        user.create()
            .then(() => {
                this.responseSender.setupValidData(ApiConstants.STATUS_CREATED, ApiConstants.MESSAGE_CREATED, '');
                this.responseSender.sendValidResponse(res);
            })
            .catch((err: any) => {
                console.log(err);
                if (err instanceof ResponseSender) {
                    err.sendErrorResponse(res);
                }
            });
    }
}