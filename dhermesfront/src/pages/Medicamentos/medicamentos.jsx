import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const serverUrl = 'http://localhost:3000';



export default function BasicTable() {
    const [Medicamentos, setMedicamentos] = useState([]);

    useEffect(() => {
        // Realiza la solicitud GET a la API
        axios.get(`${serverUrl}/api/Medicamentos`)
            .then((response) => {
                // Actualiza el estado con los datos de la respuesta
                setMedicamentos(response.data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, []);

    return (
        <div><Button sx={{marginTop:2 , marginLeft:1}} variant="contained" color="primary" component={Link} to="/medicamentos/crear">
        Crear Medicamento
      </Button>
        
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Nombre</TableCell>
                        <TableCell align="right">Cantidad</TableCell>
                        <TableCell align="right">Tipo</TableCell>
                        <TableCell align="right">Fecha de Vencimiento</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Medicamentos.map((medicamento) => (
                        <TableRow
                            key={medicamento.nombre}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {medicamento.nombre}
                            </TableCell>
                            <TableCell align="right">{medicamento.cantidad}</TableCell>
                            <TableCell align="right">{medicamento.tipo}</TableCell>
                            <TableCell align="right">{medicamento.fechaVencimiento}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        </div>
    );
}