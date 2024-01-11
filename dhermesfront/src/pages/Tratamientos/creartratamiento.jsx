import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Paper, Typography, TextField, Button, Box, Select, MenuItem } from '@mui/material';
import PageContainer from '../../components/container/PageContainer';

const serverUrl = 'http://localhost:3000';

function CrearTratamiento() {
    const [diagnostico, setDiagnostico] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaTermino, setFechaTermino] = useState('');
    const [medicamentos, setMedicamentos] = useState([]);
    const [observaciones, setObservaciones] = useState('');
    const [medicamentosList, setMedicamentosList] = useState([]);

    useEffect(() => {
        axios.get(`${serverUrl}/api/medicamentos`)
            .then((response) => {
                setMedicamentosList(response.data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();

        const nuevoTratamiento = {
            diagnostico,
            descripcion,
            fechaInicio,
            fechaTermino,
            medicamentos,
            observaciones
        };

        axios.post(`${serverUrl}/api/agregartratamiento`, nuevoTratamiento)
            .then((response) => {
                console.log('Tratamiento creado:', response.data);
                alert('Tratamiento creado con éxito');
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
                                Crear Tratamiento
                            </Typography>
                            <TextField fullWidth label="Diagnostico" value={diagnostico} onChange={(e) => setDiagnostico(e.target.value)} />
                            <TextField fullWidth label="Descripcion" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
                            <TextField fullWidth label="Fecha de Inicio" value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} />
                            <TextField fullWidth label="Fecha de Termino" value={fechaTermino} onChange={(e) => setFechaTermino(e.target.value)} />
                            <TextField
                            fullWidth
                            select    
                           label="Seleccione Medicamentos"
                            value={medicamentos}
                            onChange={(e) => setMedicamentos(e.target.value)}
                            SelectProps={{
                                multiple: true,
                                renderValue: (selected) => selected.join(', '),
                            }}
                            >
                            {medicamentosList.map((medicamento, index) => (
                                <MenuItem key={index} value={medicamento._id}>
                                {medicamento.nombre}
                                </MenuItem>
                            ))}
                            </TextField>
                            <TextField fullWidth label="Observaciones" value={observaciones} onChange={(e) => setObservaciones(e.target.value)} />
                        </Paper>
                        <Button variant="contained" color="primary" onClick={handleSubmit}>
                            Enviar Tratamiento
                        </Button>
                    </Grid>
                        
                </Grid>
            </Box>
        </PageContainer>
    );
}

export default CrearTratamiento;