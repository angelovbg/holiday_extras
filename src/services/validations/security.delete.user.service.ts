import { ApiConstants } from '../../constants';

export class SecurityDeleteUserService implements IExecutable {
    private deleteUserService: IExecutable;
    private responseSender: IResponseSender;

    public constructor(deleteUserService: IExecutable, responseSender: IResponseSender) {
        this.deleteUserService = deleteUserService;
        this.responseSender = responseSender;
    }

    /**
     *
     * @param req
     * @param res
     */
    public execute(req: IRequest, res: IResponse): void {
        if (!req.params.hasOwnProperty('id')) {
            this.responseSender.setupErrorData(ApiConstants.STATUS_INVALID_REQUEST, ApiConstants.NAME_INVALID_REQUEST, ApiConstants.MESSAGE_MISSING_ID_QUERY, ApiConstants.ERROR_CODE_DELETE_USER_INVALID_MISSING_ID_QUERY);
            return this.responseSender.sendErrorResponse(res);
        }

        this.deleteUserService.execute(req, res);
    }
}