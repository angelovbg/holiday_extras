import { expect } from 'chai';
import * as request from 'request';
import { ApiConstants } from '../constants';
import { TestData } from './test.data';

const testData = new TestData();
const baseUrl = testData.url;

describe('/GET get all users /users/', () => {
    it('Valid request. Return 200', (done) => {
        request.get(baseUrl + '/users', (err, res) => {
            const responseBody = JSON.parse(res.body);

            expect(res.statusCode).to.equal(ApiConstants.STATUS_OK);
            expect(responseBody.hasOwnProperty('data'));
            expect(responseBody.data.length).to.be.greaterThan(1);
            done();
        });
    });
});

describe('/GET Get user by id /users/:id', () => {
    it('Valid request. Return 200', (done) => {
        request.get(baseUrl + '/users/1', (err, res) => {
            const responseBody = JSON.parse(res.body);

            expect(res.statusCode).to.equal(ApiConstants.STATUS_OK);
            expect(responseBody.data.id).to.equal(1);

            done();
        });
    });

    it('Invalid request. Negative id. Return 404', (done) => {
        request.get(baseUrl + '/users/-1', (err, res) => {
            expect(res.statusCode).to.equal(ApiConstants.STATUS_NOT_FOUND);

            done();
        });
    });
});

