import { Module } from "@nestjs/common"
import { JwtModule } from "@nestjs/jwt"
import { AuthService } from "src/service/auth.service"
import { config } from "src/config"
import { UserRepository } from "src/repository/user.repository"
import { TypeOrmModule } from "@nestjs/typeorm"
import { User } from "src/entity/pg_lookup_traffic/user.entity"
import { ConnectionNameEnum } from "src/share/enum/connection.enum"

@Module({
    imports: [
        JwtModule.register({
            secret: config.AUTH.JWT_SECRET,
            signOptions: { expiresIn: config.AUTH.JWT_EXPIRED_IN },
        }),
        TypeOrmModule.forFeature([User], ConnectionNameEnum.LOOKUP_TRAFFIC),
    ],
    providers: [AuthService, UserRepository],
    exports: [AuthService],
})
export class AuthModule {}
