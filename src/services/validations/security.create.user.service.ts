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
            this.responseSender.setupErrorData(ApiConstants.STATUS_INVALID_REQUEST, ApiConstants.NAME_INVALID_REQUEST, ApiConstants.MESSAGE_MISSING_EMAIL_PROPERTY, ApiConstants.ERROR_CODE_CREATE_USER_MISSING_EMAIL);
            return this.responseSender.sendErrorResponse(res);
        }

        if (!this.validator.isValidEmail(req.body.email)) {
            this.responseSender.setupErrorData(ApiConstants.STATUS_INVALID_REQUEST, ApiConstants.NAME_INVALID_REQUEST, ApiConstants.MESSAGE_INVALID_EMAIL_FORMAT, ApiConstants.ERROR_CODE_CREATE_USER_INVALID_EMAIL_FORMAT);
            return this.responseSender.sendErrorResponse(res);
        }
        if (!this.validator.isValidEmailLength(req.body.email)) {
            this.responseSender.setupErrorData(ApiConstants.STATUS_INVALID_REQUEST, ApiConstants.NAME_INVALID_REQUEST, ApiConstants.MESSAGE_INVALID_EMAIL_LENGTH, ApiConstants.ERROR_CODE_CREATE_USER_INVALID_EMAIL_LENGTH);

            return this.responseSender.sendErrorResponse(res);
        }

        if (!req.body.hasOwnProperty('given_name')) {
            this.responseSender.setupErrorData(ApiConstants.STATUS_INVALID_REQUEST, ApiConstants.NAME_INVALID_REQUEST, ApiConstants.MESSAGE_MISSING_GIVEN_NAME_PROPERTY, ApiConstants.ERROR_CODE_CREATE_USER_MISSING_GIVEN_NAME);
            return this.responseSender.sendErrorResponse(res);
        }

        if (!this.validator.isValidName(req.body.given_name)) {
            this.responseSender.setupErrorData(ApiConstants.STATUS_INVALID_REQUEST, ApiConstants.NAME_INVALID_REQUEST, ApiConstants.MESSAGE_INVALID_GIVEN_NAME_FORMAT, ApiConstants.ERROR_CODE_CREATE_USER_INVALID_GIVEN_NAME_FORMAT);
            return this.responseSender.sendErrorResponse(res);
        }

        if (!this.validator.isValidNameLength(req.body.given_name)) {
            this.responseSender.setupErrorData(ApiConstants.STATUS_INVALID_REQUEST, ApiConstants.NAME_INVALID_REQUEST, ApiConstants.MESSAGE_INVALID_GIVEN_NAME_LENGTH, ApiConstants.ERROR_CODE_CREATE_USER_INVALID_GIVEN_NAME_LENGTH);

            return this.responseSender.sendErrorResponse(res);
        }

        if (!req.body.hasOwnProperty('family_name')) {
            this.responseSender.setupErrorData(ApiConstants.STATUS_INVALID_REQUEST, ApiConstants.NAME_INVALID_REQUEST, ApiConstants.MESSAGE_MISSING_FAMILY_NAME_PROPERTY, ApiConstants.ERROR_CODE_CREATE_USER_MISSING_FAMILY_NAME);
            return this.responseSender.sendErrorResponse(res);
        }

        if (!this.validator.isValidName(req.body.family_name)) {
            this.responseSender.setupErrorData(ApiConstants.STATUS_INVALID_REQUEST, ApiConstants.NAME_INVALID_REQUEST, ApiConstants.MESSAGE_INVALID_FAMILY_NAME_FORMAT, ApiConstants.ERROR_CODE_CREATE_USER_INVALID_FAMILY_NAME_FORMAT);
            return this.responseSender.sendErrorResponse(res);
        }

        if (!this.validator.isValidNameLength(req.body.family_name)) {
            this.responseSender.setupErrorData(ApiConstants.STATUS_INVALID_REQUEST, ApiConstants.NAME_INVALID_REQUEST, ApiConstants.MESSAGE_INVALID_FAMILY_NAME_LENGTH, ApiConstants.ERROR_CODE_CREATE_USER_INVALID_FAMILY_NAME_LENGTH);

            return this.responseSender.sendErrorResponse(res);
        }

        this.users.getByEmail(req.body.email)
            .then(() => {
                this.createUserService.execute(req, res);
            })
            .catch((err: any) => {
                console.log(err);
                this.responseSender.setupErrorData(ApiConstants.STATUS_INVALID_REQUEST, ApiConstants.NAME_INVALID_REQUEST, ApiConstants.MESSAGE_EMAIL_ALREADY_EXIST, ApiConstants.ERROR_CODE_CREATE_USER_INVALID_EMAIL_EXIST);
                return this.responseSender.sendErrorResponse(res);
            });
    }
}