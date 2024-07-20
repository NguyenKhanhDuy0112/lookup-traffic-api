import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsOptional } from "class-validator"
import { CustomerEmailTypeEnum, GenderEnum } from "src/share/enum/connection.enum"

export class AuthBasicLoginDto {
    @IsNotEmpty()
    @ApiProperty()
    email: string

    @IsNotEmpty()
    @ApiProperty()
    password: string
}

export class AuthOtpLoginDto {
    @IsNotEmpty()
    @ApiProperty()
    phone: string

    @IsNotEmpty()
    @ApiProperty()
    otp_token: string

    @IsNotEmpty()
    @ApiProperty()
    otp: string
}

export class AuthRegisterAccountDto {
    @IsNotEmpty()
    @ApiProperty()
    phone_number: string

    @IsNotEmpty()
    @ApiProperty()
    email: string

    @IsNotEmpty()
    @ApiProperty()
    full_name: string

    @IsNotEmpty()
    @ApiProperty()
    cccd: string

    @IsNotEmpty()
    @ApiProperty()
    dob: Date

    @IsNotEmpty()
    @ApiProperty()
    gender: GenderEnum

    @IsNotEmpty()
    @ApiProperty()
    address: string
}

export class AuthCheckExist {
    @IsNotEmpty()
    @ApiProperty()
    phone: string
}

export class RefreshTokenDto {
    @IsNotEmpty()
    @ApiProperty()
    refresh_token: string
}

export class ChangePhoneDto {
    @IsNotEmpty()
    @ApiProperty()
    token: string

    @IsNotEmpty()
    @ApiProperty()
    otp_token: string

    @IsNotEmpty()
    @ApiProperty()
    otp: string

    @IsNotEmpty()
    @ApiProperty()
    phone: string
}

export class AuthBasicRegisterDto {
    @ApiProperty({ required: false })
    @IsOptional()
    email: string

    @ApiProperty({ required: false })
    @IsOptional()
    firebase_token: string

    @ApiProperty({ required: false })
    @IsOptional()
    zalo_id: string

    @IsNotEmpty()
    @ApiProperty()
    phone: string

    @IsNotEmpty()
    @ApiProperty()
    otp_token: string

    @IsNotEmpty()
    @ApiProperty()
    otp: string

    @ApiProperty({ required: false })
    @IsOptional()
    gender: string

    @ApiProperty({ required: false })
    @IsOptional()
    first_name: string

    @ApiProperty({ required: false })
    @IsOptional()
    last_name: string

    @ApiProperty({ required: false })
    @IsOptional()
    birthday: string

    @IsOptional()
    @ApiProperty({ required: false })
    password: string

    @IsOptional()
    @ApiProperty({ required: false })
    nick_name: string
}

export class AuthSocialLoginDto {
    @ApiProperty({ required: false })
    @IsOptional()
    firebase_token: string

    @ApiProperty({ required: false })
    @IsOptional()
    zalo_id: string
}

export class VerifyMailRegisterDto {
    @ApiProperty({ required: false })
    @IsOptional()
    email: string

    @ApiProperty({ required: false })
    @IsOptional()
    phone: string

    @ApiProperty({ required: true })
    @IsNotEmpty()
    type: "mail" | "phone" | "sso" | "others" | "zalo"

    @ApiProperty({ required: false })
    @IsOptional()
    firebase_token: string

    @ApiProperty({ required: false })
    @IsOptional()
    customer_id: string
}
export class RequestResetPasswordDto {
    @IsNotEmpty()
    @ApiProperty()
    email: string

    @IsNotEmpty()
    @ApiProperty()
    lang: string
}

export class ResetPasswordDto {
    @IsNotEmpty()
    @ApiProperty()
    email: string

    @IsNotEmpty()
    @ApiProperty()
    otp_token: string

    @IsNotEmpty()
    @ApiProperty()
    otp: string

    @IsNotEmpty()
    @ApiProperty()
    password: string
}

export class VerifyTokenInternalDTO {
    @IsNotEmpty()
    @ApiProperty()
    token: string
}

export class AuthRequestOtpDto {
    @IsNotEmpty()
    @ApiProperty()
    phone: string
}

export class AuthRequestVerifyOtpDto {
    @IsNotEmpty()
    @ApiProperty()
    otp: string

    @IsNotEmpty()
    @ApiProperty()
    otp_token: string
}

export class TestVerifyToken {
    @IsNotEmpty()
    @ApiProperty()
    token: string
}

export class ReqCreateUser {
    email: string

    hashedPassword: string

    vendor_id: string

    phone: string

    type: CustomerEmailTypeEnum

    gender: GenderEnum

    birthday: string

    first_name: string

    last_name: string

    nick_name: string
}

export class TokenDto {
    @ApiProperty()
    id: string

    @ApiProperty()
    type: string
}

export class ZaloSSOLoginLinkDTO {
    @IsNotEmpty()
    @ApiProperty()
    redirect_url: string
}

export class ZaloGetUserInfoDTO {
    @IsNotEmpty()
    @ApiProperty()
    code: string

    @IsNotEmpty()
    @ApiProperty()
    state: string
}

export class CustomerBlockDTO {
    @IsNotEmpty()
    @ApiProperty()
    customer_id: string
}

export class TestCryptCdsDTO {
    @IsNotEmpty()
    @ApiProperty()
    data: any
}

export class TestGenQrLoyaltyDTO {
    @IsNotEmpty()
    @ApiProperty()
    open_date: string

    @IsNotEmpty()
    @ApiProperty()
    check_no: string

    @IsNotEmpty()
    @ApiProperty()
    store_code: string

    @IsNotEmpty()
    @ApiProperty()
    guest_no: string

    @IsNotEmpty()
    @ApiProperty()
    order_type: string

    @IsNotEmpty()
    @ApiProperty()
    order_sequence: string
}
