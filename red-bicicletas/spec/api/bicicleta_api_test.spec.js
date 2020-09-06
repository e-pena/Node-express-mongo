var Bicicleta = require('../../models/bicicleta');
var request = require('request');
var server = require('../../bin/www');

describe('Bicicleta API', () => {
	describe('GET BICICLETAS /', () => {
		it('Status 200', () => {
			expect(Bicicleta.allBicis.length).toBe(0);

			var a = new Bicicleta(1, 'rojo', 'urbana', [-34.6012424, -58.3861497]);
			Bicicleta.add(a);

			request.get('http://localhost:3000/api/bicicletas', function (error, res, body) {
				expect(res.statusCode).toBe(200);
			});
		});
	});

	describe('POST BICICLETAS /create', () => {
		it('Status 200', (done) => {
			var headers = { 'content-type': 'application/json' };
			var aBici = '{ "id": 10, "color": "rojo", "modelo": "urbana", "lat": -34, "lng": -54 }';

			request.post(
				{
					headers: headers,
					url: 'http://localhost:3000/api/bicicletas/create',
					body: aBici,
				},
				function (error, res, body) {
					expect(res.statusCode).toBe(200);
					expect(Bicicleta.findByID(10).color).toBe('rojo');
					done();
				}
			);
		});
	});

	describe('DELETE BICICLETAS /1/delete', () => {
		it('Status 200', (done) => {
			expect(Bicicleta.allBicis.length).toBe(0);

			var a = new Bicicleta(1, 'rojo', 'urbana', [-34.6012424, -58.3861497]);
			Bicicleta.add(a);

			request.delete('http://localhost:3000/api/bicicletas/1/delete', function (error, res, body) {
				expect(res.statusCode).toBe(200);
				expect(Bicicleta.allBicis.length).toBe(0);
				done();
			});
		});
	});
});
