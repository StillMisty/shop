export class ApiResponse<T = any> {
  success: boolean = false;
  data?: T;
  msg?: string;

  static success<T>(data?: T): ApiResponse<T> {
    return {
      success: true,
      data,
    };
  }

  static fail<T>(msg: string): ApiResponse<T> {
    return {
      success: false,
      msg,
    };
  }
}
