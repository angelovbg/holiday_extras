import { Request, Response } from 'express';
import { ApiConstants } from '../../constants';
import { CreateUserService, ResponseSender } from '../';
import { Validator } from '../../validators';
import { Users } from '../../models';

export class SecurityCreateUserService {
    private users: Users;
    private createUserService: CreateUserService;
    private responseSender: ResponseSender;
    private validator: Validator;

    public constructor(users: Users, responseSender: ResponseSender, createUserService: CreateUserService, validator: Validator) {
        this.users = users;
        this.responseSender = responseSender;
        this.createUserService = createUserService;
        this.validator = validator;
    }

    public execute(req: Request, res: Response): void {
        if (!req.body.hasOwnProperty('email')) {
            this.responseSender.setupErrorData(ApiConstants.STATUS_INVALID_REQUEST, ApiConstants.NAME_INVALID_REQUEST, ApiConstants.MESSAGE_MISSING_EMAIL_PROPERTY, 1000);
            return this.responseSender.sendErrorResponse(res);
        }

        if (!this.validator.isValidEmail(req.body.email)) {
            this.responseSender.setupErrorData(ApiConstants.STATUS_INVALID_REQUEST, ApiConstants.NAME_INVALID_REQUEST, ApiConstants.MESSAGE_INVALID_EMAIL_FORMAT, 1003);
            return this.responseSender.sendErrorResponse(res);
        }
        if (!this.validator.isValidEmailLength(req.body.email)) {
            this.responseSender.setupErrorData(ApiConstants.STATUS_INVALID_REQUEST, ApiConstants.NAME_INVALID_REQUEST, ApiConstants.MESSAGE_INVALID_EMAIL_LENGTH, 1004);

            return this.responseSender.sendErrorResponse(res);
        }

        if (!req.body.hasOwnProperty('given_name')) {
            this.responseSender.setupErrorData(ApiConstants.STATUS_INVALID_REQUEST, ApiConstants.NAME_INVALID_REQUEST, ApiConstants.MESSAGE_MISSING_GIVEN_NAME_PROPERTY, 1001);
            return this.responseSender.sendErrorResponse(res);
        }

        if (!this.validator.isValidName(req.body.given_name)) {
            this.responseSender.setupErrorData(ApiConstants.STATUS_INVALID_REQUEST, ApiConstants.NAME_INVALID_REQUEST, ApiConstants.MESSAGE_INVALID_GIVEN_NAME_FORMAT, 1005);
            return this.responseSender.sendErrorResponse(res);
        }

        if (!this.validator.isValidNameLength(req.body.given_name)) {
            this.responseSender.setupErrorData(ApiConstants.STATUS_INVALID_REQUEST, ApiConstants.NAME_INVALID_REQUEST, ApiConstants.MESSAGE_INVALID_GIVEN_NAME_LENGTH, 1006);

            return this.responseSender.sendErrorResponse(res);
        }

        if (!req.body.hasOwnProperty('family_name')) {
            this.responseSender.setupErrorData(ApiConstants.STATUS_INVALID_REQUEST, ApiConstants.NAME_INVALID_REQUEST, ApiConstants.MESSAGE_MISSING_FAMILY_NAME_PROPERTY, 1002);
            return this.responseSender.sendErrorResponse(res);
        }

        if (!this.validator.isValidName(req.body.family_name)) {
            this.responseSender.setupErrorData(ApiConstants.STATUS_INVALID_REQUEST, ApiConstants.NAME_INVALID_REQUEST, ApiConstants.MESSAGE_INVALID_FAMILY_NAME_FORMAT, 1007);
            return this.responseSender.sendErrorResponse(res);
        }

        if (!this.validator.isValidNameLength(req.body.family_name)) {
            this.responseSender.setupErrorData(ApiConstants.STATUS_INVALID_REQUEST, ApiConstants.NAME_INVALID_REQUEST, ApiConstants.MESSAGE_INVALID_FAMILY_NAME_LENGTH, 1008);

            return this.responseSender.sendErrorResponse(res);
        }

        this.users.getByEmail(req.body.email)
            .then(() => {
                this.createUserService.execute(req, res);
            })
            .catch((err: any) => {
                console.log(err);
                this.responseSender.setupErrorData(ApiConstants.STATUS_INVALID_REQUEST, ApiConstants.NAME_INVALID_REQUEST, ApiConstants.MESSAGE_EMAIL_ALREADY_EXIST, 1009);
                return this.responseSender.sendErrorResponse(res);
            });
    }
}