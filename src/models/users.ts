import { ApiConstants } from '../constants';
import { ResponseSender } from '../services';
import { PostgresDb } from './';

export class Users {
    private _id: number;
    private _email: string;
    private _given_name: string;
    private _family_name: string;
    private _created_at: string;
    private _table_name: string = 'users';
    private database: PostgresDb;
    private responseSender: ResponseSender;

    public constructor(database: PostgresDb, responseSender: ResponseSender) {
        this.database = database;
        this.responseSender = responseSender;
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

    public create(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.database.getClient()
                .then((client: any) => {
                    client.query({
                        text: 'INSERT INTO ' + this._table_name + ' (email, given_name, family_name) VALUES ($1, $2, $3)',
                        values: [this.email, this.given_name, this.family_name]
                    }, (err: any, result: any) => {

                        if (err) {
                            console.warn(err);
                            this.responseSender.setupErrorData(ApiConstants.STATUS_INVALID_REQUEST, err.name, ApiConstants.MESSAGE_INVALID_REQUEST, err.code);
                            return reject(this.responseSender);
                        }

                        return resolve();
                    });
                })
                .catch((err: any) => {
                    this.responseSender.setupErrorData(ApiConstants.STATUS_INVALID_REQUEST, err.name, ApiConstants.MESSAGE_INVALID_REQUEST, 1111);
                    return reject(this.responseSender);
                });
        });
    }
}