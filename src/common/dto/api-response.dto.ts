type ApiResponse<T> = {
    success: boolean,
    data: T,
    error: null,
    meta: null | Record<string, unknown>
}

export const apiResponse = <T>(data: T):  ApiResponse<T> => {
    return {
        success: true,
        data: data,
        error: null,
        meta: null
    }
}