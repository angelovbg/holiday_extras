export class Users {
    private _id: number;
    private _email: string;
    private _given_name: string;
    private _family_name: string;
    private _created_at: string;

    public constructor() {

    }

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get email(): string {
        return this._email;
    }

    set email(value: string) {
        this._email = value;
    }

    get given_name(): string {
        return this._given_name;
    }

    set given_name(value: string) {
        this._given_name = value;
    }

    get family_name(): string {
        return this._family_name;
    }

    set family_name(value: string) {
        this._family_name = value;
    }

    get created_at(): string {
        return this._created_at;
    }

    set created_at(value: string) {
        this._created_at = value;
    }
}