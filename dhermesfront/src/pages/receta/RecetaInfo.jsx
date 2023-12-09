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

function RecetaInfo() {
  const [RecetaInfo, setRecetaInfo] = useState([]);
  const { id } = useParams();
  const [comentario, setComentario] = useState('');
  const [puntuacion, setPuntuacion] = useState('');
  const [open, setOpen] = useState(false);
  const [Usuario, setUsuario] = useState({ usuario_id: '', correo: '' });
  const [RecetaConVal, setRecetaConVal] = useState([]);
  
  const columns = [
    { field: 'comentario', headerName: 'Comentario', width: 200 },
    { field: 'puntuacion', headerName: 'Puntuación', width: 130 },
    { field: 'correo', headerName: 'Correo', width: 200 },
  ];


  useEffect(() => {
    const token = sessionStorage.getItem('token');

    axios.post(`${serverUrl}/api/obtenerUsuario`, { token })
      .then((response) => {
        console.log(response.data);      
        const { usuario_id, correo } = response.data;
        setUsuario({ usuario_id, correo });
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

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
  const data = {
    Receta_id: RecetaInfo._id,
    usuario: {usuario_id:Usuario.usuario_id,correo: Usuario.correo},
    comentario, 
    puntuacion
  };

  // Llamada a la API para crear una valoración
  axios.post(`${serverUrl}/api/crearValoracion`, data, {
  
  })
  .then((response) => {
    console.log("valoracion creada",response.data);
    setRecetaConVal(response.data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
};

  const handleChange = (event) => {
    setComentario(event.target.value);
  };

  const handleRatingChange = (event, newValue) => {
    setPuntuacion(newValue);
  };

  let rows = [];

  if (RecetaConVal && RecetaConVal.valoraciones) {
    rows = RecetaConVal.valoraciones.map((valoracion, index) => ({
      id: index,
      comentario: valoracion.comentario,
      puntuacion: valoracion.puntuacion,
      correo: valoracion.usuario.correo,
    }));
  }

useEffect(() => {
  const body = {receta_id: id}
  axios.post(`${serverUrl}/api/filtrarId`, body)
  .then((response) => {
    // Actualiza el estado con los datos de la respuesta
    setRecetaInfo(response.data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}, []);  





return (
  <PageContainer title="Vista Recetas" description="aaaaaaaaaaaaaaaaa" >
    <div className='receta-container'>
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <MuiAlert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
        Debes estar autenticado para enviar un comentario.
      </MuiAlert>
    </Snackbar>
      <Link to={`/Recetas`} style={{marginLeft:10,marginTop:10}}>
        <Button variant="contained" color="primary"  sx={{backgroundColor: 'grey'}}>
          <ArrowBackIosNewIcon/> Volver
        </Button>
      </Link>
      <Grid container spacing={2}>  
        {RecetaInfo && <>
          
          <Grid sx={{marginTop:3, marginLeft:4}} item xs={12} sm={6} md={5}>
          <img src={RecetaInfo.imagen} alt={RecetaInfo.titulo} style={{ width:'100%', marginBottom:20}}  />
          
          <Typography variant="h6" gutterBottom>
              {RecetaInfo.descripcion}
            </Typography>
            <Paper sx={{padding:1, marginBottom:2, border: '1px solid black'}}>
           <Typography variant="h6" gutterBottom style={{ borderBottom: '1px solid black' , padding:4}}>
              Ingredientes
            </Typography>
            {RecetaInfo.ingredientes && <ul>
              {RecetaInfo.ingredientes.map((ingrediente, index) => (
                <li key={index}>{ingrediente.nombre}</li>
              ))}
            </ul>}
            <Typography variant="h6" gutterBottom style={{ borderBottom: '1px solid black' , padding:4}}>
              Utensilios
            </Typography>
            {RecetaInfo.utensilios && <ul>
              {RecetaInfo.utensilios.map((utensilio, index) => (
                <li key={index}>{utensilio.nombre}</li>
              ))}
            </ul>}
            
            </Paper>
            
          </Grid>
          <Grid sx={{marginTop:3, textAlign:'justify', marginRight:2}} item xs={12} sm={6} md={5}>
            <Typography variant="h4" gutterBottom style={{ borderBottom: '2px solid black' }}>
              {RecetaInfo.titulo}
            </Typography>
            
            
            <Paper sx={{padding:2, marginBottom:2, border: '1px solid black'}}>
            <Typography variant="h6" gutterBottom style={{ borderBottom: '1px solid black' , padding:4}}>
              Preparacion
            </Typography>
           
           {RecetaInfo.procedimientos && <ol>
             {RecetaInfo.procedimientos.map((procedimiento, index) => (
               <li key={index}>{procedimiento.instruccion}</li>
             ))}
           </ol>}
           </Paper>
           <Paper sx={{padding:2, marginBottom:2, border: '1px solid black'}}>
           <form onSubmit={handleSubmit}>
            <TextField 
              fullWidth 
              label="Comentario" 
              id="fullWidth" 
              value={comentario} 
              onChange={handleChange} 
            />
            <Rating
              name="simple-controlled"
              value={puntuacion}
              onChange={handleRatingChange}
            />
            <Button 
              variant="contained" 
              color="primary"  
              sx={{backgroundColor: 'grey', marginTop:1, marginLeft:1}} 
              type="submit"
            >
              Comentar
            </Button>
          </form>
          </Paper>
           <form onSubmit={handleSubmit}>
           
            <Button 
              variant="contained" 
              color="primary"  
              sx={{backgroundColor: 'grey', marginTop:1, marginLeft:1}} 
              type="submit"
            >
              Ver valoraciones
            </Button>
          </form>
          </Grid>
            
          
        </>}
     
      </Grid>
      <TableContainer component={Paper} sx={{marginBottom:1, padding:1}}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Comentario</TableCell>
            <TableCell align="right">Puntuación</TableCell>
            <TableCell align="right">Correo</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.comentario}
              </TableCell>
              <TableCell align="right">{row.puntuacion}</TableCell>
              <TableCell align="right">{row.correo}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  </PageContainer>
);
  }

export default RecetaInfo;