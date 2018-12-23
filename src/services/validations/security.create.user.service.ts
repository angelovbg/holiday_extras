import { Request, Response } from 'express';
import { ApiConstants } from '../../constants';
import { CreateUserService, ResponseSender } from '../';
import { Validator } from '../../validators';

export class SecurityCreateUserService {
    private createUserService: CreateUserService;
    private responseSender: ResponseSender;
    private validator: Validator;

    public constructor(responseSender: ResponseSender, createUserService: CreateUserService, validator: Validator) {
        this.responseSender = responseSender;
        this.createUserService = createUserService;
        this.validator = validator;
    }

    public execute(req: Request, res: Response): void {
        if (!req.body.hasOwnProperty('email')) {
            this.responseSender.setupErrorData(ApiConstants.STATUS_INVALID_REQUEST, 'Invalid request', 'Missing email property.', 1000);
            return this.responseSender.sendErrorResponse(res);
        }

        if (!this.validator.isValidEmail(req.body.email)) {
            this.responseSender.setupErrorData(ApiConstants.STATUS_INVALID_REQUEST, 'Invalid request', 'Incorrect email format.', 1003);
            return this.responseSender.sendErrorResponse(res);
        }
        if (!this.validator.isValidEmailLength(req.body.email)) {
            this.responseSender.setupErrorData(ApiConstants.STATUS_INVALID_REQUEST, 'Invalid request', 'Email length must be greater then ' +
                this.validator.MINIMUM_EMAIL_LENGTH + ' symbols and less then ' + this.validator.MAXIMUM_EMAIL_LENGTH + ' symbols.', 1004);

            return this.responseSender.sendErrorResponse(res);
        }

        if (!req.body.hasOwnProperty('given_name')) {
            this.responseSender.setupErrorData(ApiConstants.STATUS_INVALID_REQUEST, 'Invalid request', 'Missing given_name property.', 1001);
            return this.responseSender.sendErrorResponse(res);
        }

        if (!this.validator.isValidName(req.body.given_name)) {
            this.responseSender.setupErrorData(ApiConstants.STATUS_INVALID_REQUEST, 'Invalid request', 'Incorrect given_name format.', 1005);
            return this.responseSender.sendErrorResponse(res);
        }

        if (!this.validator.isValidNameLength(req.body.given_name)) {
            this.responseSender.setupErrorData(ApiConstants.STATUS_INVALID_REQUEST, 'Invalid request', 'given_name length must be greater then ' +
                this.validator.MINIMUM_NAME_LENGTH + ' symbols and less then ' + this.validator.MAXIMUM_NAME_LENGTH + ' symbols.', 1006);

            return this.responseSender.sendErrorResponse(res);
        }

        if (!req.body.hasOwnProperty('family_name')) {
            this.responseSender.setupErrorData(ApiConstants.STATUS_INVALID_REQUEST, 'Invalid request', 'Missing family_name property.', 1002);
            return this.responseSender.sendErrorResponse(res);
        }

        if (!this.validator.isValidName(req.body.family_name)) {
            this.responseSender.setupErrorData(ApiConstants.STATUS_INVALID_REQUEST, 'Invalid request', 'Incorrect family_name format.', 1007);
            return this.responseSender.sendErrorResponse(res);
        }

        if (!this.validator.isValidNameLength(req.body.family_name)) {
            this.responseSender.setupErrorData(ApiConstants.STATUS_INVALID_REQUEST, 'Invalid request', 'family_name length must be greater then ' +
                this.validator.MINIMUM_NAME_LENGTH + ' symbols and less then ' + this.validator.MAXIMUM_NAME_LENGTH + ' symbols.', 1008);

            return this.responseSender.sendErrorResponse(res);
        }

        this.createUserService.execute(req, res);
    }
}