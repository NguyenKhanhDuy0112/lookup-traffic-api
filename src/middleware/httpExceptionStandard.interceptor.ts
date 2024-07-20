import { HttpException, HttpStatus } from "@nestjs/common"
import { StandardResponse } from "src/DTO/common/standard.dto"

export class HttpExceptionStandard extends HttpException {
    constructor(data: any, message: string, friendly_message: string, status: HttpStatus) {
        const response: StandardResponse<any> = {
            data,
            message,
            status,
            friendly_message,
        }
        super(response, status)
    }
}
