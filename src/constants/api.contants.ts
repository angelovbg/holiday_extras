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
    public static readonly MESSAGE_MISSING_EMAIL_PROPERTY: string = 'Missing email property.';
    public static readonly MESSAGE_MISSING_GIVEN_NAME_PROPERTY: string = 'Missing given_name property.';
    public static readonly MESSAGE_MISSING_FAMILY_NAME_PROPERTY: string = 'Missing family_name property.';
    public static readonly MESSAGE_INVALID_EMAIL_FORMAT: string = 'Incorrect email format';
    public static readonly MESSAGE_INVALID_GIVEN_NAME_FORMAT: string = 'Incorrect given_name format.';
    public static readonly MESSAGE_INVALID_FAMILY_NAME_FORMAT: string = 'Incorrect family_name format.';
    public static readonly MESSAGE_EMAIL_ALREADY_EXIST: string = 'Email already exist.';
    public static readonly MESSAGE_MISSING_ID_QUERY: string = 'Missing id query.';
    public static readonly MESSAGE_INVALID_EMAIL_LENGTH: string = 'email length must be greater then ' +
        Validator.MINIMUM_EMAIL_LENGTH + ' symbols and less then ' + Validator.MAXIMUM_EMAIL_LENGTH + ' symbols.';
    public static readonly MESSAGE_INVALID_GIVEN_NAME_LENGTH: string = 'given_name length must be greater then ' +
        Validator.MINIMUM_NAME_LENGTH + ' symbols and less then ' + Validator.MAXIMUM_NAME_LENGTH + ' symbols.';
    public static readonly MESSAGE_INVALID_FAMILY_NAME_LENGTH: string = 'family_name length must be greater then ' +
        Validator.MINIMUM_NAME_LENGTH + ' symbols and less then ' + Validator.MAXIMUM_NAME_LENGTH + ' symbols.';


    public static readonly ERROR_CODE_CREATE_USER_MISSING_EMAIL: number = 1000;
    public static readonly ERROR_CODE_CREATE_USER_MISSING_GIVEN_NAME: number = 1001;
    public static readonly ERROR_CODE_CREATE_USER_MISSING_FAMILY_NAME: number = 1002;
    public static readonly ERROR_CODE_CREATE_USER_INVALID_EMAIL_FORMAT: number = 1003;
    public static readonly ERROR_CODE_CREATE_USER_INVALID_GIVEN_NAME_FORMAT: number = 1004;
    public static readonly ERROR_CODE_CREATE_USER_INVALID_FAMILY_NAME_FORMAT: number = 1005;
    public static readonly ERROR_CODE_CREATE_USER_INVALID_EMAIL_LENGTH: number = 1006;
    public static readonly ERROR_CODE_CREATE_USER_INVALID_GIVEN_NAME_LENGTH: number = 1007;
    public static readonly ERROR_CODE_CREATE_USER_INVALID_FAMILY_NAME_LENGTH: number = 1008;
    public static readonly ERROR_CODE_CREATE_USER_INVALID_EMAIL_EXIST: number = 1009;
    public static readonly ERROR_CODE_UPDATE_USER_MISSING_EMAIL: number = 1100;
    public static readonly ERROR_CODE_UPDATE_USER_MISSING_GIVEN_NAME: number = 1101;
    public static readonly ERROR_CODE_UPDATE_USER_MISSING_FAMILY_NAME: number = 1102;
    public static readonly ERROR_CODE_UPDATE_USER_INVALID_EMAIL_FORMAT: number = 1103;
    public static readonly ERROR_CODE_UPDATE_USER_INVALID_GIVEN_NAME_FORMAT: number = 1104;
    public static readonly ERROR_CODE_UPDATE_USER_INVALID_FAMILY_NAME_FORMAT: number = 1105;
    public static readonly ERROR_CODE_UPDATE_USER_INVALID_EMAIL_LENGTH: number = 1106;
    public static readonly ERROR_CODE_UPDATE_USER_INVALID_GIVEN_NAME_LENGTH: number = 1107;
    public static readonly ERROR_CODE_UPDATE_USER_INVALID_FAMILY_NAME_LENGTH: number = 1108;
    public static readonly ERROR_CODE_UPDATE_USER_INVALID_EMAIL_EXIST: number = 1109;
    public static readonly ERROR_CODE_UPDATE_USER_INVALID_MISSING_ID_QUERY: number = 1110;
    public static readonly ERROR_CODE_GET_USER_INVALID_MISSING_ID_QUERY: number = 1200;
    public static readonly ERROR_CODE_DELETE_USER_INVALID_MISSING_ID_QUERY: number = 1300;
    public static readonly ERROR_CODE_USER_MODEL_NO_USER_FOUND : number = 2000;
    public static readonly ERROR_CODE_USER_MODEL_CREATE_USER: number = 2001;
    public static readonly ERROR_CODE_USER_MODEL_UPDATE_USER: number = 2002;
    public static readonly ERROR_CODE_USER_MODEL_DELETE_USER: number = 2003;

    private constructor() {

    }
}
