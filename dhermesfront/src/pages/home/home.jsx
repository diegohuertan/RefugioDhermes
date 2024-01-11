import React from "react";
import PageContainer from "../../components/container/PageContainer";
import { Box, Typography, Link } from "@mui/material";

function Home() {
  return (
    <PageContainer>
      <Box height="100%" display="flex" flexDirection="column" justifyContent="center" alignItems="center" padding={2}>
        <Typography variant="h2" gutterBottom>
          Refugio Dhermes
        </Typography>
        <Typography variant="h5" gutterBottom>
          Fundación Dhermes es un refugio con más de 16 años de vida que alberga perritos abandonados en Viña del Mar, y nuestro propósito es encontrarles un hogar a través de jornadas de adopción.
        </Typography>
        <Typography variant="body1" gutterBottom>
          Ubicados en un hermoso refugio en Viña del Mar, V Región, Chile, también puedes contactarlos por correo a: <Link href="mailto:dhermeshermanosmenores@gmail.com">dhermeshermanosmenores@gmail.com</Link>
        </Typography>
        <Typography variant="body1" gutterBottom>
          Síguenos en nuestras redes sociales: 
          <Link href="https://www.facebook.com/RefugioDhermes/" target="_blank" rel="noopener noreferrer">Facebook</Link>,
          <Link href="https://www.instagram.com/RefugioDhermes/" target="_blank" rel="noopener noreferrer">Instagram</Link>,
          <Link href="https://twitter.com/RefugioDhermes" target="_blank" rel="noopener noreferrer">Twitter</Link>
        </Typography>
        <Typography variant="body1" gutterBottom>
          Cuenta con más de 150 perritos en adopción.
        </Typography>
        <Typography variant="body1" gutterBottom>
          ¡Adopta, no compres!
        </Typography>
      </Box>
    </PageContainer>
  );
}

export default Home;