import { Request, Response } from 'express';
import { ApiConstants } from '../../constants';
import { GetUserService, ResponseSender } from '../';

export class SecurityGetUserService {
    private getUserService: GetUserService;
    private responseSender: ResponseSender;

    public constructor(getUserService: GetUserService, responseSender: ResponseSender) {
        this.getUserService = getUserService;
        this.responseSender = responseSender;
    }

    public execute(req: Request, res: Response): void {
        if (!req.params.hasOwnProperty('id')) {
            this.responseSender.setupErrorData(ApiConstants.STATUS_INVALID_REQUEST, 'Invalid request', 'Missing id query.', 1300);
            return this.responseSender.sendErrorResponse(res);
        }

        this.getUserService.execute(req, res);
    }
}