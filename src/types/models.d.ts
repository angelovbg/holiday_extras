declare interface IUsers {
    id: number;
    email: string;
    given_name: string;
    family_name: string;
    created_at: string;

    getById(userId: number): Promise<IUsers>;
    getByEmail(email: string, userId?: number): Promise<any>;
    getAll(): Promise<any>;
    create(): Promise<any>;
    update(userId: number): Promise<any>;
    delete(userId: number): Promise<any>;
}

declare interface IDatabase {
    getClient(): Promise<any>;
}

declare interface IRequest {
    body: any;
    params: any;
}

declare interface IResponse {
    status(code: number): any;
    send(param: any): any;
}