export class ApiResponse<T = any> {
  success: boolean = false;
  data?: T;
  message?: string;

  static success<T>(data?: T): ApiResponse<T> {
    return {
      success: true,
      data,
    };
  }

  static fail<T>(msg: string): ApiResponse<T> {
    return {
      success: false,
      message: msg,
    };
  }

  static handleApiResponse = <T>(response: ApiResponse<T>): T => {
    if (response.success) {
      if (response.data === undefined) {
        throw new Error("data未定义");
      }
      return response.data;
    } else {
      throw new Error(response.message);
    }
  };
}
