import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/receta.css';
import PageContainer from '../../components/container/PageContainer';
import RecipeReviewCard from './components/recetacard';
import { TextField, Button , Grid} from '@mui/material';


const serverUrl = 'http://localhost:3000';

function Perros() {
  const [perros, setPerros] = useState([]);
  const [perroBuscado, setPerroBuscado] = useState([]);
  

  useEffect(() => {
    // Realiza la solicitud GET a la API
    axios.get(`${serverUrl}/api/perros`)
      .then((response) => {
        // Actualiza el estado con los datos de la respuesta
        setPerros(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  const handleSearch = () => {
    console.log(perroBuscado);
    axios.post(`${serverUrl}/api/filtrarNombre`, { "nombre": perroBuscado })
      .then((response) => {
        // Convierte el objeto de perro en un array de perros
        const perroArray = [response.data];
        console.log(perroArray);
        // Actualiza el estado 'perros' con el array de perros
        setPerros(perroArray);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  

  return (
    
    <PageContainer title="Vista Recetas" description="aaaaaaaaaaaaaaaaa" >
    
      <div className='receta-container'>
      <div>
      <Grid container spacing={1} justify="center" sx={{marginTop: 5 ,marginLeft:5}}>
          <TextField label="Buscar" variant="outlined" value={perroBuscado} onChange={e => setPerroBuscado(e.target.value)} />
          <Button variant="contained" color="primary" onClick={handleSearch}>
            Buscar
          </Button>
        </Grid>
      </div>
      {perros.map((perro) => (
        <RecipeReviewCard  className='receta-card'

          key={perro.nombre} 
          perros={perro} 
        />
      ))}
      </div>
    </PageContainer>
  );
}

export default Perros;