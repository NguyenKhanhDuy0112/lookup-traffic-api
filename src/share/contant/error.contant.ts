import { HttpException, HttpStatus, InternalServerErrorException } from '@nestjs/common';

export class Exception extends HttpException {
  constructor(public statusCode: number, public message: string, public error?: string) {
    super({
      error,
      message,
      statusCode,
    }, statusCode);
  }
}

export const ErrorConstant = {
  NOT_FOUND: 'NOT_FOUND',
  INVALID: 'INVALID',
  ITEM_NOT_FOUND: 'ITEM_NOT_FOUND',
  ORDER_NOT_FOUND: 'ORDER_NOT_FOUND',
  TABLE_CLOSED: 'TABLE_CLOSED',
  WRONG_PRICE_TOTAL: 'WRONG_PRICE_TOTAL',
  NO_TABLE_FOUND: 'NO_TABLE_FOUND',
  TRANSACTION_LIMITED: 'TRANSACTION_LIMITED',
  BAD_REQUEST: new Exception(HttpStatus.NOT_FOUND, 'bad request', 'BAD_REQUEST'),
  NOTFOUND_STORE: new Exception(HttpStatus.NOT_FOUND, 'not found store', 'NOTFOUND_STORE'),
  EMAIL_ALREADY_EXISTS: new Exception(HttpStatus.CONFLICT, 'email already exists', 'EMAIL_ALREADY_EXISTS'),
  PHONE_ALREADY_EXISTS: new Exception(HttpStatus.CONFLICT, 'phone already exists', 'PHONE_ALREADY_EXISTS'),
  FIREBASE_USER_ALREADY_EXISTS: new Exception(HttpStatus.CONFLICT, 'user already exists', 'FIREBASE_USER_ALREADY_EXISTS'),
  NOT_REGISTER_USER: new Exception(HttpStatus.CONFLICT, 'email not register', 'NOT_REGISTER_USER'),
  INTERNAL: InternalServerErrorException,
  INVALID_TOKEN: new Exception(HttpStatus.CONFLICT, 'Invalid Token', 'INVALID_TOKEN'),
  INVALID_LOGIN: new Exception(HttpStatus.CONFLICT, 'Invalid Login', 'INVALID_LOGIN'),
  INVALID_OTP: new Exception(HttpStatus.NOT_FOUND, 'Invalid OTP', 'INVALID_OTP'),
  FAIL_SMTP: 'Send mail reset fail!',
};

