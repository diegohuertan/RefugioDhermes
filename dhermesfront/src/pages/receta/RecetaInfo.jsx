import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/receta.css';
import PageContainer from '../../components/container/PageContainer';
import { useParams } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Grid, TextField } from '@mui/material';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Rating from '@mui/material/Rating';
import { Navigate } from 'react-router-dom';
import { Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';


const serverUrl = 'http://localhost:3000';

function PerroInfo() {
  const [PerroInfo, setPerroInfo] = useState([]);
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  
  


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

const handleSubmit = (event) => {
  event.preventDefault();
  const token = sessionStorage.getItem('token');
  if (!token) {
    setOpen(true);
  }

  }

useEffect(() => {
  const body = {id: id}
  axios.post(`${serverUrl}/api/filtrarId`, body)
  .then((response) => {
    // Actualiza el estado con los datos de la respuesta
    setPerroInfo(response.data);
    console.log(response.data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}, []);  





return (
  <PageContainer title="Vista Recetas" description="aaaaaaaaaaaaaaaaa" >
    <div className='receta-container'>
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
              Fecha de esterilización: {PerroInfo?.esterilizacion?.fecha}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Lugar de esterilización: {PerroInfo?.esterilizacion?.lugar}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <Paper sx={{padding:1, marginBottom:2, border: '1px solid black', marginTop:2}}>
            <Typography variant="h6" gutterBottom style={{ borderBottom: '1px solid black' , padding:4}}>
              Adopción
            </Typography>
            <Typography variant="body1" gutterBottom>
              Fecha de adopción: {PerroInfo?.Adopcion?.fecha}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Persona: {PerroInfo?.Persona?.nombre}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Rut: {PerroInfo?.Persona?.rut}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Dirección: {PerroInfo?.Persona?.direccion}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Teléfono: {PerroInfo?.Persona?.telefono}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Correo: {PerroInfo?.Persona?.correo}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Retorno: {PerroInfo?.Persona?.retorno}
            </Typography>
          </Paper>
          <Paper sx={{padding:1, marginBottom:2, border: '1px solid black'}}>
            <Typography variant="h6" gutterBottom style={{ borderBottom: '1px solid black' , padding:4}}>
              Tratamientos
            </Typography>
            {/* Aquí puedes agregar la información de los tratamientos */}
          </Paper>
        </Grid>
      </>}
    </Grid>
    </div>
  </PageContainer>
);
  }

export default PerroInfo;