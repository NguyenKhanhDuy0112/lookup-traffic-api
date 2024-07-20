import {
  Injectable, ExecutionContext, UnauthorizedException,
} from '@nestjs/common';
import { config } from 'src/config';

const authenConstants = {
  xApiKey: 'x-api-key',
  autoCallUser: 'Auto call',
};

@Injectable()
export class ApiKeyAuthGuard {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers[authenConstants.xApiKey];
    if (apiKey === config.API_KEY) {
      request.user = authenConstants.autoCallUser;
      return request.user;
    }
    throw new UnauthorizedException();
  }
}
