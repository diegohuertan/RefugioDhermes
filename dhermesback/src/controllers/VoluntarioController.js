const {Voluntario} = require('../models/Perro');
const bcrypt = require('bcrypt');
const saltRounds = 5;
const jwt = require('jsonwebtoken');

exports.createVoluntario = async (req, res) => {
 try{
        const voluntario = new Voluntario(req.body);
        voluntario.contraseña = await bcrypt.hash(voluntario.contraseña, saltRounds);
        await voluntario.save();
        res.status(201).json({voluntario})
 }
    catch(error){
        res.status(404).json({error})
    }
}

exports.validarUser = async (req, res) => {
    const { correo, contraseña } = req.body;

    try {
        const usuario = await Voluntario.findOne({ correo });

        if (!usuario) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        const isMatch = await bcrypt.compare(contraseña, usuario.contraseña);

        if (!isMatch) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        // Crear un nuevo objeto a partir del objeto usuario y eliminar la propiedad de la contraseña
        const usuarioParaToken = usuario.toObject();
        delete usuarioParaToken.contraseña;

        const token = jwt.sign(usuarioParaToken, 'clavesita', { expiresIn: '1h' });

        res.status(200).json({ success: true, message: 'Inicio de sesión exitoso token creado', token: token });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error en el servidor');
    }
};
exports.ObtenerUsuarioPorjwt = (req, res) => {
    const token = req.headers.authorization.split(" ")[1];

    jwt.verify(token, 'clavesita', function(err, decoded) {
        if (err) {
            console.error(err.message);
            return res.status(500).send('Error en el servidor');
        } else {
            Voluntario.findById(decoded.id, function(err, voluntario) {
                if (err) {
                    console.error(err.message);
                    return res.status(500).send('Error en el servidor');
                } else {
                    res.status(200).json(voluntario);
                }
            });
        }
    });
};
exports.filterbycorreo = async (req, res) => {
    const { correo } = req.body;
    console.log(correo); // Agregar este log para verificar el ID recibido

    try {
        const voluntarioEncontrado = await Voluntario.findOne({correo:correo});
        console.log('Voluntario encontrado:', voluntarioEncontrado); // Agregar este log para verificar el perro encontrado

        if (!voluntarioEncontrado) {
            return res.status(404).json({ msg: 'no encontrado' });
        }
        res.status(200).json(voluntarioEncontrado);
    } catch (err) {
        console.error(err.message);
        if (err.kind == 'ObjectId') {
            return res.status(404).json({ msg: 'no encontrado' });
        }
        res.status(500).send('Error en el servidor');
    }
}