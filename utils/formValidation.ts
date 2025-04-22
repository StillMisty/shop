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

/**
 * 地址address验证器
 */
export const addressRules = [
  { required: true, message: "请输入地址", trigger: "blur" },
  { min: 1, max: 50, message: "地址长度应该在6~50之间", trigger: "blur" },
  {
    pattern: /^[\u4e00-\u9fa5a-zA-Z0-9]+$/,
    message: "地址只能包含字母、数字和中文",
    trigger: "blur",
  },
];

/**
 * 手机号验证器
 */
export const phoneRules = [
  { required: true, message: "请输入手机号", trigger: "blur" },
  {
    pattern:
      /^(?:(?:\+|00)86)?(13[0-9]|14[01456789]|15[0-35-9]|17[0-35-8]|18[0-35-9]|19[0-35-9])\d{8}$/,
    message: "请输入有效的手机号",
    trigger: "blur",
  },
];

/**
 * 姓名验证器
 */
export const nameRules = [
  { required: true, message: "请输入姓名", trigger: "blur" },
  { min: 1, max: 50, message: "姓名长度应该在1~50之间", trigger: "blur" },
  {
    pattern: /^[\u4e00-\u9fa5a-zA-Z0-9]+$/,
    message: "姓名只能包含字母、数字和中文",
    trigger: "blur",
  },
];
