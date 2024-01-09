import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useState} from 'react';


const serverUrl = 'http://localhost:3000';

const defaultTheme = createTheme();

function Registro() {
  const [emailInUse, setEmailInUse] = useState(false);
  const [itsCreated,setItsCreated] = useState(false);
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const correo = event.currentTarget.email.value;
    const password = event.currentTarget.password.value;
    

    const data = {
      correo: correo,
    };
    const credenciales={
      correo: correo,
      contraseña: password,
      perfil: "usuario",
    };
    
    console.log(credenciales);
    console.log(data);
    try {
      const response = await axios.post(`${serverUrl}/api/validarsesion`,data);
      console.log(response.data.message);
      if (response.data.message==='Correo previamente registrado'){
        setEmailInUse(true);
      }else{
        setEmailInUse(false);
        try{
          const creacion = await axios.post(`${serverUrl}/api/agregarvoluntario`,credenciales);
          if(creacion.status===201){
            console.log("usuario creado exitosamente");
            setItsCreated(true);
            setEmailValue('');
            setPasswordValue('');
          }
        } catch(error){
          console.error('Error al realizar la solicitud al servidor', error);
        }
      }
        
    } catch (error) {
      console.error('Error al realizar la solicitud al servidor', error);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Registro
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Correo"
                  name="email"
                  autoComplete="email"
                  value={emailValue}
                  onChange={(e) => setEmailValue(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Contraseña"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={passwordValue}
                  onChange={(e) => setPasswordValue(e.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Registrarse
            </Button>
            {emailInUse && (
               <Box
               sx={{
                 display: 'flex',
                 justifyContent: 'center',
                 alignItems: 'center',
               }}
             >
               <Typography variant="body2" color="error">
                 Correo ya está en uso, pruebe otro
               </Typography>
             </Box>
            )}{itsCreated && (
              <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Typography variant="body2" color="green">
                Usuario registrado exitosamente
              </Typography>
            </Box>
           )}
            <Grid container justifyContent="flex-end">
              <Grid item>
              <Link to={`/login`}>
                <Button>
                  Ya estás registrado? Ingresa aquí
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
export default Registro;