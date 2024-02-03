export interface Params {
  [key: string]: any
}

export interface LoginByUser {
  username: string
  password: string
}

export interface LoginByPhone {
  phone: string
  captcha: string
}

export interface UserList {
  id: string
  name: string
  gender: number
  age: number
  email: string
  address: string
  status: boolean
  ctime: string
}
