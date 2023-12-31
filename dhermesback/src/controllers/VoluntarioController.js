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

        const token = jwt.sign({ _id: usuario._id, correo: correo }, 'clavesita', { expiresIn: '1h' });

        res.status(200).json({ success: true, message: 'Inicio de sesión exitoso token creado', token: token });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error en el servidor');
    }
};