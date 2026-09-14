import { ApiError, ApiErrorBody, ApiResponse } from "../types.js"

export const apiResponse = <T>(data: T):  ApiResponse<T> => {
    return {
        success: true,
        data: data,
        error: null,
        meta: null
    }
}

export const apiError = (data: ApiErrorBody):  ApiError => {
    return {
        success: false,
        data: null,
        error: data,
        meta: null
    }
}