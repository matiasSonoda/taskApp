//clase de error personalizado
import { ZodError } from "zod";

export class ErrFechaInvalida extends Error {
    constructor(mensaje,codigo, status){
        super(mensaje);
        this.name = 'ErrorDeFechaInvalida';
        this.codigo = codigo;
        this.status = status || 500;
        Error.captureStackTrace(this, this.constructor)
    }
}

export class ZError extends ZodError {
    constructor(message, code,expected,received, status){
        super(message);
        this.name= 'DatosInvalidos';
        this.code = code;
        this.expected = expected;
        this.received = received;
        this.status = status || 400;
        Error.captureStackTrace(this, this.constructor)
    }
}