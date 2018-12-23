import { ApiConstants } from '../constants';
import { ResponseSender } from '../services';
import { PostgresDb } from './';
import { Validator } from '../validators';

export class Users {
    private _id: number;
    private _email: string;
    private _given_name: string;
    private _family_name: string;
    private _created_at: string;
    private _table_name: string = 'users';
    private database: PostgresDb;
    private responseSender: ResponseSender;
    private validator: Validator;

    public constructor(database: PostgresDb, validator: Validator, responseSender: ResponseSender) {
        this.database = database;
        this.responseSender = responseSender;
        this.validator = validator;
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
        if (this.validator.isValidEmail(value)) {
            throw new Error('Invalid email');
        }

        if (this.validator.isValidEmailLength(value)) {
            throw new Error('Invalid email length');
        }

        this._email = value;
    }

    get given_name(): string {
        return this._given_name;
    }

    set given_name(value: string) {
        if (this.validator.isValidName(value)) {
            throw new Error('Invalid given_name');
        }

        if (this.validator.isValidNameLength(value)) {
            throw new Error('Invalid given_name length');
        }

        this._given_name = value;
    }

    get family_name(): string {
        return this._family_name;
    }

    set family_name(value: string) {
        if (this.validator.isValidName(value)) {
            throw new Error('Invalid family_name');
        }

        if (this.validator.isValidNameLength(value)) {
            throw new Error('Invalid family_name length');
        }

        this._family_name = value;
    }

    get created_at(): string {
        return this._created_at;
    }

    set created_at(value: string) {
        this._created_at = value;
    }

    get table_name(): string {
        return this._table_name;
    }

    public getById(userId: number): Promise<any> {
        return new Promise((resolve, reject) => {
            this.database.getClient()
                .then((client) => {
                    client.query({
                        text: 'SELECT * FROM ' + this._table_name + ' WHERE id = $1 LIMIT 1',
                        values: [userId]
                    }, (err: any, query: any) => {
                        client.release();

                        if (err) {
                            err.statusCode = ApiConstants.STATUS_INVALID_REQUEST;
                            return reject(err);
                        }

                        const result = query.rows[0];

                        if (!result) {
                            this.responseSender.setupErrorData(ApiConstants.STATUS_NOT_FOUND, 'Error', ApiConstants.MESSAGE_OBJECT_NOT_FOUND, 2002);
                            return reject(this.responseSender);
                        }

                        return resolve(result);
                    });
                });
        });
    }

    public getAll(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.database.getClient()
                .then((client) => {
                    client.query({
                        text: 'SELECT * FROM ' + this._table_name,
                        values: []
                    }, (err: any, query: any) => {
                        client.release();

                        if (err) {
                            err.statusCode = ApiConstants.STATUS_INVALID_REQUEST;
                            return reject(err);
                        }

                        const result = query.rows;
                        return resolve(result);
                    });
                });
        });
    }

    public create(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.database.getClient()
                .then((client: any) => {
                    client.query({
                        text: 'INSERT INTO ' + this._table_name + ' (email, given_name, family_name) VALUES ($1, $2, $3)',
                        values: [this.email, this.given_name, this.family_name]
                    }, (err: any, result: any) => {
                        client.release();

                        if (err) {
                            console.warn(err);
                            this.responseSender.setupErrorData(ApiConstants.STATUS_INVALID_REQUEST, err.name, ApiConstants.MESSAGE_INVALID_REQUEST, err.code);
                            return reject(this.responseSender);
                        }

                        return resolve();
                    });
                })
                .catch((err: any) => {
                    this.responseSender.setupErrorData(ApiConstants.STATUS_INVALID_REQUEST, err.name, ApiConstants.MESSAGE_INVALID_REQUEST, 2000);
                    return reject(this.responseSender);
                });
        });
    }

    public update(userId: number): Promise<any> {
        return new Promise((resolve, reject) => {
            this.database.getClient()
                .then((client) => {
                    client.query({
                        text: 'UPDATE ' + this._table_name + ' SET email = $2, given_name = $3, family_name = $4 WHERE id = $1',
                        values: [userId, this.email, this.given_name, this.family_name],
                    }, (err: any, result: any) => {
                        client.release();

                        if (result.rowCount === 0) {
                            this.responseSender.setupErrorData(ApiConstants.STATUS_NOT_FOUND, ApiConstants.MESSAGE_OBJECT_NOT_FOUND, ApiConstants.MESSAGE_OBJECT_NOT_FOUND, 2003);
                            return reject(this.responseSender);
                        }

                        if (err) {
                            console.log(err);
                            this.responseSender.setupErrorData(ApiConstants.STATUS_NOT_FOUND, err.name, ApiConstants.MESSAGE_OBJECT_NOT_FOUND, err.code);
                            return reject(this.responseSender);
                        }

                        return resolve();
                    });
                });
        });
    }

    public delete(userId: number): Promise<any> {
        return new Promise((resolve, reject) => {
            this.database.getClient()
                .then((client) => {
                    client.query({
                        text: 'DELETE FROM ' + this._table_name + ' AS t WHERE id = $1',
                        values: [userId],
                    }, (err: any, result: any) => {
                        client.release();

                        if (result.rowCount === 0) {
                            this.responseSender.setupErrorData(ApiConstants.STATUS_NOT_FOUND, ApiConstants.MESSAGE_OBJECT_NOT_FOUND, ApiConstants.MESSAGE_OBJECT_NOT_FOUND, 2001);
                            return reject(this.responseSender);
                        }

                        if (err) {
                            console.log(err);
                            this.responseSender.setupErrorData(ApiConstants.STATUS_NOT_FOUND, err.name, ApiConstants.MESSAGE_OBJECT_NOT_FOUND, err.code);
                            return reject(this.responseSender);
                        }

                        this.responseSender.setupValidData(ApiConstants.STATUS_OK, ApiConstants.MESSAGE_OK, result.rows);
                        return resolve(this.responseSender);
                    });
                });
        });
    }
}