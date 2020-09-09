var mongoose = require('mongoose');
var Bicicleta = require('../../models/bicicleta');

describe('Testing Bicicletas', function () {
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

	describe('Bicicleta.createInstance', () => {
		it('Crea una instancia de bicicleta', () => {
			var bici = Bicicleta.createInstance(1, 'verde', 'urbana', [-34.5, -54.1]);
			expect(bici.code).toBe(1);
			expect(bici.color).toBe('verde');
			expect(bici.modelo).toBe('urbana');
			expect(bici.ubicacion[0]).toEqual(-34.5);
			expect(bici.ubicacion[1]).toEqual(-54.1);
		});
	});

	describe('Bicicletas.allBicis', () => {
		it('Comienza vacía', (done) => {
			Bicicleta.allBicis(function (err, bicis) {
				expect(bicis.length).toBe(0);
				done();
			});
		});
	});

	describe('Bicicleta.add', () => {
		it('Agrega solo una bici', (done) => {
			var aBici = new Bicicleta({ code: 1, color: 'verde', modelo: 'urbana' });
			Bicicleta.add(aBici, function (err, bicis) {
				expect(bicis.code).toEqual(aBici.code);
			});
			done();
		});
	});

	describe('Bicicleta.findByCode', () => {
		it('Devolver la bici con code 1', (done) => {
			Bicicleta.allBicis(function (err, bicis) {
				expect(bicis.length).toBe(0);
				var aBici = new Bicicleta({ code: 1, color: 'verde', modelo: 'urbana' });
				Bicicleta.add(aBici, function (err, newBici) {
					if (err) console.log(err);
					var aBici2 = new Bicicleta({ code: 2, color: 'roja', modelo: 'urbana' });
					Bicicleta.add(aBici, function (err, newBici) {
						if (err) console.log(err);
						Bicicleta.findByCode(1, function (err, targetBici) {
							expect(targetBici.code).toBe(aBici.code);
							expect(targetBici.color).toBe(aBici.color);
							expect(targetBici.modelo).toBe(aBici.modelo);
						});
					});
				});
			});
			done();
		});
	});
});

// beforeEach(() => {
// 	Bicicleta.allBicis = [];
// });

// describe('Bicicleta.allBicis', () => {
// 	it('comienza vacía', () => {
// 		expect(Bicicleta.allBicis.length).toBe(0);
// 	});
// });

// describe('Bicicleta.add', () => {
// 	it('agregamos una', () => {
// 		expect(Bicicleta.allBicis.length).toBe(0);

// 		var a = new Bicicleta(1, 'rojo', 'urbana', [-34.6012424, -58.3861497]);
// 		Bicicleta.add(a);

// 		expect(Bicicleta.allBicis.length).toBe(1);
// 		expect(Bicicleta.allBicis[0]).toBe(a);
// 	});
// });

// describe('Bicicleta.findById', () => {
// 	it('debe devolver la bici con id 1', () => {
// 		expect(Bicicleta.allBicis.length).toBe(0);

// 		var a = new Bicicleta(1, 'rojo', 'urbana', [-34.6012424, -58.3861497]);
// 		var b = new Bicicleta(2, 'verde', 'montaña', [-34.6012424, -58.3861497]);

// 		Bicicleta.add(a);
// 		Bicicleta.add(b);

// 		var targetBici = Bicicleta.findByID(1);

// 		expect(targetBici.id).toBe(1);
// 		expect(targetBici.color).toBe(targetBici.color);
// 		expect(targetBici.modelo).toBe(targetBici.modelo);
// 	});
// });

// describe('Bicicleta.removeById', () => {
// 	it('debe eliminar la bici con id 1', () => {
// 		expect(Bicicleta.allBicis.length).toBe(0);

// 		var a = new Bicicleta(1, 'rojo', 'urbana', [-34.6012424, -58.3861497]);
// 		var b = new Bicicleta(2, 'verde', 'montaña', [-34.6012424, -58.3861497]);

// 		Bicicleta.add(a);
// 		Bicicleta.add(b);

// 		Bicicleta.removeById(1);
// 		expect(Bicicleta.allBicis.length).toBe(1);
// 	});
// });
