import { Injectable, ExecutionContext, UnauthorizedException, CanActivate } from "@nestjs/common"
import { AuthService } from "src/service/auth.service"
import { config } from "src/config"

@Injectable()
export class TokenAuthGuard implements CanActivate {
    constructor(private readonly authService: AuthService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest()
        const authHeaders = request.headers.authorization
        if (!authHeaders) throw new UnauthorizedException("Authorization header is missing")

        const idToken = authHeaders.split(" ")[1]
        try {
            const decodedToken = await this.authService.VerifyToken(idToken, config.AUTH.JWT_SECRET)
            console.log("[DECODED TOKEN]:", decodedToken) // Log the decoded token for debugging
            request.user = decodedToken
            return true
        } catch (err) {
            throw new UnauthorizedException("Invalid token")
        }
    }
}
