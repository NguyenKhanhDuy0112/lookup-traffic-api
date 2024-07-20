export interface StandardResponse<T> {
    data: T
    message: string
    status: number
    friendly_message: string
}
