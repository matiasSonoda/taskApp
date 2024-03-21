//clase de error personalizado
import { ZodError } from "zod";

export class RequestErr extends Error {
    constructor(mensaje){
        super(mensaje);
    }
};

export class ErrFechaInvalida extends RequestErr {
    constructor(){
        super('La fecha de vencimiento tiene que ser mayor a la del inicio')
        Error.captureStackTrace(this, this.constructor)
    }
}

export class ZError extends RequestErr {
    constructor(zodError){
        if (!(zodError instanceof ZodError)) throw  Error('Vuelvalo a intentar mas tarde')

        let mensajeFromIssues = zodError.zodIssues[0]?.ToString()
        super(mensajeFromIssues)
        Error.captureStackTrace(this, this.constructor)
    }
}