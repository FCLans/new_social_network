import { ProfileInfoType } from '../types/types'

const apiKey = '1f4ea4f4-0216-4d33-9542-5146b24606f1'

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

export const ProfileApi = {
  getProfile(userId: number) {
    return instance.get(`profile/${userId}`).then((resp) => {
      return resp.json()
    })
  },

  getProfileStatus(userId: number) {
    return instance.get(`profile/status/${userId}`).then((resp) => {
      if (resp.status >= 200 && resp.status < 300) {
        return resp.json()
      }
    })
  },

  updateProfileStatus(status: string) {
    return instance.put('profile/status', { status: status }).then((resp) => {
      return resp.json()
    })
  },

  updateProfileInfo(profileData: ProfileInfoType) {
    return instance.put('profile', profileData).then((resp) => {
      return resp.json()
    })
  },

  updateAvatar(file: File) {
    const formData = new FormData()
    formData.append('image', file)

    return instance.put('profile/photo', formData).then((resp) => {
      return resp.json()
    })
  },
}

export const UsersApi = {
  getUsers(pageSize: number, numberPage: number) {
    return instance.get(`users?count=${pageSize}&page=${numberPage}`).then((response) => response.json())
  },

  follow(userId: number) {
    return instance.post(`follow/${userId}`).then((res) => res.json())
  },

  unfollow(userId: number) {
    return instance.delete(`follow/${userId}`).then((res) => res.json())
  },
}

export const AuthApi = {
  me() {
    return instance
      .get('auth/me')
      .then((response) => response.json())
      .then((data) => data)
  },

  login(email: string, password: string, rememberMe = false, captcha: string = null) {
    return instance
      .post('auth/login', {
        email: email,
        password: password,
        rememberMe: rememberMe,
        captcha: captcha,
      })
      .then((res) => res.json())
      .then((data) => data)
  },

  logout() {
    return instance.delete('auth/login').then((resp) => resp.json())
  },
}

export const SecurityApi = {
  getCaptchaUrl() {
    return instance
      .get('security/get-captcha-url')
      .then((res) => res.json())
      .then((data) => data)
  },
}
