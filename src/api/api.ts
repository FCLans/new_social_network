import { ProfileInfoType, UserType } from '../types/types'
import { AuthMeType, ManyItems } from '../types/apiTypes'

class ApiSocialNetwork2 {
  baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  get(path = '') {
    return fetch(this.baseUrl + path, {
      method: 'GET',
    })
  }

  delete(path = '') {
    return fetch(this.baseUrl + path, {
      method: 'DELETE'
    })
  }

  post(path = '', body = {}) {
    console.log(body)

    return fetch(this.baseUrl + path, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  put(path = '', body: any) {
    let bodyData = JSON.stringify(body)

    if (path === 'profile/photo') {
      bodyData = body
    }

    return fetch(this.baseUrl + path, {
      method: 'PUT',
      body: bodyData,
    })
  }
}

const instance = new ApiSocialNetwork2('http://localhost:5000/api/')

interface ResponseData {
  resultCode: number
  messages: Array<string>
  data: any
}

interface UpdateAvatarResponse extends ResponseData {
  data: {
    photos: {
      small: string | null
      large: string | null
    }
  }
}

interface GetCaptchaResponse {
  url: string
}

export enum ResultCodeEnum {
  Success = 0,
  Error = 1,
}

export enum ResultCodeForCaptcha {
  CaptchaIsRequired = 10,
}

export const ProfileApi = {
  getProfile(userId: number): Promise<ProfileInfoType> {
    return instance.get(`users/${userId}`).then((resp: Response) => {
      return resp.json()
    })
  },

  async getProfileStatus(userId: number): Promise<string> {
    const status =  await instance.get(`users/status/${userId}`).then((resp) => {
      if (resp.status >= 200 && resp.status < 300) {
        return resp.json()
      }
    })

    return status.status
  },

  updateProfileStatus(status: string, userId: number): Promise<ResponseData> {
    const body = {
      status: status,
      user_id: userId
    }

    return instance.post('users/status', {...body}).then((resp) => {
      return resp.json()
    })
  },

  updateProfileInfo(profileData: ProfileInfoType): Promise<ResponseData> {
    return instance.put('profile', profileData).then((resp) => {
      return resp.json()
    })
  },

  updateAvatar(file: File): Promise<UpdateAvatarResponse> {
    const formData = new FormData()
    formData.append('image', file)

    return instance.put('profile/photo', formData).then((resp) => {
      return resp.json()
    })
  },
}

export const UsersApi = {
  getUsers(pageSize: number, numberPage: number): Promise<ManyItems<UserType[]>> {

    const skip = numberPage * 10 - pageSize

    return instance.get(`users?take=${pageSize}&skip=${skip}`).then((response) => response.json())
  },

  follow(userId: number): Promise<ResponseData> {
    return instance.post(`follow/${userId}`).then((res) => res.json())
  },

  unfollow(userId: number): Promise<ResponseData> {
    return instance.delete(`follow/${userId}`).then((res) => res.json())
  },
}

export const AuthApi = {
  me(): Promise<AuthMeType> {
    return instance.get('auth/me').then((response) => response.json())
  },

  login(email: string, password: string, rememberMe = false, captcha: string | null = null): Promise<ResponseData> {
    return instance
      .post('auth/login', {
        email: email,
        password: password,
        rememberMe: rememberMe,
        captcha: captcha,
      })
      .then((res) => res.json())
  },

  logout(): Promise<ResponseData> {
    return instance.delete('auth/login').then((resp) => resp.json())
  },
}

export const SecurityApi = {
  getCaptchaUrl(): Promise<GetCaptchaResponse> {
    return instance.get('security/get-captcha-url').then((res) => res.json())
  },
}
