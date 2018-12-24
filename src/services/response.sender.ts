export class ResponseSender implements IResponseSender {
    private _name: string;
    private _status: number;
    private _data: any;
    private _code: number;
    private _message: string;

    public constructor() {

    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get status(): number {
        return this._status;
    }

    set status(value: number) {
        this._status = value;
    }

    get data(): any {
        return this._data;
    }

    set data(value: any) {
        this._data = value;
    }

    get code(): number {
        return this._code;
    }

    set code(value: number) {
        this._code = value;
    }

    get message(): string {
        return this._message;
    }

    set message(value: string) {
        this._message = value;
    }

    /**
     *
     * @param status
     * @param name
     * @param data
     */
    public setupValidData(status: number, name: string, data: any): void {
        this.status = status;
        this.name = name;
        this.data = data;
    }

    /**
     *
     * @param status
     * @param name
     * @param message
     * @param code
     */
    public setupErrorData(status: number, name: string, message: string, code: number): void {
        this.status = status;
        this.name = name;
        this.message = message;
        this.code = code;
    }

    /**
     *
     * @param res
     */
    public sendValidResponse(res: IResponse): void {
        if (this.data) {
            res.status(this.status).send({
                'name': this.name,
                'status': this.status,
                'data': this.data,
            });
        } else {
            res.status(this.status).send({
                'name': this.name,
                'status': this.status,
            });
        }
    }

    /**
     *
     * @param res
     */
    public sendErrorResponse(res: IResponse): void {
        res.status(this.status).send({
            'name': this.name,
            'message': this.message,
            'status': this.status,
            'code': this.code,
        });
    }
}