export class Validator {
    public readonly MINIMUM_EMAIL_LENGTH = 4;
    public readonly MAXIMUM_EMAIL_LENGTH = 255;
    public readonly MINIMUM_NAME_LENGTH = 2;
    public readonly MAXIMUM_NAME_LENGTH = 255;

    public constructor() {

    }

    public isValidEmailLength(value: string) {
        return (value && value.length >= this.MINIMUM_EMAIL_LENGTH && value.length <= this.MAXIMUM_EMAIL_LENGTH);
    }

    public isValidNameLength(value: string) {
        return (value && value.length >= this.MINIMUM_NAME_LENGTH && value.length <= this.MAXIMUM_NAME_LENGTH);
    }

    public isValidName(value: string) {
        return /^[a-zA-Z0-9]+$/.test(value);
    }

    public isValidEmail(value: string) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(value).toLowerCase());
    }
}