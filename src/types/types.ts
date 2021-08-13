export type MessagesDataType = {
  id: number
  text: string
}

export type DialogsDataType = {
  id: number
  name: string
}

export type PostDataType = {
  id: number
  message: string
  likesCount: number
}

export type ProfileInfoType = {
  userId: number
  fullName: string
  lookingForAJob?: boolean
  lookingForAJobDescription: string
  photos: {
    large: string
    small?: string
  }
  location: LocationType
}

export type LocationType = {
  city?: string
  country?: string
}

export type UserType = {
  name: string
  id: number
  photos: {
    small: string
    large: string
  }
  status: string
  followed: boolean
}
