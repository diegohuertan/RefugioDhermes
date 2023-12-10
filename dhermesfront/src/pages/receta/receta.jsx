import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/receta.css';
import PageContainer from '../../components/container/PageContainer';
import RecipeReviewCard from './components/recetacard';

const serverUrl = 'http://localhost:3000';

function Perros() {
  const [perros, setPerros] = useState([]);
  

  useEffect(() => {
    // Realiza la solicitud GET a la API
    axios.get(`${serverUrl}/api/perros`)
      .then((response) => {
        // Actualiza el estado con los datos de la respuesta
        setPerros(response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  return (
    
    <PageContainer title="Vista Recetas" description="aaaaaaaaaaaaaaaaa" >
      
      <div className='receta-container'>
      
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