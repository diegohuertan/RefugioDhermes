import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/receta.css';
import PageContainer from '../../components/container/PageContainer';
import RecipeReviewCard from './components/recetacard';

const serverUrl = 'http://localhost:3000';

function Recetas() {
  const [recetas, setRecetas] = useState([]);
  

  useEffect(() => {
    // Realiza la solicitud GET a la API
    axios.get(`${serverUrl}/api/recetas`)
      .then((response) => {
        // Actualiza el estado con los datos de la respuesta
        setRecetas(response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  return (
    
    <PageContainer title="Vista Recetas" description="aaaaaaaaaaaaaaaaa" >
      
      <div className='receta-container'>
      
      {recetas.map((receta) => (
        <RecipeReviewCard  className='receta-card'

          key={receta.receta_id} 
          receta={receta} 
        />
      ))}
      </div>
    </PageContainer>
  );
}

export default Recetas;