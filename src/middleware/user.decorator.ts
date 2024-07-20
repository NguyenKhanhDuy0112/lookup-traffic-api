import { createParamDecorator, ExecutionContext } from "@nestjs/common"

export const User = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest()
    console.log("[USER DECORATOR]:", request.user) // Log the user object for debugging

    // Ensure user payload structure is correct
    if (request.user && request.user.payload) {
        return request.user.payload // Ensure we're returning the correct payload
    }
    return null
})
