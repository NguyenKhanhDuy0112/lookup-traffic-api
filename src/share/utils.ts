import * as moment from 'moment';
import * as crypto from 'crypto';
import { config } from 'src/config';

export const IsOrderSessionProcess = {};

export function SetOrderSessionProcess(key, value) {
  IsOrderSessionProcess[key] = value;
}

export function DeleteOrderSessionProcess(key) {
  delete IsOrderSessionProcess[key];
}

export function getGMTTime(time: Date, GMT = null) {
  if (!time) {
    return null;
  }
  if (typeof (time.getTime) !== 'function') { time = new Date(time); }
  if (GMT) {
    const gmtDate = new Date(time.getTime() - ((Number(GMT) * (-60)) * 60 * 1000));
    return gmtDate;
  }
  const gmtDate = new Date(time.getTime() - (time.getTimezoneOffset() * 60 * 1000));
  return gmtDate;
}

export const getUTCTime = (time: Date) => {
  if (!time) {
    return null;
  }
  if (typeof (time.getTime) !== 'function') { time = new Date(time); }
  const utcDate = new Date(time.getTime() - (time.getTimezoneOffset() * 60 * 1000 * (-1)));
  return utcDate;
};

export const getNowUTCTime = () => getUTCTime(new Date());

export const JoinNotNull = (input: string[], seperator = ' ') => input.map((x) => x.trim()).filter((x) => x != null && x !== '').join(seperator);

export const TodayIsBirth = (birth_day) => birth_day === moment().format('YYYY-MM-DD');

export function DataMapper<B>(source: any, dest: B): B {
  Object.keys(dest).forEach((key) => {
    if (source[key] == null) return;
    dest[key] = source[key];
  });
  return dest;
}

export function ReplaceChar(ori, replaceBy, idx) {
  const newStringArray = ori.split('');
  newStringArray[idx] = replaceBy;
  return newStringArray.join('');
}

export function cardExpValid(expireCardTime: string) {
  const [exMonth, exYear] = expireCardTime.match(/.{1,2}/g);
  const fullYear = new Date().getFullYear().toString();
  const yearPre = fullYear.substring(0, fullYear.length - 2);

  const exFullYear = yearPre + exYear;

  const expireTime = exFullYear + exMonth;

  const nowTime = moment().format('YYYYMM');

  return expireTime > nowTime;
}

export function FormatPhoneNumber(phone: string) {
  let phoneFormat = phone;
  if (phoneFormat[0] === '0') {
    phoneFormat = phoneFormat.replace('0', '+84');
  } else if (!phoneFormat.includes('+84')) {
    phoneFormat = `+84${phoneFormat}`;
  }

  return phoneFormat;
}

// Auto to add 0 to equal 6 digit for storecode ex: store_code: 1021 => store_code: 001021
export const AddZeroBeforeStoreCode = (number, length = 6) => {
  let zeroString = '';
  for (let i = 0; i < length; i++) {
    zeroString += '0';
  }
  const res = (zeroString + number).slice(-(length));
  return res;
};

export const Base64UrlEncode = (base64: any) => base64.replace(/=/g, '')
  .replace(/\+/g, '-')
  .replace(/\//g, '_');

export const ENCRYPT_ASE = (key: string, encryptionIV: string, data: string) => {
  const ecnryptionMethod = 'aes-256-cbc';
  const cipher = crypto.createCipheriv(ecnryptionMethod, key, encryptionIV);
  return cipher.update(data, 'utf8', 'hex') + cipher.final('hex');
};

export const DECRYPT_ASE = (key: string, encryptionIV: string, buff: string) => {
  const ecnryptionMethod = 'aes-256-cbc';
  const decipher = crypto.createDecipheriv(ecnryptionMethod, key, encryptionIV);
  return decipher.update(buff, 'hex', 'utf8') + decipher.final('utf8');
};

const cdsKey = config.POSTGRES_LOOKUP_TRAFFIC.ENCRYPT_KEY;
const cdsEncryptionIV = config.POSTGRES_LOOKUP_TRAFFIC.ENCRYPTION_IV;

export const ENCRYPT_CDS = (data: any) => {
  if (!data) return null;
  const encrypt = ENCRYPT_ASE(cdsKey, cdsEncryptionIV, data);
  const encryptPG = `\\x${encrypt}`;
  return encryptPG;
};

export const ENCRYPT_QUERY_CDS = (data: any) => `\\${ENCRYPT_CDS(FormatPhoneNumber(data))?.slice(1, -1)}`;

export const DECRYPT_CDS = (buffPG: string) => {
  try {
    if (!buffPG) return null;
    const buff = buffPG.replace('\\x', '');
    const encypt = DECRYPT_ASE(cdsKey, cdsEncryptionIV, buff);
    return encypt;
  } catch (err) {
    console.log(err);
    return null;
  }
};
