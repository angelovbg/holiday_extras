export class ApiConstants {
    public static readonly STATUS_OK: number = 200;
    public static readonly STATUS_CREATED: number = 201;
    public static readonly STATUS_NO_CONTENT: number = 204;
    public static readonly STATUS_INVALID_REQUEST: number = 400;
    public static readonly STATUS_NOT_AUTHORIZED: number = 401;
    public static readonly STATUS_NOT_ENOUGH_PERMISSIONS: number = 403;
    public static readonly STATUS_NOT_FOUND: number = 404;

    public static readonly MESSAGE_OK: string = 'OK';
    public static readonly MESSAGE_CREATED: string = 'Created';
    public static readonly MESSAGE_NO_CONTENT: string = 'OK';
    public static readonly MESSAGE_INVALID_REQUEST: string = 'Invalid request.';
    public static readonly MESSAGE_OBJECT_NOT_FOUND: string = 'Object not found.';
    public static readonly MESSAGE_WRONG_PROCESS: string = 'Wrong process.';
    public static readonly MESSAGE_NOT_AUTHORIZED: string = 'You are not authorized.';
    public static readonly MESSAGE_NOT_ENOUGH_PERMISSIONS: string = 'You do not have permissions.';

    private constructor() {

    }
}
