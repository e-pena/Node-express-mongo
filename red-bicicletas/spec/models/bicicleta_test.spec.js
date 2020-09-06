var Bicicleta = require('../../models/bicicleta');

beforeEach(() => {
	Bicicleta.allBicis = [];
});

describe('Bicicleta.allBicis', () => {
	it('comienza vacía', () => {
		expect(Bicicleta.allBicis.length).toBe(0);
	});
});

describe('Bicicleta.add', () => {
	it('agregamos una', () => {
		expect(Bicicleta.allBicis.length).toBe(0);

		var a = new Bicicleta(1, 'rojo', 'urbana', [-34.6012424, -58.3861497]);
		Bicicleta.add(a);

		expect(Bicicleta.allBicis.length).toBe(1);
		expect(Bicicleta.allBicis[0]).toBe(a);
	});
});

describe('Bicicleta.findById', () => {
	it('debe devolver la bici con id 1', () => {
		expect(Bicicleta.allBicis.length).toBe(0);

		var a = new Bicicleta(1, 'rojo', 'urbana', [-34.6012424, -58.3861497]);
		var b = new Bicicleta(2, 'verde', 'montaña', [-34.6012424, -58.3861497]);

		Bicicleta.add(a);
		Bicicleta.add(b);

		var targetBici = Bicicleta.findByID(1);

		expect(targetBici.id).toBe(1);
		expect(targetBici.color).toBe(targetBici.color);
		expect(targetBici.modelo).toBe(targetBici.modelo);
	});
});

describe('Bicicleta.removeById', () => {
	it('debe eliminar la bici con id 1', () => {
		expect(Bicicleta.allBicis.length).toBe(0);

		var a = new Bicicleta(1, 'rojo', 'urbana', [-34.6012424, -58.3861497]);
		var b = new Bicicleta(2, 'verde', 'montaña', [-34.6012424, -58.3861497]);

		Bicicleta.add(a);
		Bicicleta.add(b);

		Bicicleta.removeById(1);
		expect(Bicicleta.allBicis.length).toBe(1);
	});
});
