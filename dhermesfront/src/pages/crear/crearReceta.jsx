import React, { useState , useEffect} from 'react';
import axios from 'axios';
import '../../styles/crearReceta.css';
import PageContainer from '../../components/container/PageContainer';
import { Grid, Paper, Typography } from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';



const serverUrl = 'http://localhost:3000';

function CrearReceta() {
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [imagen, setImagen] = useState(null);
    const [ListIngredientes, setListIngredientes] = useState([]);
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [ListUtensilios, setListUtensilios] = useState([]);
    const [selectedUtensilios, setSelectedUtensilios] = useState([]);
    const [Usuario, setUsuario] = useState([]);
    const [pasos, setPasos] = useState([""]);


    const navigate = useNavigate();

    const resetForm = () => {
        setTitulo('');
        setDescripcion('');
        setImagen(null);
        setSelectedIngredients([]);
        setSelectedUtensilios([]);
        setPasos([""]);

        navigate('/recetas');
    };

useEffect(() => {
    const token = sessionStorage.getItem('token');

    axios.post(`${serverUrl}/api/obtenerUsuario`, { token })
        .then((response) => {
            const { usuario_id, correo } = response.data;
            setUsuario({ usuario_id, correo });
            console.log({ usuario_id, correo });
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}, []);
    useEffect(() => {
    axios.get(`${serverUrl}/api/ingredientes`)
        .then((response) => {
            const nombres = response.data.map(ingrediente => ingrediente.nombre);
            setListIngredientes(nombres); // Aquí se actualiza el estado
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}, []);

useEffect(() => {
        axios.get(`${serverUrl}/api/utensilios`)
        .then((response) => {
            const nombres = response.data.map(utensilio => utensilio.nombre);
            setListUtensilios(nombres); // Aquí se actualiza el estado
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}, []);

   

    const handleImagenChange = (event) => {
        setImagen(event.target.value);
      };

    
      const agregarPaso = () => {
        if (pasos[pasos.length - 1] !== "") {
          setPasos((prevPasos) => [...prevPasos, ""]);
        }
      };

    const handleDescripcionChange = (event) => {
        setDescripcion(event.target.value);
    };
    const handleTituloChange = (event) => {
        setTitulo(event.target.value);
    };

      const handlePasoChange = (index, event) => {
        const newPasos = [...pasos];
        newPasos[index] = event.target.value;
        setPasos(newPasos);
      };

    const handleSubmit = (event) => {
        event.preventDefault();

        const nuevaReceta = {
            titulo,
            descripcion,
            imagen,
            ingredientes: selectedIngredients.map((nombre) => ({ nombre })),
            valoraciones: [], // Aquí debes agregar el estado para las valoraciones si lo tienes
            utensilios: selectedUtensilios.map((nombre) => ({ nombre })),
            procedimientos: pasos.map((instruccion, index) => ({
                Numpaso: index + 1,
                instruccion,
            })),
            usuario: {
                usuario_id: Usuario.usuario_id,
                correo: Usuario.correo,
              },        };
              console.log(nuevaReceta); 
              console.log(Usuario);

        axios.post(`${serverUrl}/api/crearReceta`, nuevaReceta)
            .then((response) => {
                console.log('Receta creada:', response.data);
                alert('Receta creada con exito');
                resetForm();
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        
        
        <PageContainer >
        <Box height="100%">
        <Grid container spacing={0} padding={2}>
            <Grid item xs={12} md={5} marginBottom={1} marginRight={3}>
                
                
                    <Paper sx={{ padding:1}}>
                    <Typography variant="h6" gutterBottom component="div">
                        Url de la imagen
                    </Typography>
                    <TextField fullWidth label="Url de la imagen" id="fullWidth" value={imagen} onChange={handleImagenChange} />
                <FileUploadIcon sx={{alignItems:'center', height:100, minWidth:100}}/>
                </Paper>

                <Paper sx={{marginTop: 2, padding:2}}>
                    <Typography variant="h6" gutterBottom component="div">
                     Crear Receta
                    </Typography>
                    <TextField
                        sx={{marginTop: 2}}
                        fullWidth
                        label="Titulo Receta"
                        id="fullWidth"
                        value={titulo}
                        onChange={handleTituloChange}
                    />

                    <TextField
                       sx={{marginTop: 2}}

                        fullWidth
                        multiline
                        label='Descripcion'
                        placeholder='Descripcion de la receta'
                        value={descripcion}
                        onChange={handleDescripcionChange}
                    />            

                </Paper>
                <Paper sx={{marginTop: 2, padding:2}}>
                <Typography variant="h6" gutterBottom component="div">
                    Pasos De La Receta
                </Typography>
                {pasos.map((paso, index) => (
                <TextField
                    sx={{marginTop: 2}}
                    fullWidth
                    key={index}
                    label="Pasos"
                    value={paso}
                    onChange={(event) => handlePasoChange(index, event)}
                />
                ))}
                <Button onClick={agregarPaso}>Agregar paso</Button>
                </Paper>


            </Grid>  
            <Grid item xs={12} md={6.8} marginBottom={1}>
                
                
                <Paper sx={{padding:1,  marginBottom:2}}>
                    <Typography variant="h6" gutterBottom component="div">
                        Ingredientes
                    </Typography>
                    
                    <Autocomplete
                        multiple
                        id="combo-box-demo"
                        options={ListIngredientes}
                        sx={{ width: 300 }}
                        onChange={(event, newValues) => {
                            setSelectedIngredients(newValues);
                        }}
                        renderInput={(params) => <TextField {...params} label="Lista De Ingredientes" />}
                    />
                    <List>
                        <Typography variant='p' gutterBottom component="div">
                            Lista de ingredientes
                        </Typography>
                        {selectedIngredients.map((ingrediente) => (
                            <ListItem key={ingrediente}>{ingrediente}</ListItem>
                        ))}
                    </List>
                </Paper>
                <Paper sx={{padding:1, marginBottom:2 }}>
                    <Typography variant="h6" gutterBottom component="div">
                        Utensilios
                    </Typography>
                    
                    <Autocomplete
                        multiple
                        id="combo-box-demo"
                        options={ListUtensilios}
                        sx={{ width: 300 }}
                        onChange={(event, newutensilios) => {
                            setSelectedUtensilios(newutensilios);
                        }}
                        renderInput={(params) => <TextField {...params} label="Lista De Utensilios" />}
                    />
                    <List>
                        <Typography variant='p' gutterBottom component="div">
                            Lista de utensilios
                        </Typography>
                        {selectedUtensilios.map((utensilio) => (
                            <ListItem key={utensilio}>{utensilio}</ListItem>
                        ))}
                    </List>
                </Paper>
                
            </Grid>
            <Paper sx={{ marginTop: 2}}>
                    <Button variant="contained" color="primary" onClick={handleSubmit}>
                        Enviar Receta
                    </Button>
                </Paper>
        </Grid>
        </Box>
        </PageContainer>
    );
    
}

export default CrearReceta;
