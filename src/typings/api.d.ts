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
  phone: string
  email: string
  address: string
  status: boolean
  ctime: string
}

export interface RoleList {
  id: number
  name: string
  code: string
  status: boolean
  desc: string
  created_at: string
  updated_at: string
  closed_at: string
}
