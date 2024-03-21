import taskModel from "../model/taskManager.js";
import { ErrFechaInvalida, ZError } from "../errors/error.js";
import { taskSchemaZod } from "../model/taskModelzod.js";

export async function validateTask(taskData) { 
    //console.log(taskData)
    const taskZod =  await taskSchemaZod.safeParseAsync(taskData);

    if (!taskZod.success) {
        throw new ZError(taskZod.error[0]);
        };

    const newTask = {...taskZod.data};

    if (newTask.startDate < newTask.expiryDate) {

        // const task = await taskModel.create(newTask);
        // console.log(' se guardo en la base de datos');
        return newTask;

    }
    else{
        throw new ErrFechaInvalida()
    }
}

export async function saveTask(taskData){
     const task = new taskModel.create(taskData)
     return task
}
