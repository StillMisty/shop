export type SuccessResponse<T> = {
  success: true;
  data: T;
  message?: string;
};

export type ErrorResponse = {
  success: false;
  data?: never;
  message: string;
};

export type ApiResponse<T = any> = SuccessResponse<T> | ErrorResponse;

export const ApiResponse = {
  success<T>(data: T): SuccessResponse<T> {
    return {
      success: true,
      data,
    };
  },

  fail(msg: string): ErrorResponse {
    return {
      success: false,
      message: msg,
    };
  },

  handleApiResponse: <T>(response: ApiResponse<T>): T => {
    if (response.success) {
      return response.data; // TypeScript 现在知道 data 一定存在
    } else {
      throw new Error(response.message);
    }
  },
};
