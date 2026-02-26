import { Request, Response, NextFunction } from "express"
import { HttpStatus } from "../constants/HttpStatus"
import { HttpResponse } from "../constants/HttpResponse";

interface ErrorResponse {
    message: string;
    stack?: string;
}

function errMiddleware(
    err: any,
    _req: Request,
    res: Response,
    _next: NextFunction
): void {
    const status = err.status || HttpStatus.INTERNAL_SERVER_ERROR;
    const message = err.message || HttpResponse.SERVER_ERROR

    let response: ErrorResponse = { message }
    if (process.env.NODE_ENV === "development") {
        response.stack = err.stack;
    }

    res.status(status).json(response);
}

export default errMiddleware