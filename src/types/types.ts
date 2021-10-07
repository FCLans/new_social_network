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

type ContactsType = {
  github: string
  vk: string
  facebook: string
  instagram: string
  twitter: string
  website: string
  youtube: string
  mainLink: string
}

export type ProfileInfoType = {
  userId: number
  fullName: string
  lookingForAJob?: boolean
  lookingForAJobDescription: string
  aboutMe: string
  contacts?: ContactsType
  photos: {
    large: string
    small?: string
  }
  location: LocationType
  status?: string
}

export type LocationType = {
  city?: string
  country?: string
}

export type StatusType = {
  status: string
}

export type UserType = {
  fullName: string
  id: number
  photos: {
    small: string
    large: string
  }
  status: StatusType
}
