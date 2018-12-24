import { Request, Response } from 'express';
import { ApiConstants } from '../../constants';
import { UpdateUserService, ResponseSender } from '../';
import { Validator } from '../../validators';
import { Users } from '../../models';

export class SecurityUpdateUserService {
    private users: Users;
    private updateUserService: UpdateUserService;
    private responseSender: ResponseSender;
    private validator: Validator;

    public constructor(users: Users, responseSender: ResponseSender, updateUserService: UpdateUserService, validator: Validator) {
        this.users = users;
        this.responseSender = responseSender;
        this.updateUserService = updateUserService;
        this.validator = validator;
    }

    public execute(req: Request, res: Response): void {
        if (!req.body.hasOwnProperty('email')) {
            this.responseSender.setupErrorData(ApiConstants.STATUS_INVALID_REQUEST, ApiConstants.NAME_INVALID_REQUEST, ApiConstants.MESSAGE_MISSING_EMAIL_PROPERTY, 1100);
            return this.responseSender.sendErrorResponse(res);
        }

        if (!this.validator.isValidEmail(req.body.email)) {
            this.responseSender.setupErrorData(ApiConstants.STATUS_INVALID_REQUEST, ApiConstants.NAME_INVALID_REQUEST, ApiConstants.MESSAGE_INVALID_EMAIL_FORMAT, 1103);
            return this.responseSender.sendErrorResponse(res);
        }
        if (!this.validator.isValidEmailLength(req.body.email)) {
            this.responseSender.setupErrorData(ApiConstants.STATUS_INVALID_REQUEST, ApiConstants.NAME_INVALID_REQUEST, ApiConstants.MESSAGE_INVALID_EMAIL_LENGTH, 1104);

            return this.responseSender.sendErrorResponse(res);
        }

        if (!req.body.hasOwnProperty('given_name')) {
            this.responseSender.setupErrorData(ApiConstants.STATUS_INVALID_REQUEST, ApiConstants.NAME_INVALID_REQUEST, ApiConstants.MESSAGE_MISSING_GIVEN_NAME_PROPERTY, 1101);
            return this.responseSender.sendErrorResponse(res);
        }

        if (!this.validator.isValidName(req.body.given_name)) {
            this.responseSender.setupErrorData(ApiConstants.STATUS_INVALID_REQUEST, ApiConstants.NAME_INVALID_REQUEST, ApiConstants.MESSAGE_INVALID_GIVEN_NAME_FORMAT, 1105);
            return this.responseSender.sendErrorResponse(res);
        }

        if (!this.validator.isValidNameLength(req.body.given_name)) {
            this.responseSender.setupErrorData(ApiConstants.STATUS_INVALID_REQUEST, ApiConstants.NAME_INVALID_REQUEST, ApiConstants.MESSAGE_INVALID_GIVEN_NAME_LENGTH, 1106);

            return this.responseSender.sendErrorResponse(res);
        }

        if (!req.body.hasOwnProperty('family_name')) {
            this.responseSender.setupErrorData(ApiConstants.STATUS_INVALID_REQUEST, ApiConstants.NAME_INVALID_REQUEST, ApiConstants.MESSAGE_MISSING_FAMILY_NAME_PROPERTY, 1102);
            return this.responseSender.sendErrorResponse(res);
        }

        if (!this.validator.isValidName(req.body.family_name)) {
            this.responseSender.setupErrorData(ApiConstants.STATUS_INVALID_REQUEST, ApiConstants.NAME_INVALID_REQUEST, ApiConstants.MESSAGE_INVALID_FAMILY_NAME_FORMAT, 1107);
            return this.responseSender.sendErrorResponse(res);
        }

        if (!this.validator.isValidNameLength(req.body.family_name)) {
            this.responseSender.setupErrorData(ApiConstants.STATUS_INVALID_REQUEST, ApiConstants.NAME_INVALID_REQUEST, ApiConstants.MESSAGE_INVALID_FAMILY_NAME_LENGTH, 1108);

            return this.responseSender.sendErrorResponse(res);
        }

        if (!req.params.hasOwnProperty('id')) {
            this.responseSender.setupErrorData(ApiConstants.STATUS_INVALID_REQUEST, ApiConstants.NAME_INVALID_REQUEST, ApiConstants.MESSAGE_MISSING_ID_QUERY, 1110);
            return this.responseSender.sendErrorResponse(res);
        }

        this.users.getByEmail(req.body.email, req.params.id)
            .then(() => {
                this.updateUserService.execute(req, res);
            })
            .catch((err: any) => {
                console.log(err);
                this.responseSender.setupErrorData(ApiConstants.STATUS_INVALID_REQUEST, ApiConstants.NAME_INVALID_REQUEST, ApiConstants.MESSAGE_EMAIL_ALREADY_EXIST, 1109);
                return this.responseSender.sendErrorResponse(res);
            });
    }
}