import { AuthController } from "src/controller/auth.controller"
import { UserController } from "src/controller/user.controller"

export const controllerProvider = [
    UserController,
    AuthController,
]
