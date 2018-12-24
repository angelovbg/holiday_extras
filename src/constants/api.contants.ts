import { Validator } from '../validators';

export class ApiConstants {
    public static readonly STATUS_OK: number = 200;
    public static readonly STATUS_CREATED: number = 201;
    public static readonly STATUS_NO_CONTENT: number = 204;
    public static readonly STATUS_INVALID_REQUEST: number = 400;
    public static readonly STATUS_NOT_AUTHORIZED: number = 401;
    public static readonly STATUS_NOT_ENOUGH_PERMISSIONS: number = 403;
    public static readonly STATUS_NOT_FOUND: number = 404;

    public static readonly NAME_INVALID_REQUEST: string = 'Invalid request.';
    public static readonly NAME_OBJECT_NOT_FOUND: string = 'Object not found.';

    public static readonly MESSAGE_OK: string = 'OK';
    public static readonly MESSAGE_CREATED: string = 'Created';
    public static readonly MESSAGE_NO_CONTENT: string = 'OK';
    public static readonly MESSAGE_INVALID_REQUEST: string = 'Invalid request.';
    public static readonly MESSAGE_OBJECT_NOT_FOUND: string = 'Object not found.';
    public static readonly MESSAGE_WRONG_PROCESS: string = 'Wrong process.';
    public static readonly MESSAGE_NOT_AUTHORIZED: string = 'You are not authorized.';
    public static readonly MESSAGE_NOT_ENOUGH_PERMISSIONS: string = 'You do not have permissions.';

    public static readonly MESSAGE_MISSING_EMAIL_PROPERTY = 'Missing email property.';
    public static readonly MESSAGE_MISSING_GIVEN_NAME_PROPERTY = 'Missing given_name property.';
    public static readonly MESSAGE_MISSING_FAMILY_NAME_PROPERTY = 'Missing family_name property.';
    public static readonly MESSAGE_INVALID_EMAIL_FORMAT = 'Incorrect email format';
    public static readonly MESSAGE_INVALID_GIVEN_NAME_FORMAT = 'Incorrect given_name format.';
    public static readonly MESSAGE_INVALID_FAMILY_NAME_FORMAT = 'Incorrect family_name format.';
    public static readonly MESSAGE_EMAIL_ALREADY_EXIST = 'Email already exist.';
    public static readonly MESSAGE_MISSING_ID_QUERY = 'Missing id query.';
    public static readonly MESSAGE_INVALID_EMAIL_LENGTH = 'email length must be greater then ' +
        Validator.MINIMUM_EMAIL_LENGTH + ' symbols and less then ' + Validator.MAXIMUM_EMAIL_LENGTH + ' symbols.';
    public static readonly MESSAGE_INVALID_GIVEN_NAME_LENGTH = 'given_name length must be greater then ' +
        Validator.MINIMUM_NAME_LENGTH + ' symbols and less then ' + Validator.MAXIMUM_NAME_LENGTH + ' symbols.';
    public static readonly MESSAGE_INVALID_FAMILY_NAME_LENGTH = 'family_name length must be greater then ' +
        Validator.MINIMUM_NAME_LENGTH + ' symbols and less then ' + Validator.MAXIMUM_NAME_LENGTH + ' symbols.';

    private constructor() {

    }
}
