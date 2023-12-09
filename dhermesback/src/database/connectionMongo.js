const mongoose = require('mongoose');
// Reemplaza esto con tu cadena de conexión de MongoDB Atlas
const uriMongoAtlas = 'mongodb+srv://admin:diego123@cluster0.vlate52.mongodb.net/dhermes_bd';

mongoose.connect(uriMongoAtlas, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).catch(error => console.log(error));

const mongoconnection = mongoose.connection;

mongoconnection.once('open', () => {
    console.log('Conectado a MongoDB Atlas!');
});

module.exports = mongoconnection;