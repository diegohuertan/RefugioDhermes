import * as React from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import ButtonBase from '@mui/material/ButtonBase';




export default function RecipeReviewCard({perros}) {

const handleCardClick = () => {
    // Aquí puedes manejar el evento de clic en la tarjeta
    console.log(`/Perros/${perros._id}`);
};

  return (
    <Link to={`/Perros/${perros._id}`}>
    <ButtonBase onClick={handleCardClick}>
    <Card sx={{marginLeft:7, width: 300, height: 500 , marginTop:5, marginBottom:2, marginRight:0}}>
      <CardHeader
        
        title={perros.nombre}
      />
      <CardMedia
        component="img"
        maxWidth="300"
        height="500"
        image={perros.imagen}
        alt={perros.nombre}
      />
      
      
    </Card>
    </ButtonBase>
    </Link>
  );
}