import { HttpException, HttpStatus, Injectable, Scope } from "@nestjs/common"
import * as bcrypt from "bcrypt"
import { config } from "src/config"
import { JwtService } from "@nestjs/jwt"
import { uuid } from "uuidv4"
import { ErrorConstant, ErrorConstant as Errors } from "src/share/contant/error.contant"
import { FormatPhoneNumber } from "src/share/utils"
import { AppEnv, MessageResponse } from "src/share/enum/connection.enum"
import { AuthCheckExist, AuthOtpLoginDto, AuthRequestOtpDto } from "src/DTO/auth/auth.dto"
import { UserRepository } from "src/repository/user.repository"
import { BaseService } from "./base.service"

@Injectable({ scope: Scope.DEFAULT })
export class AuthService extends BaseService {
    constructor(private jwtService: JwtService, private readonly userRepo: UserRepository) {
        super()
    }

    Random_Otp(length: number = config.AUTH.OTP_LENGTH) {
        const charset = "0123456789"
        let otpCode = ""
        for (let i = 0; i < length; i++) {
            otpCode += charset.charAt(Math.floor(Math.random() * charset.length))
        }
        return otpCode
    }

    async GenOtpToken(phone: string) {
        const otp = "123456"
        const token = await this.jwtService.signAsync(
            { phone: FormatPhoneNumber(phone) },
            {
                secret: otp,
                expiresIn: "120s",
                keyid: uuid(),
            }
        )

        return { token }
    }

    async HashPassword(plainTextPass: string) {
        const data = await bcrypt.hash(plainTextPass, config.AUTH.SALT_ROUND)
        return data
    }

    async VerifyPassword(password: string, hash: string) {
        const data = await bcrypt.compare(password, hash)
        return data
    }

    async GenToken(payload: any) {
        const accessToken = await this.jwtService.signAsync(
            { payload },
            {
                secret: config.AUTH.JWT_SECRET,
                expiresIn: config.AUTH.JWT_EXPIRED_IN,
                keyid: uuid(),
            }
        )
        const refreshToken = await this.jwtService.signAsync(
            { access_token: accessToken },
            {
                secret: config.AUTH.JWT_REFRESH_SECRET,
                expiresIn: config.AUTH.JWT_REFRESH_EXPIRED_IN,
                keyid: uuid(),
            }
        )
        console.log("[REFRESH TOKEN]:", refreshToken)
        return {
            access_token: accessToken,
            refresh_token: refreshToken,
        }
    }

    async RequestOTP(payload: AuthRequestOtpDto) {
        try {
            const response = await this.GenOtpToken(payload.phone)
            return this.createSuccessResponse(response, MessageResponse.SUCCESS, MessageResponse.SUCCESS)
        } catch (err) {
            return this.throwErrorResponse(err, MessageResponse.FAILED, MessageResponse.FAILED, HttpStatus.BAD_REQUEST)
        }
    }

    async VerifyToken(
        token: string,
        secret: string = config.AUTH.JWT_SECRET
    ): Promise<{ status: boolean; payload: any }> {
        try {
            const payload = await this.jwtService.verifyAsync(token, { secret })
            return {
                status: true,
                payload,
            }
        } catch (e) {
            return {
                status: false,
                payload: null,
            }
        }
    }

    async RefreshToken(refresh_token: string) {
        const tokenVerify = await this.VerifyToken(refresh_token, config.AUTH.JWT_REFRESH_SECRET)
        if (!tokenVerify.status || !tokenVerify.payload?.access_token) {
            return this.throwErrorResponse(
                Errors.INVALID_TOKEN,
                MessageResponse.FAILED,
                MessageResponse.FAILED,
                HttpStatus.BAD_REQUEST
            )
        }
        const payload: any = this.jwtService.decode(tokenVerify.payload.access_token)

        return this.createSuccessResponse(
            this.GenToken(payload.payload),
            MessageResponse.SUCCESS,
            MessageResponse.SUCCESS
        )
    }

    async InternalGenOtpToken(phone: string) {
        const otp = config.APP_ENV === AppEnv.DEVELOPMENT ? "123456" : config.OTP_INTERNAL
        const token = await this.jwtService.signAsync(
            { phone: FormatPhoneNumber(phone) },
            {
                secret: otp,
                expiresIn: "120s",
                keyid: uuid(),
            }
        )

        return { token }
    }

    async OtpLogin(dto: AuthOtpLoginDto) {
        const verifyOtp = await this.VerifyToken(dto.otp_token, dto.otp)
        if (!verifyOtp.status) throw Errors.INVALID_OTP
        const user = await this.userRepo.findOne({ where: { phone_number: dto?.phone } })

        if (!user) {
            return this.throwErrorResponse({}, MessageResponse.FAILED, MessageResponse.FAILED, HttpStatus.BAD_REQUEST)
        }

        const token = await this.GenToken({ user_id: user.id })

        return this.createSuccessResponse(token, MessageResponse.SUCCESS, MessageResponse.SUCCESS)
    }

    async IsUserExisted(dto: AuthCheckExist) {
        try {
            const findPhone = await this.userRepo.findOne({ where: { phone_number: dto?.phone } })
            if (!findPhone?.id) {
                return this.throwErrorResponse(
                    {},
                    MessageResponse.FAILED,
                    MessageResponse.FAILED,
                    HttpStatus.BAD_REQUEST
                )
            }
            return this.createSuccessResponse(true, MessageResponse.SUCCESS, MessageResponse.SUCCESS)
        } catch (err) {
            throw err
        }
    }
}
