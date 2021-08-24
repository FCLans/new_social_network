import { ProfileInfoType } from '../types/types'
import { AuthMeType, UsersDataType } from '../types/apiTypes'

const apiKey = '9d3fc0c8-6701-4cc5-b24c-b92d3aeff07b'

class ApiSocialNetwork2 {
  baseUrl: string
  headers: HeadersInit
  credential: RequestCredentials

  constructor(baseUrl: string, headers = {}, withCredential: RequestCredentials) {
    this.baseUrl = baseUrl
    this.headers = headers
    this.credential = withCredential || 'omit'
  }

  get(path = '') {
    return fetch(this.baseUrl + path, {
      method: 'GET',
      headers: this.headers,
      credentials: this.credential,
    })
  }

  delete(path = '') {
    return fetch(this.baseUrl + path, {
      method: 'DELETE',
      headers: this.headers,
      credentials: this.credential,
    })
  }

  post(path = '', body = {}) {
    return fetch(this.baseUrl + path, {
      method: 'POST',
      headers: this.headers,
      credentials: this.credential,
      body: JSON.stringify(body),
    })
  }

  put(path = '', body: any) {
    let headers = this.headers
    let bodyData = JSON.stringify(body)

    if (path === 'profile/photo') {
      headers = {
        'API-KEY': apiKey,
      }
      bodyData = body
    }

    return fetch(this.baseUrl + path, {
      method: 'PUT',
      headers: headers,
      credentials: this.credential,
      body: bodyData,
    })
  }
}

const headers = {
  'Content-Type': 'application/json',
  'API-KEY': apiKey,
}

const instance = new ApiSocialNetwork2('https://social-network.samuraijs.com/api/1.0/', headers, 'include')

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
    return instance.get(`profile/${userId}`).then((resp: Response) => {
      return resp.json()
    })
  },

  getProfileStatus(userId: number): Promise<string> {
    return instance.get(`profile/status/${userId}`).then((resp) => {
      if (resp.status >= 200 && resp.status < 300) {
        return resp.json()
      }
    })
  },

  updateProfileStatus(status: string): Promise<ResponseData> {
    return instance.put('profile/status', { status: status }).then((resp) => {
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
  getUsers(pageSize: number, numberPage: number): Promise<UsersDataType> {
    return instance.get(`users?count=${pageSize}&page=${numberPage}`).then((response) => response.json())
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
