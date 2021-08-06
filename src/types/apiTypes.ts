import { UserType } from './types'

type InfoType = {
  count: number
  pages: number
}

export type UsersDataType = {
  info: InfoType
  results: Array<UserType>
}
