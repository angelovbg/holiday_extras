declare interface IValidator {
    isValidEmailLength(value: string): boolean;
    isValidNameLength(value: string): boolean;
    isValidName(value: string): boolean;
    isValidEmail(value: string): boolean;
}

export { IValidator };