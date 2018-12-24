export class Validator implements IValidator {
    public static readonly MINIMUM_EMAIL_LENGTH: number = 4;
    public static readonly MAXIMUM_EMAIL_LENGTH: number = 255;
    public static readonly MINIMUM_NAME_LENGTH: number = 2;
    public static readonly MAXIMUM_NAME_LENGTH: number = 255;

    public constructor() {

    }

    public isValidEmailLength(value: string): boolean {
        return (value && value.length >= Validator.MINIMUM_EMAIL_LENGTH && value.length <= Validator.MAXIMUM_EMAIL_LENGTH);
    }

    public isValidNameLength(value: string): boolean {
        return (value && value.length >= Validator.MINIMUM_NAME_LENGTH && value.length <= Validator.MAXIMUM_NAME_LENGTH);
    }

    public isValidName(value: string): boolean {
        return /^[a-zA-Z0-9]+$/.test(value);
    }

    public isValidEmail(value: string): boolean {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(value).toLowerCase());
    }
}