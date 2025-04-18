/**
 * 密码验证器
 */
export const validatePass = (rule: any, value: string, callback: any) => {
  if (value === "") {
    callback(new Error("请输入密码"));
  } else {
    callback();
  }
};

/**
 * 获取用户名验证规则
 */
export const usernameRules = [
  { required: true, message: "请输入用户名", trigger: "blur" },
  { min: 6, max: 20, message: "用户名长度应该在6~20之间", trigger: "blur" },
  {
    pattern: /^[a-zA-Z0-9_]+$/,
    message: "用户名只能包含字母、数字和下划线",
    trigger: "blur",
  },
];

/**
 * 获取密码验证规则
 */
export const passwordRules = [
  { required: true, validator: validatePass, trigger: "blur" },
  { min: 6, max: 20, message: "密码长度应该在6~20之间", trigger: "blur" },
  {
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
    message: "密码必须包含至少一个大写字母、一个小写字母和一个数字",
    trigger: "blur",
  },
];
