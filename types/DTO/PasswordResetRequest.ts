export interface PasswordResetRequest {
  /**
   * 新密码
   */
  newPassword: string;
  /**
   * 旧密码
   */
  oldPassword: string;
}
