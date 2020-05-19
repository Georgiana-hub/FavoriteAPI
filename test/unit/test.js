const request = require('supertest');
const { describe, it } = require('mocha');
const chai = require('chai');

const expect = chai.expect;

const url = 'http://localhost:3101/api/v1';

describe('/favorites ROUTES', function () {
	this.timeout(5000);
	it('GET /favorites/idUser route works and returns an array of favorite products', (done) => {
		request(url)
			.get('/favorites/5eb175539dff1b3844a84ab8')
			.expect('Content-Type', /json/)
			.expect(200)
			.end(function (err, res) {
				if (err) return done(err);
				expect(res.body.success).to.equal(true);
				expect(res.body.data.favorites).to.be.a('array');
				done();
			});
	});

	it('DELETE /favorites/:idUser route works and it deletes the list of favorite products for the user.', (done) => {
		request(url)
			.delete('/favorites/5eb175539dff1b3844a84ab8')
			.expect(204, done);
	});

	it('POST /favorites/add-product/idProducts route works and posts a product in a favorite list for an user sent in the body', (done) => {
		request(url)
			.post('/favorites/add-product/5ebcf37026e32517c46f0041')
			.send({
				userId: '5eb175539dff1b3844a84ab8',
			})
			.expect('Content-Type', /json/)
			.expect(201)
			.end(function (err, res) {
				if (err) return done(err);
				expect(res.body.success).to.equal(true);
				done();
			});
	});

	it('POST /favorites/add-product/idProducts route works for invalid idProduct', (done) => {
		request(url)
			.post('/favorites/add-product/1')
			.send({
				userId: '5ebacdb1eedb0a4468bb84c2',
			})
			.expect('Content-Type', /json/)
			.expect(400)
			.end(function (err, res) {
				if (err) return done(err);
				expect(res.body.success).to.equal(false);
				expect(res.body.mesaj).to.equal(
					'Produsul nu exista in baza de date',
				);
				done();
			});
	});
});
