import {RequestHandler} from "express";
import {AppError} from "../errors/app.error.js";

export const notFoundMiddleware : RequestHandler = (
    req,
    res,
    next
) =>{
    next(
        new AppError(
            `La ruta ${req.originalUrl} no existe en el servidor`,
            404,
            "NOT_FOUND",
        ),
    );
};