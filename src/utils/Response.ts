export class Response {

    private statusCode: number;
    private body: any;

    constructor(statusCode: number, body: any) {
        this.statusCode = statusCode;
        this.body = JSON.stringify(body);
    }
}
