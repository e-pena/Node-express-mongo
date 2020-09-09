var Bicicleta = require('../../models/bicicleta');

exports.bicicleta_list = function (req, res) {
	Bicicleta.find({}, (err, bicis) => {
		res.status(200).json({
			bicicletas: bicis,
		});
	});
};

exports.bicicleta_create = function (req, res) {
	var bici = new Bicicleta(req.body.code, req.body.color, req.body.modelo);
	bici.ubicacion = [req.body.lat, req.body.lng];
	bici.save((err) => {
		if (err) console.log('Algo falló');
		res.status(200).json({ bicicleta: bici });
	});
};

exports.bicicleta_delete = function (req, res) {
	Bicicleta.removeByCode(req.body, (err, resultado) => {
		if (err) console.log('Algo falló');
		res.status(204).send('Bicicleta eliminada');
	});
};

exports.bicicleta_update = function (req, res) {
	var bici = Bicicleta.findByCode(req.body.code);
	bici.color = req.body.color;
	bici.modelo = req.body.modelo;
	bici.ubicacion = [req.body.lat, req.body.lng];
	bici.save((err) => {
		if (err) console.log('Algo falló');
		res.status(200).json({ bicicleta: bici });
	});
};
