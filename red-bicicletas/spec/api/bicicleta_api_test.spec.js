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
			mongoose.disconnect();
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
					url: `${base_url}/create`,
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
		it('Status 204', (done) => {
			var headers = { 'content-type': 'application/json' };
			var aBici = new Bicicleta({ code: 1, color: 'rojo', modelo: 'urbana' });
			aBici.ubicacion = [-34, -54];
			aBici.save(() => {
				request.delete({
					headers: headers,
					url: `${base_url}/delete`,
					body: aBici.code,
				}),
					function (error, res, body) {
						expect(res.statusCode).toBe(204);
						Bicicleta.allBicis((err, resultado) => {
							expect(resultado.length).toBe(0);
						});
					};
				done();
			});
		});
	});
});
