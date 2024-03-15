import express from 'express';
import mongoose, { mongo } from 'mongoose';
import {router} from './routes/app.js'
import { ErrFechaInvalida, ZError } from './errors/error.js';

const app = express()
const PORT = 4000;


//conexión a la base de datos
mongoose.connect('mongodb+srv://sonoda:so12no46da85@owner.jpaizr6.mongodb.net/?retryWrites=true&w=majority&appName=Owner')
.then(()=>{
    console.log("DB conectada")
})
.catch((error)=>{
    console.log(error)
})


//Middlewares
app.use(express.json());

//routes
app.use('/', router);

app.use((err, req, res, next) => {
    if (err instanceof ErrFechaInvalida){
        res.status(err.status).json({
            codigo: err.codigo,
            mensaje: err.message
        })
    }
    if (err instanceof ZError){
       return res.status(err.status).json({
            mensaje: err.message,
            codigo: err.code,
            expected: err.expected,
            received: err.received
        })
    }
    res.status(err.status).json({
            mensaje: 'Ocurrio un error inesperado'
        })
    
})

//Server
app.listen(PORT, ()=>{
    console.log(`Server listening on port http://localhost:${PORT}`)
});

