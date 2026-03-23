export class apiError extends Error{
    constructor(statusCode,message='something went wrong'){
        super(message)
        this.statusCode = statusCode
        this.status = statusCode >=400 && statusCode < 500 ?'fail':'error',
        this.message = message,
        
        this.isOperational = true

        Error.captureStackTrace(this,this.constructor)
    }
}