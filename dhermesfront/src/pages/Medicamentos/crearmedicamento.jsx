import React, { useState } from 'react';
import axios from 'axios';
import { Grid, Paper, Typography, TextField, Button, Box } from '@mui/material';
import PageContainer from '../../components/container/PageContainer';

const serverUrl = 'http://localhost:3000';

function CrearMedicamento() {
    const [nombre, setNombre] = useState('');
    const [cantidad, setCantidad] = useState(0);
    const [tipo, setTipo] = useState('');
    const [fechaVencimiento, setFechaVencimiento] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        const nuevoMedicamento = {
            nombre,
            cantidad,
            tipo,
            fechaVencimiento,
        };

        axios.post(`${serverUrl}/api/agregarmedicamento`, nuevoMedicamento)
            .then((response) => {
                console.log('Medicamento creado:', response.data);
                alert('Medicamento creado con éxito');
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
                                Crear Medicamento
                            </Typography>
                            <TextField fullWidth label="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                            <TextField fullWidth label="Cantidad" value={cantidad} onChange={(e) => setCantidad(e.target.value)} />
                            <TextField fullWidth label="Tipo" value={tipo} onChange={(e) => setTipo(e.target.value)} />
                            <TextField fullWidth label="Fecha de Vencimiento" value={fechaVencimiento} onChange={(e) => setFechaVencimiento(e.target.value)} />
                        </Paper>
                        <Button variant="contained" color="primary" onClick={handleSubmit}>
                            Enviar Medicamento
                        </Button>
                    </Grid>
                   
                        
                   
                </Grid>
            </Box>
        </PageContainer>
    );
}

export default CrearMedicamento;