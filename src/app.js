// Llamado a las dependencias necesarias. 
import nodemon from 'nodemon';
import cors from 'cors';
import express from 'express'; 
import dotenv from 'dotenv'; 

// Llamado a las archivos necesarios. 
import contactoRouter from './routers/contactoRouter.js';

// Llamado a la configuracion de dotenv.
dotenv.config(); // Permite el uso de la dependenciia dotenv.

// cREANDO EL SERVIDOR. 
const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// API del formulario de contacto. 
app.use('/api/contacto', contactoRouter);

// Levantando el servidor.
app.listen(PORT, ( req, res ) => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});