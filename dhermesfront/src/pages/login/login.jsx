import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../styles/login.css';
import PageContainer from '../../components/container/PageContainer';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function Login() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const backendUrl = 'http://localhost:3000'; // Cambiar por la URL de tu backend

  const defaultTheme = createTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const correo = e.target.elements.email.value;
    const contraseña = e.target.elements.password.value;
    const userCredentials = { correo, contraseña };

      try {
        // Crear un objeto con correo y contraseña


        // Realiza una solicitud POST al backend para autenticar las credenciales
        const response = await axios.post(`${backendUrl}/api/validarsesion`, userCredentials);

        // Si la solicitud es exitosa y las credenciales son válidas, establece el estado de inicio de sesión en verdadero
        if (response.data.success) {
          setIsLoggedIn(true);
          console.log(isLoggedIn);

          console.log('Inicio de sesión exitoso');
          // Almacena el token web en el almacenamiento local del navegador
          sessionStorage.setItem('token', response.data.token);

          navigate('/');
        } else {
          console.log('Credenciales de inicio de sesión no válidas');
        }
      } catch (error) {
        console.error('Error al realizar la solicitud:', error);
      }
    };
    


  return (
    <PageContainer title="Login" description="Página de inicio de sesión">
    <div className="d-flex justify-content-center align-items-center vh-100">
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
    </div>
    </PageContainer>
  );
}

export default Login;