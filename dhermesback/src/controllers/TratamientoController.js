const {Tratamiento,Perro} = require('../models/Perro');

exports.getTratamiento = async (req, res) => {
    try {
        const tratamiento = await Tratamiento.find();
        res.json(tratamiento);
    } catch (error) {
        console.error(err.message);
        res.status(500).send('Error en el servidor');
    }
}

exports.createTratamiento = async (req, res) => {   
    try {
        const tratamiento = new Tratamiento(req.body);
        await tratamiento.save();
        res.status(201).json({tratamiento});
    } catch (error) {
        res.status(404).json({error});
    }
}
exports.filterbyidperros = async (req, res) => {
    try {
        const perro = await Perro.findById(req.body._id)
            .populate({
                path: 'Tratamientos',
                populate: {
                    path: 'medicamentos',
                    model: 'Medicamento'
                }
            });
        res.json(perro.Tratamientos);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Error en el servidor');
    }
}