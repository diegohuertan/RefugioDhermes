import React, { useState } from 'react';
import axios from 'axios';

const serverUrl = 'http://localhost:3000';

function Usuario() {
  const [searchEmail, setSearchEmail] = useState('');
  const [Voluntario, setVoluntario] = useState({
    nombre: '',
    rut: '',
    direccion: '',
    telefono: '',
    correo: '',
    contraseña: '',
    fechaIngreso: '',
    fechaNacimiento: '',
    observaciones: '',
    __v: 0
  });

  const handleSearch = () => {
    axios.post(`${serverUrl}/api/filtrarcorreo`, { "correo": searchEmail })
      .then((response) => {
        setVoluntario(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const searchStyle = {
    margin: '20px 0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  };

  const inputStyle = {
    marginRight: '10px',
    padding: '5px'
  };

  const detailsStyle = {
    padding: '20px',
    borderRadius: '5px'
  };

  return (
    <div>
      <div style={searchStyle}>
        <input
          style={inputStyle}
          type="text"
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
          placeholder="Buscar por correo"
        />
        <button onClick={handleSearch}>Buscar</button>
      </div>

      <div style={detailsStyle}>
        <h2>Detalles del Voluntario</h2>
        <p>Nombre: {Voluntario.nombre}</p>
        <p>RUT: {Voluntario.rut}</p>
        <p>Dirección: {Voluntario.direccion}</p>
        <p>Teléfono: {Voluntario.telefono}</p>
        <p>Correo: {Voluntario.correo}</p>
        <p>Fecha de Ingreso: {Voluntario.fechaIngreso}</p>
        <p>Fecha de Nacimiento: {Voluntario.fechaNacimiento}</p>
        <p>Observaciones: {Voluntario.observaciones}</p>
      </div>
    </div>
  );
}

export default Usuario;