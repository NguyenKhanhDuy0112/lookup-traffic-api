import { HttpException, HttpStatus, Injectable } from "@nestjs/common"
import { UserRepository } from "src/repository/user.repository"
import { User } from "src/entity/pg_lookup_traffic/user.entity"
import { UpdateUserDto } from "src/DTO/user/updateUser.dto"
import { ErrorConstant } from "src/share/contant/error.contant"
import { BaseService } from "./base.service"
import { StandardResponse } from "src/DTO/common/standard.dto"
import { MessageResponse } from "src/share/enum/connection.enum"

@Injectable()
export class UserService extends BaseService {
    constructor(private readonly userRepository: UserRepository) {
        super()
    }

    async getUserById(userId: string): Promise<StandardResponse<User>> {
        console.log("userId: ", userId)
        const user = await this.userRepository.findOne({
            where: { id: userId },
            relations: ["vehicles", "violations", "licenses"],
        })

        if (!user) {
            this.throwErrorResponse(
                null,
                MessageResponse.FAILED,
                "Người dùng không được tìm thấy",
                HttpStatus.NOT_FOUND
            )
        }
        
        return this.createSuccessResponse(user, MessageResponse.SUCCESS, MessageResponse.SUCCESS)
    }

    async updateUser(userId: string, userData: UpdateUserDto): Promise<StandardResponse<User>> {
        const existingUser = await this.getUserById(userId)
        if (!existingUser) {
            throw new HttpException(ErrorConstant.NOT_FOUND, HttpStatus.NOT_FOUND)
        }
        await this.userRepository.update(userId, userData)
        return this.getUserById(userId)
    }

    async deleteUser(userId: string): Promise<void> {
        await this.userRepository.delete(userId)
    }
}
