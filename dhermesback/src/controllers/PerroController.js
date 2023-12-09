const {Perro, Tratamiento, Voluntario, Medicamento} = require('../models/Perro');



exports.getPerros = async (req, res) => {
    try {
        const perros = await Perro.find();
        res.status(200).json({perros});
    } catch (error) {
        res.status(404).json({error});
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