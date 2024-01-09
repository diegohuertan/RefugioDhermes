const { Medicamento } = require('../models/Perro');

exports.getMedicamento = async (req, res) => {
    try {
        const medicamento = await Medicamento.find();
        res.json(medicamento);
    } catch (error) {
        console.error(err.message);
        res.status(500).send('Error en el servidor');
    }
}

exports.createMedicamento = async (req, res) => {
    try {
        const medicamento = new Medicamento(req.body);
        await medicamento.save();
        res.status(201).json({medicamento});
    } catch (error) {
        res.status(404).json({error});
    }
}
