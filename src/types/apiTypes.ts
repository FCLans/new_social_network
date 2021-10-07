type InfoType = {
  count: number
  pages: number
}

export type ManyItems<T> = {
  items: T
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
