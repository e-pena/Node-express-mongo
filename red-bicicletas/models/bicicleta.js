var Bicicleta = function (id, color, modelo, ubicacion) {
	this.id = id;
	this.color = color;
	this.modelo = modelo;
	this.ubicacion = ubicacion;
};

Bicicleta.prototype.toString = function () {
	return `id: ${this.id} | color: ${this.color}`;
};

Bicicleta.allBicis = [];
Bicicleta.add = function (aBici) {
	Bicicleta.allBicis.push(aBici);
};

Bicicleta.findByID = function (aBiciId) {
	var aBici = Bicicleta.allBicis.find((x) => x.id == aBiciId);
	if (aBici) {
		return aBici;
	} else {
		throw new Error(`No existe una bicicleta con el id ${aBiciId}`);
	}
};

Bicicleta.removeById = function (aBiciId) {
	for (let i = 0; i < Bicicleta.allBicis.length; i++) {
		const element = Bicicleta.allBicis[i];
		if (element.id == aBiciId) {
			Bicicleta.allBicis.splice(i, 1);
			break;
		}
	}
};

module.exports = Bicicleta;
