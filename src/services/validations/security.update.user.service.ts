import { ApiConstants } from '../../constants';
import { IValidator } from '../../types/validators';

export class SecurityUpdateUserService implements IExecutable {
    private users: IUsers;
    private updateUserService: IExecutable;
    private responseSender: IResponseSender;
    private validator: IValidator;

    public constructor(users: IUsers, responseSender: IResponseSender, updateUserService: IExecutable, validator: IValidator) {
        this.users = users;
        this.responseSender = responseSender;
        this.updateUserService = updateUserService;
        this.validator = validator;
    }

    /**
     *
     * @param req
     * @param res
     */
    public execute(req: IRequest, res: IResponse): void {
        if (!req.body.hasOwnProperty('email')) {
            this.responseSender.setupErrorData(ApiConstants.STATUS_INVALID_REQUEST, ApiConstants.NAME_INVALID_REQUEST, ApiConstants.MESSAGE_MISSING_EMAIL_PROPERTY, ApiConstants.ERROR_CODE_UPDATE_USER_MISSING_EMAIL);
            return this.responseSender.sendErrorResponse(res);
        }

        if (!this.validator.isValidEmail(req.body.email)) {
            this.responseSender.setupErrorData(ApiConstants.STATUS_INVALID_REQUEST, ApiConstants.NAME_INVALID_REQUEST, ApiConstants.MESSAGE_INVALID_EMAIL_FORMAT, ApiConstants.ERROR_CODE_UPDATE_USER_INVALID_EMAIL_FORMAT);
            return this.responseSender.sendErrorResponse(res);
        }
        if (!this.validator.isValidEmailLength(req.body.email)) {
            this.responseSender.setupErrorData(ApiConstants.STATUS_INVALID_REQUEST, ApiConstants.NAME_INVALID_REQUEST, ApiConstants.MESSAGE_INVALID_EMAIL_LENGTH, ApiConstants.ERROR_CODE_UPDATE_USER_INVALID_EMAIL_LENGTH);

            return this.responseSender.sendErrorResponse(res);
        }

        if (!req.body.hasOwnProperty('given_name')) {
            this.responseSender.setupErrorData(ApiConstants.STATUS_INVALID_REQUEST, ApiConstants.NAME_INVALID_REQUEST, ApiConstants.MESSAGE_MISSING_GIVEN_NAME_PROPERTY, ApiConstants.ERROR_CODE_UPDATE_USER_MISSING_GIVEN_NAME);
            return this.responseSender.sendErrorResponse(res);
        }

        if (!this.validator.isValidName(req.body.given_name)) {
            this.responseSender.setupErrorData(ApiConstants.STATUS_INVALID_REQUEST, ApiConstants.NAME_INVALID_REQUEST, ApiConstants.MESSAGE_INVALID_GIVEN_NAME_FORMAT, ApiConstants.ERROR_CODE_UPDATE_USER_INVALID_GIVEN_NAME_FORMAT);
            return this.responseSender.sendErrorResponse(res);
        }

        if (!this.validator.isValidNameLength(req.body.given_name)) {
            this.responseSender.setupErrorData(ApiConstants.STATUS_INVALID_REQUEST, ApiConstants.NAME_INVALID_REQUEST, ApiConstants.MESSAGE_INVALID_GIVEN_NAME_LENGTH, ApiConstants.ERROR_CODE_UPDATE_USER_INVALID_GIVEN_NAME_LENGTH);

            return this.responseSender.sendErrorResponse(res);
        }

        if (!req.body.hasOwnProperty('family_name')) {
            this.responseSender.setupErrorData(ApiConstants.STATUS_INVALID_REQUEST, ApiConstants.NAME_INVALID_REQUEST, ApiConstants.MESSAGE_MISSING_FAMILY_NAME_PROPERTY, ApiConstants.ERROR_CODE_UPDATE_USER_MISSING_FAMILY_NAME);
            return this.responseSender.sendErrorResponse(res);
        }

        if (!this.validator.isValidName(req.body.family_name)) {
            this.responseSender.setupErrorData(ApiConstants.STATUS_INVALID_REQUEST, ApiConstants.NAME_INVALID_REQUEST, ApiConstants.MESSAGE_INVALID_FAMILY_NAME_FORMAT, ApiConstants.ERROR_CODE_UPDATE_USER_INVALID_FAMILY_NAME_FORMAT);
            return this.responseSender.sendErrorResponse(res);
        }

        if (!this.validator.isValidNameLength(req.body.family_name)) {
            this.responseSender.setupErrorData(ApiConstants.STATUS_INVALID_REQUEST, ApiConstants.NAME_INVALID_REQUEST, ApiConstants.MESSAGE_INVALID_FAMILY_NAME_LENGTH, ApiConstants.ERROR_CODE_UPDATE_USER_INVALID_FAMILY_NAME_LENGTH);

            return this.responseSender.sendErrorResponse(res);
        }

        if (!req.params.hasOwnProperty('id')) {
            this.responseSender.setupErrorData(ApiConstants.STATUS_INVALID_REQUEST, ApiConstants.NAME_INVALID_REQUEST, ApiConstants.MESSAGE_MISSING_ID_QUERY, ApiConstants.ERROR_CODE_UPDATE_USER_INVALID_MISSING_ID_QUERY);
            return this.responseSender.sendErrorResponse(res);
        }

        this.users.getByEmail(req.body.email, req.params.id)
            .then(() => {
                this.updateUserService.execute(req, res);
            })
            .catch((err: any) => {
                console.log(err);
                this.responseSender.setupErrorData(ApiConstants.STATUS_INVALID_REQUEST, ApiConstants.NAME_INVALID_REQUEST, ApiConstants.MESSAGE_EMAIL_ALREADY_EXIST, ApiConstants.ERROR_CODE_UPDATE_USER_INVALID_EMAIL_EXIST);
                return this.responseSender.sendErrorResponse(res);
            });
    }
}