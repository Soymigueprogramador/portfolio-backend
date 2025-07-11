// Llamado a las dependencias necesarias. 
import cors from 'cors';
import express from 'express'; 
import dotenv from 'dotenv'; 

// Llamado a los archivos necesarios. 
import contactoRouter from './routers/contactoRouter.js';

// Configuración de dotenv
dotenv.config(); // Permite el uso de las variables de entorno

// Creando el servidor
const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors({
    origin: 'http://127.0.0.1:5500'  // o 'http://localhost:5500' si lo usás así
}));
app.use(express.json());

// API del formulario de contacto
app.use('/api/contacto', contactoRouter);

// Ruta raíz
app.get('/', (req, res) => {
    res.send('Hola a todos!!');
    console.log('Hola a todos!!');
});

// Levantando el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
