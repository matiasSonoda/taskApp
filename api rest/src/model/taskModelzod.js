import {z} from 'zod'

export const taskSchemaZod = z.object({
    title: z.string({ required_error: 'Debe colocar un titulo'}).max(100, 'Maximo 100 caracteres'),
    description: z.string().max(255, 'Maximo 255 caracteres'),
    startDate: z.date().default(() => new Date()),
    expiryDate: z.string().refine((date) => new Date(date).toString() != 'Datos invalidos', { message: 'Ingresar fecha y hora'}).transform((date)=> new Date(date)) ,
    state: z.boolean({ required_error: 'Estado de la tarea necesario' })
  });