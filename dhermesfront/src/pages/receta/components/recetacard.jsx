import * as React from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import ButtonBase from '@mui/material/ButtonBase';




export default function RecipeReviewCard({receta}) {

const handleCardClick = () => {
    // Aquí puedes manejar el evento de clic en la tarjeta
    console.log(`/RecetaInfo/${receta._id}`);
};

  return (
    <Link to={`/RecetaInfo/${receta._id}`}>
    <ButtonBase onClick={handleCardClick}>
    <Card sx={{marginLeft:10, width: 300, height: 500 , marginTop:5, marginBottom:2, marginRight:0}}>
      <CardHeader
        
        title={receta.titulo}
      />
      <CardMedia
        component="img"
        maxWidth="300"
        height="300"
        image={receta.imagen}
        alt={receta.titulo}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {receta.descripcion}
        </Typography>
      </CardContent>
      
    </Card>
    </ButtonBase>
    </Link>
  );
}