import { RequestErr } from "../errors/error.js";
import { saveTask, validateTask } from "../utils/postFunction.js";
import  taskModel  from "../model/taskManager.js";
import { ZodError } from "zod";
export const getApp =  (req,res)=>{
    // Debe de mostrar la pagina principal con todo el menu post, put, delete
      res.send('<h1>Hola</h1>');
};

export const postApp = async (req,res, next) => {
    try{
        console.log('im in')
        console.log(req.body);
        const {title,description,startDate,expiryDate,state} = req.body
        const newtask = await validateTask({title:title,description:description,startDate:startDate,expiryDate:expiryDate,state:state});
        const task = saveTask(newtask)
        res.status(200).send(task);
        }
    catch(error){
        next(error)
    };
};

export const putApp = async (req, res, next) => {
    //tiene que poder actualizar titulo, descripcion, fecha de vencimiento y estado de la tarea
    try {
        const taskId = req.params.id
        const {title, description, startDate,expiryDate, state} = req.body
        const taskUpdate = await validateTask({title:title,description:description,startDate:startDate,expiryDate:expiryDate,state:state})
        const task = await taskModel.findByIdAndUpdate(taskId,taskUpdate, { new:true });
        if (!task){
            throw new RequestErr('Objeto no existente');
        }
        res.status(200).send(task);
        }
    catch(error){
        next(error)
    };
};

export const deleteApp = async (req, res,next) => {
    try{
    const taskId = req.params.id
    const task = await taskModel.findByIdAndDelete(taskId)
    if (!task){
        throw new RequestErr('Objeto no existente');
    }
    res.status(200).json({mensaje: 'Se elimino a la perfección'})
    }
    catch(error){
        next(error);
    };
};