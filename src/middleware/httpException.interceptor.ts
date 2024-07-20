import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from "@nestjs/common"
import { Response } from "express"

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse<Response>()
        const status = exception.getStatus()
        const exceptionRes: any = exception.getResponse()

        const responseBody = {
            statusCode: status,
            message: exceptionRes.message || "An error occurred",
            data: exceptionRes.data || null,
            friendly_message: exceptionRes.friendly_message || "Something went wrong",
        }

        response.status(status).json(responseBody)
    }
}
