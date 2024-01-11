import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Grid, Typography, Paper , Button} from '@mui/material';
import PageContainer from '../../components/container/PageContainer';
import '../../styles/receta.css';
import { Link } from 'react-router-dom';


const serverUrl = 'http://localhost:3000';

function TratamientoInfo() {
    const [tratamientoInfo, setTratamientoInfo] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        const body = {_id: id}
        console.log(body)
        axios.post(`${serverUrl}/api/filtraridperros`, body)
        .then((response) => {
            setTratamientoInfo(response.data);
            console.log(response.data)
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }, [id]);  
    return (
        <PageContainer title="Vista Recetas" description="aaaaaaaaaaaaaaaaa" >
            <div className='receta-container'>
            <Button sx={{margin:2}} component={Link} to={`/perros/${id}`} variant="contained" color="primary">
            Volver
            </Button>
                <Grid container spacing={2}>  
                    {tratamientoInfo && <>
                        <Grid item xs={12} sm={6} md={6}>
                            <Typography variant="h6" sx={{margin:2}} gutterBottom>
                                Tratamientos
                            </Typography>
                            {tratamientoInfo.map((tratamiento, index) => (
                                <Paper key={index} sx={{padding:1, margin:2, border: '1px solid black'}}>
                                    <Typography variant="h6" gutterBottom>
                                        Diagnóstico: {tratamiento.diagnostico}
                                    </Typography>
                                    <Typography variant="body1" gutterBottom>
                                        Descripción: {tratamiento.descripcion}
                                    </Typography>
                                    <Typography variant="body1" gutterBottom>
                                        Fecha de inicio: {tratamiento.fechaInicio}
                                    </Typography>
                                    <Typography variant="body1" gutterBottom>
                                        Fecha de término: {tratamiento.fechaTermino}
                                    </Typography>
                                    <Typography variant="body1" gutterBottom>
                                        Medicamentos: {tratamiento.medicamentos.map(medicamento => medicamento.nombre).join(', ')}
                                    </Typography>
                                    <Typography variant="body1" gutterBottom>
                                        Observaciones: {tratamiento.observaciones}
                                    </Typography>
                                </Paper>
                            ))}
                        </Grid>
                    </>}
                </Grid>
            </div>
        </PageContainer>
    );
}

export default TratamientoInfo;