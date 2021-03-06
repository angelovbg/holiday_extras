import { expect } from 'chai';
import * as request from 'request';
import { ApiConstants } from '../constants';
import { TestData } from './test.data';

const testData = new TestData();
const baseUrl = testData.url;

describe('/POST /users/' , () => {
    describe('Create user.' , () => {
        it('Valid request. Return 201', (done) => {
            const body: any = {
                email: TestData.VALID_EMAIL,
                given_name: TestData.VALID_GIVEN_NAME,
                family_name: TestData.VALID_FAMILY_NAME
            };
            request.post({url: baseUrl + '/users/', body: body, json: true }, (err: any, res: any) => {
                const responseBody = res.body;

                expect(responseBody.name).to.equal(ApiConstants.MESSAGE_CREATED);
                expect(res.statusCode).to.equal(ApiConstants.STATUS_CREATED);

                done();
            });
        });

        it('Valid request 2. Return 201', (done) => {
            const body: any = {
                email: TestData.VALID_EMAIL_SECOND,
                given_name: TestData.VALID_GIVEN_NAME,
                family_name: TestData.VALID_FAMILY_NAME
            };
            request.post({url: baseUrl + '/users/', body: body, json: true }, (err: any, res: any) => {
                const responseBody = res.body;

                expect(responseBody.name).to.equal(ApiConstants.MESSAGE_CREATED);
                expect(res.statusCode).to.equal(ApiConstants.STATUS_CREATED);

                done();
            });
        });

        it('Valid request 3. Return 201', (done) => {
            const body: any = {
                email: TestData.VALID_EMAIL_THIRD,
                given_name: TestData.VALID_GIVEN_NAME,
                family_name: TestData.VALID_FAMILY_NAME
            };
            request.post({url: baseUrl + '/users/', body: body, json: true }, (err: any, res: any) => {
                const responseBody = res.body;

                expect(responseBody.name).to.equal(ApiConstants.MESSAGE_CREATED);
                expect(res.statusCode).to.equal(ApiConstants.STATUS_CREATED);

                done();
            });
        });

        it('Invalid request. Existing email. Return 400', (done) => {
            const body: any = {
                email: TestData.VALID_EMAIL,
                given_name: TestData.VALID_GIVEN_NAME,
                family_name: TestData.VALID_FAMILY_NAME
            };
            request.post({url: baseUrl + '/users/', body: body, json: true }, (err: any, res: any) => {
                const responseBody = res.body;

                expect(responseBody.name).to.equal(ApiConstants.NAME_INVALID_REQUEST);
                expect(responseBody.message).to.equal(ApiConstants.MESSAGE_EMAIL_ALREADY_EXIST);
                expect(res.statusCode).to.equal(ApiConstants.STATUS_INVALID_REQUEST);

                done();
            });
        });

        it('Invalid request. Incorrect email. Return 400', (done) => {
            const body: any = {
                email: TestData.INVALID_EMAIL_LENGTH,
                given_name: TestData.VALID_GIVEN_NAME,
                family_name: TestData.VALID_FAMILY_NAME
            };
            request.post({url: baseUrl + '/users/', body: body, json: true }, (err: any, res: any) => {
                const responseBody = res.body;

                expect(responseBody.message).to.equal(ApiConstants.MESSAGE_INVALID_EMAIL_FORMAT);
                expect(responseBody.code).to.equal(ApiConstants.ERROR_CODE_CREATE_USER_INVALID_EMAIL_FORMAT);
                expect(res.statusCode).to.equal(ApiConstants.STATUS_INVALID_REQUEST);

                done();
            });
        });

        it('Invalid request. Missing email property. Return 400', (done) => {
            const body = {};
            request.post(baseUrl + '/users/', body, (err, res) => {
                const responseBody = JSON.parse(res.body);

                expect(responseBody.message).to.equal(ApiConstants.MESSAGE_MISSING_EMAIL_PROPERTY);
                expect(responseBody.code).to.equal(ApiConstants.ERROR_CODE_CREATE_USER_MISSING_EMAIL);
                expect(res.statusCode).to.equal(ApiConstants.STATUS_INVALID_REQUEST);

                done();
            });
        });

        it('Invalid request. Missing given_name property. Return 400', (done) => {
            const body: any = { email: TestData.VALID_EMAIL };
            request.post({url: baseUrl + '/users/', body: body, json: true }, (err: any, res: any) => {
                const responseBody = res.body;

                expect(responseBody.message).to.equal(ApiConstants.MESSAGE_MISSING_GIVEN_NAME_PROPERTY);
                expect(responseBody.code).to.equal(ApiConstants.ERROR_CODE_CREATE_USER_MISSING_GIVEN_NAME);
                expect(res.statusCode).to.equal(ApiConstants.STATUS_INVALID_REQUEST);
                done();
            });
        });

        it('Invalid request. Missing family_name property. Return 400', (done) => {
            const body: any = {
                email: TestData.VALID_EMAIL,
                given_name: TestData.VALID_GIVEN_NAME
            };
            request.post({url: baseUrl + '/users/', body: body, json: true }, (err: any, res: any) => {
                const responseBody = res.body;

                expect(responseBody.message).to.equal(ApiConstants.MESSAGE_MISSING_FAMILY_NAME_PROPERTY);
                expect(responseBody.code).to.equal(ApiConstants.ERROR_CODE_CREATE_USER_MISSING_FAMILY_NAME);
                expect(res.statusCode).to.equal(ApiConstants.STATUS_INVALID_REQUEST);
                done();
            });
        });

        it('Invalid request. Empty body. Return 400', (done) => {
            request.post(baseUrl + '/users/', (err, res) => {
                expect(res.statusCode).to.equal(ApiConstants.STATUS_INVALID_REQUEST);

                done();
            });
        });

        it('Invalid request. Given name with incorrect length. Return 400', (done) => {
            const body: any = {
                email: TestData.VALID_EMAIL,
                given_name: TestData.ONE_LETTER_NAME,
                family_name: TestData.VALID_FAMILY_NAME
            };
            request.post({url: baseUrl + '/users/', body: body, json: true }, (err: any, res: any) => {
                const responseBody = res.body;

                expect(responseBody.message).to.equal(ApiConstants.MESSAGE_INVALID_GIVEN_NAME_LENGTH);
                expect(responseBody.code).to.equal(ApiConstants.ERROR_CODE_CREATE_USER_INVALID_GIVEN_NAME_LENGTH);
                expect(res.statusCode).to.equal(ApiConstants.STATUS_INVALID_REQUEST);

                done();
            });
        });

        it('Invalid request. Given name with incorrect length. Return 400', (done) => {
            const body: any = {
                email: TestData.VALID_EMAIL,
                given_name: TestData.THREE_HUNDRED_LETTERS_NAME,
                family_name: TestData.VALID_FAMILY_NAME
            };
            request.post({url: baseUrl + '/users/', body: body, json: true }, (err: any, res: any) => {
                const responseBody = res.body;

                expect(responseBody.message).to.equal(ApiConstants.MESSAGE_INVALID_GIVEN_NAME_LENGTH);
                expect(responseBody.code).to.equal(ApiConstants.ERROR_CODE_CREATE_USER_INVALID_GIVEN_NAME_LENGTH);
                expect(res.statusCode).to.equal(ApiConstants.STATUS_INVALID_REQUEST);

                done();
            });
        });

        it('Invalid request. Family name with incorrect length. Return 400', (done) => {
            const body: any = {
                email: TestData.VALID_EMAIL,
                given_name: TestData.VALID_GIVEN_NAME,
                family_name: TestData.ONE_LETTER_NAME
            };
            request.post({url: baseUrl + '/users/', body: body, json: true }, (err: any, res: any) => {
                const responseBody = res.body;

                expect(responseBody.message).to.equal(ApiConstants.MESSAGE_INVALID_FAMILY_NAME_LENGTH);
                expect(responseBody.code).to.equal(ApiConstants.ERROR_CODE_CREATE_USER_INVALID_FAMILY_NAME_LENGTH);
                expect(res.statusCode).to.equal(ApiConstants.STATUS_INVALID_REQUEST);

                done();
            });
        });

        it('Invalid request. Family name with incorrect length. Return 400', (done) => {
            const body: any = {
                email: TestData.VALID_EMAIL,
                given_name: TestData.VALID_GIVEN_NAME,
                family_name: TestData.THREE_HUNDRED_LETTERS_NAME
            };
            request.post({url: baseUrl + '/users/', body: body, json: true }, (err: any, res: any) => {
                const responseBody = res.body;

                expect(responseBody.message).to.equal(ApiConstants.MESSAGE_INVALID_FAMILY_NAME_LENGTH);
                expect(responseBody.code).to.equal(ApiConstants.ERROR_CODE_CREATE_USER_INVALID_FAMILY_NAME_LENGTH);
                expect(res.statusCode).to.equal(ApiConstants.STATUS_INVALID_REQUEST);

                done();
            });
        });
    });
});