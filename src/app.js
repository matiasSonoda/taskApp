import express from 'express';
import mongoose, { mongo } from 'mongoose';
import {router} from './routes/app.js'

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
app.use(express.json())

//routes
app.use('/', router)



//Server
app.listen(PORT, ()=>{
    console.log(`Server listening on port http://localhost:${PORT}`)
});

