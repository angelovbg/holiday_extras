export class TestData {
    private _url: string;
    public static readonly VALID_GIVEN_NAME = 'UserGivenName';
    public static readonly ONE_LETTER_NAME = 'U';
    public static readonly VALID_FAMILY_NAME = 'UserFamilyName';
    public static readonly THREE_HUNDRED_LETTERS_NAME = 'uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu';
    public static readonly VALID_EMAIL = 'test_user@aaaaa.com';
    public static readonly VALID_EMAIL_SECOND = 'test_user2@aaaaa.com';
    public static readonly VALID_EMAIL_THIRD = 'test_user3@aaaaa.com';
    public static readonly VALID_EMAIL_B = 'test_user@bbbb.com';
    public static readonly INVALID_EMAIL_LENGTH = 'a@a.c';

    public constructor() {
        this._url = 'http://localhost:' + process.env.APP_PORT;
    }

    get url(): string {
        return this._url;
    }

    set url(value: string) {
        this._url = value;
    }
}