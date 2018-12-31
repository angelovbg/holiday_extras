import { expect } from 'chai';
import * as request from 'request';
import { ApiConstants } from '../constants';
import { TestData } from './test.data';

const testData = new TestData();
const baseUrl = testData.url;

describe('/PUT /users/:id' , () => {
    describe('Update user.' , () => {
        it('Valid request. Return 200', (done) => {
            const body: any = {
                email: TestData.VALID_EMAIL_B,
                given_name: TestData.VALID_GIVEN_NAME,
                family_name: TestData.VALID_FAMILY_NAME
            };
            request.put({url: baseUrl + '/users/3', body: body, json: true }, (err: any, res: any) => {
                const responseBody = res.body;

                expect(responseBody.name).to.equal(ApiConstants.MESSAGE_OK);
                expect(res.statusCode).to.equal(ApiConstants.STATUS_OK);

                done();
            });
        });

        it('Invalid request. Existing email. Return 400', (done) => {
            const body: any = {
                email: TestData.VALID_EMAIL_B,
                given_name: TestData.VALID_GIVEN_NAME,
                family_name: TestData.VALID_FAMILY_NAME
            };
            request.put({url: baseUrl + '/users/1', body: body, json: true }, (err: any, res: any) => {
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
            request.put({url: baseUrl + '/users/3', body: body, json: true }, (err: any, res: any) => {
                const responseBody = res.body;

                expect(responseBody.message).to.equal(ApiConstants.MESSAGE_INVALID_EMAIL_FORMAT);
                expect(responseBody.code).to.equal(ApiConstants.ERROR_CODE_UPDATE_USER_INVALID_EMAIL_FORMAT);
                expect(res.statusCode).to.equal(ApiConstants.STATUS_INVALID_REQUEST);

                done();
            });
        });

        it('Invalid request. Missing email property. Return 400', (done) => {
            const body = {};
            request.put(baseUrl + '/users/1', body, (err, res) => {
                const responseBody = JSON.parse(res.body);

                expect(responseBody.message).to.equal(ApiConstants.MESSAGE_MISSING_EMAIL_PROPERTY);
                expect(responseBody.code).to.equal(ApiConstants.ERROR_CODE_UPDATE_USER_MISSING_EMAIL);
                expect(res.statusCode).to.equal(ApiConstants.STATUS_INVALID_REQUEST);

                done();
            });
        });

        it('Invalid request. Missing given_name property. Return 400', (done) => {
            const body: any = { email: TestData.VALID_EMAIL };
            request.put({url: baseUrl + '/users/1', body: body, json: true }, (err: any, res: any) => {
                const responseBody = res.body;

                expect(responseBody.message).to.equal(ApiConstants.MESSAGE_MISSING_GIVEN_NAME_PROPERTY);
                expect(responseBody.code).to.equal(ApiConstants.ERROR_CODE_UPDATE_USER_MISSING_GIVEN_NAME);
                expect(res.statusCode).to.equal(ApiConstants.STATUS_INVALID_REQUEST);
                done();
            });
        });

        it('Invalid request. Missing family_name property. Return 400', (done) => {
            const body: any = {
                email: TestData.VALID_EMAIL,
                given_name: TestData.VALID_GIVEN_NAME
            };
            request.put({url: baseUrl + '/users/1', body: body, json: true }, (err: any, res: any) => {
                const responseBody = res.body;

                expect(responseBody.message).to.equal(ApiConstants.MESSAGE_MISSING_FAMILY_NAME_PROPERTY);
                expect(responseBody.code).to.equal(ApiConstants.ERROR_CODE_UPDATE_USER_MISSING_FAMILY_NAME);
                expect(res.statusCode).to.equal(ApiConstants.STATUS_INVALID_REQUEST);
                done();
            });
        });

        it('Invalid request. Empty body. Return 400', (done) => {
            request.put(baseUrl + '/users/1', (err, res) => {
                const responseBody = JSON.parse(res.body);

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
            request.put({url: baseUrl + '/users/1', body: body, json: true }, (err: any, res: any) => {
                const responseBody = res.body;

                expect(responseBody.message).to.equal(ApiConstants.MESSAGE_INVALID_GIVEN_NAME_LENGTH);
                expect(responseBody.code).to.equal(ApiConstants.ERROR_CODE_UPDATE_USER_INVALID_GIVEN_NAME_LENGTH);
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
            request.put({url: baseUrl + '/users/1', body: body, json: true }, (err: any, res: any) => {
                const responseBody = res.body;

                expect(responseBody.message).to.equal(ApiConstants.MESSAGE_INVALID_GIVEN_NAME_LENGTH);
                expect(responseBody.code).to.equal(ApiConstants.ERROR_CODE_UPDATE_USER_INVALID_GIVEN_NAME_LENGTH);
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
            request.put({url: baseUrl + '/users/1', body: body, json: true }, (err: any, res: any) => {
                const responseBody = res.body;

                expect(responseBody.message).to.equal(ApiConstants.MESSAGE_INVALID_FAMILY_NAME_LENGTH);
                expect(responseBody.code).to.equal(ApiConstants.ERROR_CODE_UPDATE_USER_INVALID_FAMILY_NAME_LENGTH);
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
            request.put({url: baseUrl + '/users/1', body: body, json: true }, (err: any, res: any) => {
                const responseBody = res.body;

                expect(responseBody.message).to.equal(ApiConstants.MESSAGE_INVALID_FAMILY_NAME_LENGTH);
                expect(responseBody.code).to.equal(ApiConstants.ERROR_CODE_UPDATE_USER_INVALID_FAMILY_NAME_LENGTH);
                expect(res.statusCode).to.equal(ApiConstants.STATUS_INVALID_REQUEST);

                done();
            });
        });
    });
});