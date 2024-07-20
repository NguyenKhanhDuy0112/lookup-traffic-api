import { HttpStatus } from "@nestjs/common"
import { StandardResponse } from "src/DTO/common/standard.dto"
import { HttpExceptionStandard } from "src/middleware/httpExceptionStandard.interceptor"

export class BaseService {
    createResponse<T>(
        data: T,
        message: string,
        friendly_message: string,
        status: number = HttpStatus.OK
    ): StandardResponse<T> {
        return {
            data,
            message,
            status,
            friendly_message,
        }
    }

    createSuccessResponse<T>(
        data: T,
        message: string = "Operation successful",
        friendly_message: string = "Thao tác thành công"
    ): StandardResponse<T> {
        return this.createResponse(data, message, friendly_message, HttpStatus.OK)
    }

    createErrorResponse<T>(
        data: T,
        message: string = "Operation failed",
        friendly_message: string = "Thao tác thất bại",
        status: number = HttpStatus.BAD_REQUEST
    ): StandardResponse<T> {
        return this.createResponse(data, message, friendly_message, status)
    }

    throwErrorResponse<T>(
        data: T,
        message: string = "Operation failed",
        friendly_message: string = "Thao tác thất bại",
        status: number = HttpStatus.BAD_REQUEST
    ): void {
        throw new HttpExceptionStandard(data, message, friendly_message, status)
    }
}
