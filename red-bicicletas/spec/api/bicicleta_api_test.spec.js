var Bicicleta = require('../../models/bicicleta');
var request = require('request');
var server = require('../../bin/www');
var mongoose = require('mongoose');

var base_url = 'http://localhost:3000/api/bicicletas';

describe('Bicicleta API', () => {
	beforeAll((done) => {
		mongoose.connection.close(done);
	});

	beforeEach(function (done) {
		mongoose.disconnect();
		var mongoDB = 'mongodb+srv://dbUser:pyR2omJnA5ZyioDB@cluster0.azwaf.mongodb.net/test';
		mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
		const db = mongoose.connection;
		db.on('error', console.error.bind(console, 'connection error'));
		db.once('open', function () {
			console.log('Conectados a la test database');
			done();
		});
	});

	afterEach(function (done) {
		Bicicleta.deleteMany({}, function (err, success) {
			if (err) console.log(err);
			done();
		});
	});

	describe('GET BICICLETAS /', () => {
		it('Status 200', (done) => {
			request.get(base_url, function (error, res, body) {
				var result = JSON.parse(body);
				expect(res.statusCode).toBe(200);
				expect(result.bicicletas.length).toBe(0);
				done();
			});
		});
	});

	describe('POST BICICLETAS /create', () => {
		it('Status 200', (done) => {
			var headers = { 'content-type': 'application/json' };
			var aBici = '{ "code": 10, "color": "rojo", "modelo": "urbana", "lat": -34, "lng": -54 }';
			request.post(
				{
					headers: headers,
					url: `${base_url}/create'`,
					body: aBici,
				},
				function (error, res, body) {
					expect(res.statusCode).toBe(200);
					var bici = JSON.parse(body).bicicleta;
					console.log(bici);
					expect(bici.color).toBe('rojo');
					expect(bici.ubicacion[0]).toBe(-34);
					expect(bici.ubicacion[1]).toBe(-54);
					done();
				}
			);
		});
	});

	describe('DELETE BICICLETAS /delete', () => {
		it('Status 200', (done) => {
			var a = Bicicleta.createInstance(1, 'rojo', 'urbana', [-34.6012424, -58.3861497]);
			Bicicleta.add(a, function (err, newBici) {
				var headers = { 'content-type': 'application/json' };
				var aBici = '{ "code": 1, "color": "rojo", "modelo": "urbana", "lat": -34.6012424, "lng": -58.3861497 }';
				request.post({
					headers: headers,
					url: `${base_url}/create'`,
					body: aBici,
				});
			});
			expect(Bicicleta.allBicis.length).toBe(0);

			var a = new Bicicleta(1, 'rojo', 'urbana', [-34.6012424, -58.3861497]);

			request.delete('http://localhost:3000/api/bicicletas/1/delete', function (error, res, body) {
				expect(res.statusCode).toBe(200);
				expect(Bicicleta.allBicis.length).toBe(0);
				done();
			});
		});
	});
});
