declare interface IResponseSender {
    name: string;
    status: number;
    data: any;
    code: number;
    message: string;

    setupValidData(status: number, name: string, data: any): void;
    setupErrorData(status: number, name: string, message: string, code: number): void;
    sendValidResponse(res: IResponse): void;
    sendErrorResponse(res: IResponse): void;
}

declare interface IExecutable {
    execute(req: IRequest, res: IResponse): void;
}