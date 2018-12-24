import { ApiConstants } from '../../constants';

export class SecurityGetUserService implements IExecutable {
    private getUserService: IExecutable;
    private responseSender: IResponseSender;

    public constructor(getUserService: IExecutable, responseSender: IResponseSender) {
        this.getUserService = getUserService;
        this.responseSender = responseSender;
    }

    /**
     *
     * @param req
     * @param res
     */
    public execute(req: IRequest, res: IResponse): void {
        if (!req.params.hasOwnProperty('id')) {
            this.responseSender.setupErrorData(ApiConstants.STATUS_INVALID_REQUEST, ApiConstants.NAME_INVALID_REQUEST, ApiConstants.MESSAGE_MISSING_ID_QUERY, ApiConstants.ERROR_CODE_GET_USER_INVALID_MISSING_ID_QUERY);
            return this.responseSender.sendErrorResponse(res);
        }

        this.getUserService.execute(req, res);
    }
}