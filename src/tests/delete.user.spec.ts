import { expect } from 'chai';
import * as request from 'request';
import { ApiConstants } from '../constants';

const baseUrl = 'http://localhost:3000';

describe('/DELETE delete user by id /users/:id', () => {
    it('Valid request. Return 200', (done) => {
        request.delete(baseUrl + '/users/2', (err, res) => {
            expect(res.statusCode).to.equal(ApiConstants.STATUS_OK);
            done();
        });
    });

    it('Invalid request. Negative id. Return 404', (done) => {
        request.delete(baseUrl + '/users/-2', (err, res) => {
            const responseBody = JSON.parse(res.body);

            expect(responseBody.message).to.equal(ApiConstants.MESSAGE_OBJECT_NOT_FOUND);
            expect(res.statusCode).to.equal(ApiConstants.STATUS_NOT_FOUND);
            done();
        });
    });
});

