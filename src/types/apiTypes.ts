import { UserType } from './types'

type InfoType = {
  count: number
  pages: number
}

export type UsersDataType = {
  items: Array<UserType>
  totalCount: number
  error?: string
}
