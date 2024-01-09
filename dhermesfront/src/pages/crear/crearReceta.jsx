import React, { useState } from 'react';
import axios from 'axios';
import { Grid, Paper, Typography, TextField, Button, Box } from '@mui/material';
import PageContainer from '../../components/container/PageContainer';

const serverUrl = 'http://localhost:3000';

function CrearPerro() {
    const [nombre, setNombre] = useState('');
    const [imagen, setImagen] = useState('');
    const [fechaIngreso, setFechaIngreso] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [esterilizacionFecha, setEsterilizacionFecha] = useState('');
    const [esterilizacionLugar, setEsterilizacionLugar] = useState('');
    const [adopcionFecha, setAdopcionFecha] = useState('');
    const [personaNombre, setPersonaNombre] = useState('');
    const [personaRut, setPersonaRut] = useState('');
    const [personaDireccion, setPersonaDireccion] = useState('');
    const [personaTelefono, setPersonaTelefono] = useState('');
    const [personaCorreo, setPersonaCorreo] = useState('');
    const [personaRetorno, setPersonaRetorno] = useState('');
    const [vacuna1, setVacuna1] = useState('');
    const [vacuna2, setVacuna2] = useState('');
    const [antirabica, setAntirabica] = useState('');
    const [vacunaAnual, setVacunaAnual] = useState('');
    const [antiparasitarioInterno, setAntiparasitarioInterno] = useState('');
    const [antiparasitarioExterno, setAntiparasitarioExterno] = useState('');
    const [tratamientos, setTratamientos] = useState([]);

    const handleSubmit = (event) => {
        event.preventDefault();

        const nuevoPerro = {
            nombre,
            imagen,
            Datos: {
                fechaIngreso,
                fechaNacimiento,
                esterilizacion: {
                    fecha: esterilizacionFecha,
                    lugar: esterilizacionLugar,
                },
                Adopcion: {
                    fecha: adopcionFecha,
                    Persona: {
                        nombre: personaNombre,
                        rut: personaRut,
                        direccion: personaDireccion,
                        telefono: personaTelefono,
                        correo: personaCorreo,
                        retorno: personaRetorno,
                    },
                },
            },
            Vacunas: {
                vacuna1,
                vacuna2,
                Antirabica: antirabica,
                vacunaAnual,
                antiparasitarioInterno,
                antiparasitarioExterno,
            },
            Tratamientos: tratamientos,
        };

        axios.post(`${serverUrl}/api/agregarperro`, nuevoPerro)
            .then((response) => {
                console.log('Perro creado:', response.data);
                alert('Perro creado con éxito');
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };
    
    return (
        <PageContainer>
            <Box height="100%">
                <Grid container spacing={0} padding={2}>
                    <Grid item xs={12} md={5} marginBottom={1} marginRight={3}>
                        <Paper sx={{ padding: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Crear Perro
                            </Typography>
                            <TextField fullWidth label="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                            <TextField fullWidth label="Imagen" value={imagen} onChange={(e) => setImagen(e.target.value)} />
                            {/* Agrega aquí más campos de entrada para los demás parámetros del perro */}
                        </Paper>
                        <Paper sx={{ padding: 1, marginTop: 2 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Datos de Adopción
                            </Typography>
                            <TextField fullWidth label="Fecha de Adopción" value={adopcionFecha} onChange={(e) => setAdopcionFecha(e.target.value)} />
                            <TextField fullWidth label="Nombre de la Persona" value={personaNombre} onChange={(e) => setPersonaNombre(e.target.value)} />
                            <TextField fullWidth label="RUT de la Persona" value={personaRut} onChange={(e) => setPersonaRut(e.target.value)} />
                            <TextField fullWidth label="Dirección de la Persona" value={personaDireccion} onChange={(e) => setPersonaDireccion(e.target.value)} />
                            <TextField fullWidth label="Teléfono de la Persona" value={personaTelefono} onChange={(e) => setPersonaTelefono(e.target.value)} />
                            <TextField fullWidth label="Correo de la Persona" value={personaCorreo} onChange={(e) => setPersonaCorreo(e.target.value)} />
                            <TextField fullWidth label="Retorno" value={personaRetorno} onChange={(e) => setPersonaRetorno(e.target.value)} />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6.8} marginBottom={1}>
                        <Paper sx={{ padding: 1, marginBottom: 2 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Datos del Perro
                            </Typography>
                            <TextField fullWidth label="Fecha de Ingreso" value={fechaIngreso} onChange={(e) => setFechaIngreso(e.target.value)} />
                            <TextField fullWidth label="Fecha de Nacimiento" value={fechaNacimiento} onChange={(e) => setFechaNacimiento(e.target.value)} />
                            <TextField fullWidth label="Fecha de Esterilización" value={esterilizacionFecha} onChange={(e) => setEsterilizacionFecha(e.target.value)} />
                            <TextField fullWidth label="Lugar de Esterilización" value={esterilizacionLugar} onChange={(e) => setEsterilizacionLugar(e.target.value)} />
                
                            {/* Agrega aquí más campos de entrada para los demás datos del perro */}
                        </Paper>
                        <Paper sx={{ padding: 1, marginBottom: 2 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Vacunas
                            </Typography>
                            <TextField fullWidth label="Vacuna 1" value={vacuna1} onChange={(e) => setVacuna1(e.target.value)} />
                            <TextField fullWidth label="Vacuna 2" value={vacuna2} onChange={(e) => setVacuna2(e.target.value)} />
                            <TextField fullWidth label="Antirabica" value={antirabica} onChange={(e) => setAntirabica(e.target.value)} />
                            <TextField fullWidth label="Vacuna Anual" value={vacunaAnual} onChange={(e) => setVacunaAnual(e.target.value)} />
                            <TextField fullWidth label="Antiparasitario Interno" value={antiparasitarioInterno} onChange={(e) => setAntiparasitarioInterno(e.target.value)} />  
                            <TextField fullWidth label="Antiparasitario Externo" value={antiparasitarioExterno} onChange={(e) => setAntiparasitarioExterno(e.target.value)} />
                        </Paper>
                        <Paper sx={{ padding: 1, marginBottom: 2 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Tratamientos
                            </Typography>
                            {/* Agrega aquí más campos de entrada para los demás tratamientos del perro */}
                        </Paper>
                    </Grid>
                    <Paper sx={{ marginTop: 2 }}>
                        <Button variant="contained" color="primary" onClick={handleSubmit}>
                            Enviar Perro
                        </Button>
                    </Paper>
                </Grid>
            </Box>
        </PageContainer>
    );
}

export default CrearPerro;