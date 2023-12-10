const {Perro, Tratamiento, Medicamento} = require('../models/Perro');



exports.getPerros = async (req, res) => {
    try {
        const perros = await Perro.find();
        res.json(perros);
    } catch (error) {
        console.error(err.message);
        res.status(500).send('Error en el servidor');
    }
}

exports.createPerro = async (req, res) => {
    try {
        const perro = new Perro(req.body);
        await perro.save();
        res.status(200).json({perro});
    } catch (error) {
        res.status(404).json({error});
    }
}

exports.filterbyidPerros = async (req, res) => {
    const { id } = req.body;

    console.log(id); // Agregar este log para verificar el ID recibido

    try {
        const perroEncontrado = await Perro.findById(id);
        console.log('Perro encontrado:', perroEncontrado); // Agregar este log para verificar el perro encontrado

        if (!perroEncontrado) {
            return res.status(404).json({ msg: 'no encontrado' });
        }
        res.status(200).json(perroEncontrado);
    } catch (err) {
        console.error(err.message);
        if (err.kind == 'ObjectId') {
            return res.status(404).json({ msg: 'no encontrado' });
        }
        res.status(500).send('Error en el servidor');
    }
};