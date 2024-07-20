import { Body, Controller, Post } from "@nestjs/common"
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger"
import {
    AuthCheckExist,
    AuthOtpLoginDto,
    AuthRequestOtpDto,
    AuthRequestVerifyOtpDto,
    RefreshTokenDto,
} from "src/DTO/auth/auth.dto"
import { AuthService } from "src/service/auth.service"
import { ErrorConstant } from "src/share/contant/error.contant"

@Controller("auth")
@ApiTags("auth")
@ApiBearerAuth()
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("refresh-token")
    async RefreshToken(@Body() body: RefreshTokenDto) {
        return this.authService.RefreshToken(body?.refresh_token)
    }

    @Post("otp-login")
    async OtpLogin(@Body() dto: AuthOtpLoginDto) {
        return this.authService.OtpLogin(dto)
    }

    @Post("request-otp")
    async RequestOtp(@Body() dto: AuthRequestOtpDto) {
        return this.authService.RequestOTP(dto)
    }

    @Post("verify-otp")
    async Verifyotp(@Body() dto: AuthRequestVerifyOtpDto) {
        const verifyOtp = await this.authService.VerifyToken(dto.otp_token, dto.otp)
        if (!verifyOtp.status) throw ErrorConstant.INVALID_OTP
        return true
    }

    @Post("check-user-exist")
    async VerifyEMail(@Body() dto: AuthCheckExist) {
        return this.authService.IsUserExisted(dto)
    }
}
