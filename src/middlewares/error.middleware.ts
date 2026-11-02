import {ErrorRequestHandler} from 'express';
import {AppError} from '../errors/app.error.js';

export const errorMiddleware: ErrorRequestHandler = ((err, req, res, next) => {
    let statusCode = 500;
    let code = err.code || 'INTERNAL_SERVER_ERROR';
    let message = err.message || "Ocurrió un error interno en el servidor";

    if (err instanceof AppError){
        statusCode = err.statusCode;
        code = err.code;
        message = err.message;
    }
    console.error({
        method : req.method,
        path: req.originalUrl,
        statusCode,
        error: err,
    });

    res.status(statusCode).json({
        success: false,
        error: {
            code,
            message
        },
    });
});