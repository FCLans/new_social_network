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
    id: number
    name: string
    species: string
    gender: string
    image: string
    location: LocationType
}

export type LocationType = {
    name: string
    url: string
}

export type UserType = {
    name: string
    species: string
    gender: string
    location: LocationType
    id: number
    image: string
    followed?: boolean
}