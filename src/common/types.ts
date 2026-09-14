import { Error_Codes } from "./enums/ErrorCodes.js"

export type ApiErrorBody = {
    code: Error_Codes,
    message: string,
    details?: Record<string, unknown>
}

export type ApiResponse<T> = {
    success: true,
    data: T,
    error: null,
    meta: null | Record<string, unknown>
}

export type ApiError = {
    success: false,
    data: null,
    error: ApiErrorBody
    meta: null
}