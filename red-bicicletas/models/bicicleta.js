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
	var bicicleta = Bicicleta.findByID(aBiciId);
	var indice = Bicicleta.allBicis.indexOf(bicicleta);
	console.log(indice);
	return Bicicleta.allBicis.splice(indice, 1);
};

module.exports = Bicicleta;
