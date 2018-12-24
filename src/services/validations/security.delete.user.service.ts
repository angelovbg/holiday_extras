import { Request, Response } from 'express';
import { ApiConstants } from '../../constants';
import { DeleteUserService, ResponseSender } from '../';

export class SecurityDeleteUserService {
    private deleteUserService: DeleteUserService;
    private responseSender: ResponseSender;

    public constructor(deleteUserService: DeleteUserService, responseSender: ResponseSender) {
        this.deleteUserService = deleteUserService;
        this.responseSender = responseSender;
    }

    public execute(req: Request, res: Response): void {
        if (!req.params.hasOwnProperty('id')) {
            this.responseSender.setupErrorData(ApiConstants.STATUS_INVALID_REQUEST, ApiConstants.NAME_INVALID_REQUEST, ApiConstants.MESSAGE_MISSING_ID_QUERY, ApiConstants.ERROR_CODE_DELETE_USER_INVALID_MISSING_ID_QUERY);
            return this.responseSender.sendErrorResponse(res);
        }

        this.deleteUserService.execute(req, res);
    }
}