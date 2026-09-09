import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger, NotFoundException } from "@nestjs/common"
import {Response} from 'express'
import { apiError, apiResponse } from "../dto/api-response.dto.js"
import { ApiError, ApiErrorBody } from "../types.js"

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
    private readonly Logger = new Logger()
    catch(exception: any, host: ArgumentsHost) {
        const response = host.switchToHttp().getResponse<Response>()
        if (exception instanceof HttpException) {
            const status = exception.getStatus()
            const error = exception.getResponse() as ApiErrorBody
            response.status(status).json(apiError(error))
        }
    }
}