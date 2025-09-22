import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Response  } from "express";


@Catch()
export class GlobalExceptionFilter implements ExceptionFilter{
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse<Response>()  
        const status = exception instanceof HttpException ? exception.getStatus() : 500; 

        response.status(status).json({
            statusCode: status,
            message : exception instanceof Error ? exception.message: "Internal Server Error"
        })
    }
}