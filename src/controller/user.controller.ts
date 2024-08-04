import { Controller, Get, UseGuards } from "@nestjs/common"
import { ApiTags, ApiBearerAuth, ApiResponse } from "@nestjs/swagger"
import { UserService } from "../service/user.service"
import { User as UserEntity } from "src/entity/pg_lookup_traffic/user.entity"
import { TokenAuthGuard } from "src/middleware/auth/token.guard"
import { User } from "src/middleware/user.decorator"
import { StandardResponse } from "src/DTO/common/standard.dto"

@Controller("user")
@ApiTags("user")
@ApiBearerAuth()
@UseGuards(TokenAuthGuard)
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get("/profile")
    @ApiResponse({ type: UserEntity, status: 200 })
    async getProfile(@User() user): Promise<StandardResponse<UserEntity>> {
        console.log("user: ", user)
        return this.userService.getUserById(user.payload?.user_id)
    }
}
