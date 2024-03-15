import { ErrFechaInvalida, ZError } from "../errors/error.js";
import { validateAndSave } from "../utils/postFunction.js";
import  taskModel  from "../model/taskManager.js";
import { ZodError } from "zod";
export const getApp =  (req,res)=>{
    // Debe de mostrar la pagina principal con todo el menu post, put, delete
      res.send('<h1>Hola</h1>');
};

export const postApp = async (req,res, next) => {
    try{
        const task = await validateAndSave(req.body)
        res.status(200).send(task)
        }
    catch(error){
        if (error instanceof ZError){
           return next(error)}
        if (error instanceof ErrFechaInvalida){
            return next(error)
        }
        console.log('estoy aca')
        res.status(error.status || 500).json({mensaje: error.message, name: error.name})
    };
};

export const putApp = async (req, res) => {
    //tiene que poder actualizar titulo, descripcion, fecha de vencimiento y estado de la tarea
    try {
        const task = await taskModel.findByIdAndUpdate(req.params.id, req.body, { new:true });
        if (!task){
            res.status(404).send('No se encontro el objeto')
        }
      
        res.status(200).send(task);

        }
    catch(error){
        res.status(500).send({error: error.message});
    };
};

export const deleteApp = async (req, res) => {
    //Tiene que poder eliminar una tarea crada individualmente o todas las tareas que tenga creadas al mismo tiempo
    try{
    const task = await taskModel.findOneAndDelete(req.params.id)
    if (!task){
        res.status(404).send('no se encontro el objeto')
    }

    res.send({'se elimino': 'a la perfección'})
    
    }
    catch(error){
        res.status(500).send(error);
    };
};