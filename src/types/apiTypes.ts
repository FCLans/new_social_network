import { UserType } from './types'

type InfoType = {
  count: number
  pages: number
}

export type UsersDataType = {
  items: Array<UserType>
  count: number
}

export type MeDataType = {
  id: number
  email: string
  login: string
}

export type AuthMeType = {
  data: MeDataType
  resultCode: number
  messages: Array<string>
}
