// Importación de dependencias necesarias
import express from 'express';
import nodemailer from 'nodemailer';

const router = express.Router();

// Ruta POST para recibir mensajes del formulario
router.post('/', async (req, res) => {
    const { nombre, email, asunto, mensaje } = req.body;

    // Validación de datos
    if (!nombre || !email || !asunto || !mensaje) {
        return res.status(400).json({ mensaje: 'Faltan datos' });
    }

    try {
        // Configuración del transporte de Nodemailer usando Gmail
        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER, // tu correo de Gmail
                pass: process.env.EMAIL_PASS  // tu contraseña de aplicación
            }
        });

        // Opciones del correo electrónico
        const mailOptions = {
            from: email, // quien envía (el usuario que completa el formulario)
            to: process.env.EMAIL_USER, // a quién va dirigido (tu propio correo)
            subject: 'Llego un mensaje desde el front-end',
            text: `Nombre: ${nombre}\nEmail: ${email}\nMensaje: ${mensaje}`
        };

        // Envío del correo
        await transport.sendMail(mailOptions);

        // Respuesta exitosa
        res.status(200).json({ mensaje: 'Mensaje enviado!!' });

    } catch (error) {
        // Manejo de errores
        res.status(500).json({
            mensaje: 'Algo salió mal y el servidor no puede recibir tu mensaje'
        });
        console.error('Mensaje no enviado:', error);
    }
});

// Exportar el router para usar en app.js
export default router;