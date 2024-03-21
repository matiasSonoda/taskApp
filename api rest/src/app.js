import express from 'express';
import mongoose, { mongo } from 'mongoose';
import {router} from './routes/app.js'
import { ErrFechaInvalida, RequestErr, ZError } from './errors/error.js';
import cors from 'cors'

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
app.use(cors())
//routes
app.use('/', router);

app.use((err, req, res, next) => {
    if (err instanceof RequestErr){
        res.status(400).json({mensaje: err.message})
    }
    else{
    res.status(500).json({mensaje: 'Ocurrio un error inesperado', name:'Server Error'});
    }
});

//Server
app.listen(PORT, ()=>{
    console.log(`Server listening on port http://localhost:${PORT}`)
});

