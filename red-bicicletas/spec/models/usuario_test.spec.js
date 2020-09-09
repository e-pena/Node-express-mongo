var mongoose = require('mongoose');
var Bicicleta = require('../../models/bicicleta');
var Usuario = require('../../models/usuario');
var Reserva = require('../../models/reserva');
const bicicleta = require('../../models/bicicleta');

describe('Testing Usuarios', function () {
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
		Reserva.deleteMany({}, function (err, success) {
			if (err) console.log(err);
			Usuario.deleteMany({}, function (err, success) {
				if (err) console.log(err);
				Bicicleta.deleteMany({}, function (err, success) {
					if (err) console.log(err);
					done();
					mongoose.disconnect();
				});
			});
		});
	});

	describe('Cuando un usuario reserva una bici', () => {
		it('debe existir la reserva', (done) => {
			const usuario = new Usuario({ nombre: 'Esteban' });
			usuario.save();
			const bicicleta = new Bicicleta({ code: 1, color: 'verde', modelo: 'urbana' });
			bicicleta.save();

			var hoy = new Date();
			var maniana = new Date();
			maniana.setDate(hoy.getDate() + 1);
			usuario.reservar(bicicleta.id, hoy, maniana, function (err, reserva) {
				Reserva.find({})
					.populate('bicicleta')
					.populate('usuario')
					.exec(function (reservas) {
						console.log(reservas[0]);
						expect(reservas.length).toBe(1);
						expect(reservas[0].diasDeReserva()).toBe(2);
						expect(reservas[0].bicicleta.code).toBe(1);
						expect(reservas[0].usuario.nombre).toBe(usuario.nombre);
						done();
					});
			});
		});
	});
});
