import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/usuario.css';
import PageContainer from '../../components/container/PageContainer';
import RecipeReviewCard from '../receta/components/recetacard';
import { Paper, Typography } from '@mui/material';

//import Button from 'react-bootstrap/Button';
//import Modal from 'react-bootstrap/Modal';

const serverUrl='http://localhost:3000';

function Usuario() {
    const [userData, setUserData] = useState([]);
    const [open, setOpen] = useState(false);
    const [Usuario, setUsuario] = useState({ usuario_id: '', correo: '' });
  
    useEffect(() => {
      const token = sessionStorage.getItem('token');
  
      axios.post(`${serverUrl}/api/obtenerUsuario`, { token })
        .then((response) => {    
          const { usuario_id, correo } = response.data;
          
          setUsuario({ usuario_id, correo });
          console.log(Usuario);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }, []);
    
    useEffect(() => {
      // Realiza la solicitud GET a la API
      
      
      axios.post(`${serverUrl}/api/filterByUsuario`,{"usuario":Usuario})
        .then((response) => {
          // Actualiza el estado con los datos de la respuesta
          setUsuario(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }, []);



    const recuadroStyle = {
      border: '1px solid #ccc',
      padding: '10px',
      borderRadius: '5px',
      boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
      maxWidth: '300px', // Puedes ajustar el ancho según tus necesidades
      margin: 'auto',
      marginTop: '20px',}


    return (
      <PageContainer title="Vista Recetas" description="aaaaaaaaaaaaaaaaa">
      <><div style={recuadroStyle}>
        <h2>Detalles del Usuario</h2>
        <p>Usuario id: {Usuario.usuario_id}</p>
        <p>Correo del Usuario: {Usuario.correo}</p>
      </div>

          </>
        </PageContainer>
     );
  }
  
  export default Usuario;