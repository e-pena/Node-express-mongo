var Bicicleta = require('../../models/bicicleta');

exports.bicicleta_list = function (req, res) {
	res.status(200).json({
		bicicletas: Bicicleta.allBicis,
	});
};

exports.bicicleta_create = function (req, res) {
	var bici = new Bicicleta(req.body.id, req.body.color, req.body.modelo);
	bici.ubicacion = [req.body.lat, req.body.lng];
	Bicicleta.add(bici);

	res.status(200).json({ bicicleta: bici });
};

exports.bicicleta_delete = function (req, res) {
	Bicicleta.removeById(req.params.id);

	res.status(200).send('Elemento eliminado');
};

exports.bicicleta_update = function (req, res) {
	var bici = Bicicleta.findByID(req.params.id);
	bici.id = req.body.id;
	bici.color = req.body.color;
	bici.modelo = req.body.modelo;
	bici.ubicacion = [req.body.lat, req.body.lng];

	res.status(200).json({ bicicleta: bici });
};
