import { IValidator } from '../types/validators';

export class Validator implements IValidator {
    public static readonly MINIMUM_EMAIL_LENGTH: number = 6;
    public static readonly MAXIMUM_EMAIL_LENGTH: number = 255;
    public static readonly MINIMUM_NAME_LENGTH: number = 2;
    public static readonly MAXIMUM_NAME_LENGTH: number = 255;

    public constructor() {

    }

    /**
     * Validate is user email length correct.
     * @param value - user email.
     * @returns {boolean}
     */
    public isValidEmailLength(value: string): boolean {
        return (value && value.length >= Validator.MINIMUM_EMAIL_LENGTH && value.length <= Validator.MAXIMUM_EMAIL_LENGTH);
    }

    /**
     * Validate is user name length correct.
     * @param value - user name
     * @returns {boolean}
     */
    public isValidNameLength(value: string): boolean {
        return (value && value.length >= Validator.MINIMUM_NAME_LENGTH && value.length <= Validator.MAXIMUM_NAME_LENGTH);
    }

    /**
     * Validate is user name all symbols allowed.
     * @param value - user name
     * @returns {boolean}
     */
    public isValidName(value: string): boolean {
        return /^[a-zA-Z0-9]+$/.test(value);
    }

    /**
     * Validate is user email valid.
     * @param value - user email
     * @returns {boolean}
     */
    public isValidEmail(value: string): boolean {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(value).toLowerCase());
    }
}