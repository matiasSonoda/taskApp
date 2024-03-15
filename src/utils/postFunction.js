import taskModel from "../model/taskManager.js";
import {z} from 'zod'
import { ErrFechaInvalida, ZError } from "../errors/error.js";
import { taskSchemaZod } from "../model/taskModelzod.js";

export async function validateAndSave(taskData) { 
    //console.log(taskData)
    const taskZod =  await taskSchemaZod.safeParseAsync(taskData)
    if (taskZod.error){
        const { message, code,expected, received} = taskZod.error
        throw new ZError({message:message, code: code, expected:expected, received:received})
    }
    const newTask = {...taskZod.data}
    if (newTask.startDate < newTask.expiryDate) {
        const task = await taskModel.create(newTask);
        console.log(' se guardo en la base de datos');
        return task;
}
else{
    throw new ErrFechaInvalida('La fecha de vencimiento tiene que ser mayor a la del inicio','ERR_FECHA_INVALIDA',400)
}
}

