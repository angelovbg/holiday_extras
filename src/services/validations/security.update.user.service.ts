import { Request, Response } from 'express';
import { ApiConstants } from '../../constants';
import { UpdateUserService, ResponseSender } from '../';
import { Validator } from '../../validators';

export class SecurityUpdateUserService {
    private updateUserService: UpdateUserService;
    private responseSender: ResponseSender;
    private validator: Validator;

    public constructor(responseSender: ResponseSender, updateUserService: UpdateUserService, validator: Validator) {
        this.responseSender = responseSender;
        this.updateUserService = updateUserService;
        this.validator = validator;
    }

    public execute(req: Request, res: Response): void {
        if (!req.body.hasOwnProperty('email')) {
            this.responseSender.setupErrorData(ApiConstants.STATUS_INVALID_REQUEST, 'Invalid request', 'Missing email property.', 1100);
            return this.responseSender.sendErrorResponse(res);
        }

        if (!this.validator.isValidEmail(req.body.email)) {
            this.responseSender.setupErrorData(ApiConstants.STATUS_INVALID_REQUEST, 'Invalid request', 'Incorrect email format.', 1103);
            return this.responseSender.sendErrorResponse(res);
        }
        if (!this.validator.isValidEmailLength(req.body.email)) {
            this.responseSender.setupErrorData(ApiConstants.STATUS_INVALID_REQUEST, 'Invalid request', 'Email length must be greater then ' +
                this.validator.MINIMUM_EMAIL_LENGTH + ' symbols and less then ' + this.validator.MAXIMUM_EMAIL_LENGTH + ' symbols.', 1104);

            return this.responseSender.sendErrorResponse(res);
        }

        if (!req.body.hasOwnProperty('given_name')) {
            this.responseSender.setupErrorData(ApiConstants.STATUS_INVALID_REQUEST, 'Invalid request', 'Missing given_name property.', 1101);
            return this.responseSender.sendErrorResponse(res);
        }

        if (!this.validator.isValidName(req.body.given_name)) {
            this.responseSender.setupErrorData(ApiConstants.STATUS_INVALID_REQUEST, 'Invalid request', 'Incorrect given_name format.', 1105);
            return this.responseSender.sendErrorResponse(res);
        }

        if (!this.validator.isValidNameLength(req.body.given_name)) {
            this.responseSender.setupErrorData(ApiConstants.STATUS_INVALID_REQUEST, 'Invalid request', 'given_name length must be greater then ' +
                this.validator.MINIMUM_NAME_LENGTH + ' symbols and less then ' + this.validator.MAXIMUM_NAME_LENGTH + ' symbols.', 1106);

            return this.responseSender.sendErrorResponse(res);
        }

        if (!req.body.hasOwnProperty('family_name')) {
            this.responseSender.setupErrorData(ApiConstants.STATUS_INVALID_REQUEST, 'Invalid request', 'Missing family_name property.', 1102);
            return this.responseSender.sendErrorResponse(res);
        }

        if (!this.validator.isValidName(req.body.family_name)) {
            this.responseSender.setupErrorData(ApiConstants.STATUS_INVALID_REQUEST, 'Invalid request', 'Incorrect family_name format.', 1107);
            return this.responseSender.sendErrorResponse(res);
        }

        if (!this.validator.isValidNameLength(req.body.family_name)) {
            this.responseSender.setupErrorData(ApiConstants.STATUS_INVALID_REQUEST, 'Invalid request', 'family_name length must be greater then ' +
                this.validator.MINIMUM_NAME_LENGTH + ' symbols and less then ' + this.validator.MAXIMUM_NAME_LENGTH + ' symbols.', 1108);

            return this.responseSender.sendErrorResponse(res);
        }

        this.updateUserService.execute(req, res);
    }
}