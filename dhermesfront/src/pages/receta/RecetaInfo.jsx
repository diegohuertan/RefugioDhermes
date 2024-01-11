import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/receta.css';
import PageContainer from '../../components/container/PageContainer';
import { useParams } from 'react-router-dom';

import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';



const serverUrl = 'http://localhost:3000';

function PerroInfo() {
  const [PerroInfo, setPerroInfo] = useState([]);
  const { id } = useParams();
  
  




useEffect(() => {
  const body = {id: id}
  axios.post(`${serverUrl}/api/filtrarId`, body)
  .then((response) => {
    // Actualiza el estado con los datos de la respuesta
    setPerroInfo(response.data);
    console.log("perroinfo")
    console.log(response.data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}, []);  





return (
  <PageContainer title="Vista Recetas" description="aaaaaaaaaaaaaaaaa" >
    <div className='receta-container'>
    <Button sx={{margin:1}} component={Link} to={`/perros`} variant="contained" color="primary">
            Volver
            </Button>
    <Grid container spacing={2}>  
      {PerroInfo && <>
        <Grid item xs={12} sm={6} md={6}>
          <Paper sx={{padding:1, marginBottom:2, border: '1px solid black', marginTop:2}}>
            <img src={PerroInfo.imagen} alt={PerroInfo.nombre} style={{ width:'100%', marginBottom:20}}  />
            <Typography variant="h6" gutterBottom>
              {PerroInfo.nombre}
            </Typography>
            <Typography variant="h6" gutterBottom style={{ borderBottom: '1px solid black' , padding:4}}>
              Datos
            </Typography>
            <Typography variant="body1" gutterBottom>
              Fecha de ingreso: {PerroInfo?.Datos?.fechaIngreso}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Fecha de nacimiento: {PerroInfo?.Datos?.fechaNacimiento}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Fecha de esterilización: {PerroInfo?.Datos?.esterilizacion?.fecha}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Lugar de esterilización: {PerroInfo?.Datos?.esterilizacion?.lugar}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <Paper sx={{padding:1, marginBottom:2, border: '1px solid black', marginTop:2}}>
            <Typography variant="h6" gutterBottom style={{ borderBottom: '1px solid black' , padding:4}}>
              Adopción
            </Typography>
            <Typography variant="body1" gutterBottom>
              Fecha de adopción: {PerroInfo?.Datos?.Adopcion?.fecha}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Persona: {PerroInfo?.Datos?.Adopcion?.Persona?.nombre}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Rut: {PerroInfo?.Datos?.Adopcion?.Persona?.rut}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Dirección: {PerroInfo?.Datos?.Adopcion?.Persona?.direccion}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Teléfono: {PerroInfo?.Datos?.Adopcion?.Persona?.telefono}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Correo: {PerroInfo?.Datos?.Adopcion?.Persona?.correo}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Retorno: {PerroInfo?.Datos?.Adopcion?.Persona?.retorno}
            </Typography>
          </Paper>
          <Paper sx={{padding:1, marginBottom:2, border: '1px solid black', marginTop:2}}>
    <Typography variant="h6" gutterBottom style={{ borderBottom: '1px solid black' , padding:4}}>
      Vacunas
    </Typography>
    <Typography variant="body1" gutterBottom>
      Antirrábica: {PerroInfo?.Vacunas?.Antirabica}
    </Typography>
    <Typography variant="body1" gutterBottom>
      Antiparasitario Externo: {PerroInfo?.Vacunas?.antiparasitarioExterno}
    </Typography>
    <Typography variant="body1" gutterBottom>
      Antiparasitario Interno: {PerroInfo?.Vacunas?.antiparasitarioInterno}
    </Typography>
    <Typography variant="body1" gutterBottom>
      Vacuna 1: {PerroInfo?.Vacunas?.vacuna1}
    </Typography>
    <Typography variant="body1" gutterBottom>
      Vacuna 2: {PerroInfo?.Vacunas?.vacuna2}
    </Typography>
    <Typography variant="body1" gutterBottom>
      Vacuna Anual: {PerroInfo?.Vacunas?.vacunaAnual}
    </Typography>
  </Paper>
          <Paper sx={{padding:1, marginBottom:2, border: '1px solid black'}}>
            <Typography variant="h6" gutterBottom style={{ borderBottom: '1px solid black' , padding:4}}>
              Tratamientos
            </Typography>
            <Link to={`/vertratamientos/${id}`} style={{ textDecoration: 'none' }}>
              <Button variant="contained" color="primary">
                Ver Tratamiento Asociado
              </Button>
            </Link>
          </Paper>
        </Grid>
      </>}
    </Grid>
    </div>
  </PageContainer>
);
  }

export default PerroInfo;