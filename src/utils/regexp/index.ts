export function checkUserName(str: string): boolean {
  return /^[a-zA-Z0-9_-]{4,16}$/.test(str)
}

export function checkPhone(str: string): boolean {
  return /^1\d{10}$/.test(str)
}

/* 6位数字验证码正则 */
export const REGEXP_CODE_SIX = /^\d{6}$/

/* 4位数字验证码正则 */
export const REGEXP_CODE_FOUR = /^\d{4}$/

function validateUserName(rule: any, value: any, callback: any) {
  if (!value || !checkUserName(value))
    return callback(new Error(rule.message))

  callback()
}

function validatePhone(rule: any, value: any, callback: any) {
  if (!value || !checkPhone(value))
    return callback(new Error(rule.message))

  callback()
}

export const formRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { validator: validateUserName, message: '用户名为4-16位字符/数字的组合', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 18, message: '密码长度至少6~18位', trigger: 'change' },
  ],
  confirmPwd: (pwd: Ref<string>) => {
    return [
      { required: true, message: '请再次输入密码', trigger: 'blur' },
      {
        validator: (rule: any, value: any, callback: any) => {
          if (!value || value !== pwd.value)
            return callback(new Error(rule.message))

          callback()
        },
        message: '两次密码输入不一致',
        trigger: 'blur',
      },
    ]
  },
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { validator: validatePhone, message: '手机号码格式错误', trigger: 'blur' },
  ],
  smsCode: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    { pattern: REGEXP_CODE_SIX, message: '验证码不正确', trigger: 'blur' },
  ],
  code: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    { pattern: REGEXP_CODE_FOUR, message: '验证码不正确', trigger: 'blur' },
  ],
}
