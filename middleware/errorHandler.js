import { apiError } from "../utils/apiError.js"
import { ApiRespose } from "../utils/apiResponse.js"
console.log(process.env.NODE_ENV)
const devError = (res,err) => {
    res.status(err.statusCode).json({
            status:err.statusCode,
            message: err.message,
            stackTrace: err.stack,
            error:err
        })

}
const prodError = (res,err) => {
    if(err.isOperational){
    res.status(err.statusCode).json({
            status:err.statusCode,
            message: err.message,
        })
    }else{
        res.status(500).json({
            status:'error',
            message:'something went wrong'
        })
    }

}
const validationError = (err) => {
    const errors = Object.values(err.errors).map(val => val.message);
    const errorMessages = errors.join('. ');
    const msg = `Invalid input data: ${errorMessages}`;

    return new apiError(msg, 400);
}

export const globalErrorHandler = (err,req,res,next) =>{
    err.statusCode = err.statusCode || 500
    err.status = err.status || 'error'
    if(process.env.NODE_ENV === 'development'){
        devError(res,err)
    }else if(process.env.NODE_ENV === 'production'){
        if(err.name === 'ValidationError') err = validationError(err)
        prodError(res,err)
    }
}