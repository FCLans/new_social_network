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
  put(path = '', body = {}) {
    return fetch(this.baseUrl + path, {
      method: 'PUT',
      headers: this.headers,
      credentials: this.credential,
      body: JSON.stringify(body),
    })
  }
}
const headers = {
  'API-KEY': '1f4ea4f4-0216-4d33-9542-5146b24606f1',
}
const include = new ApiSocialNetwork2('https://social-network.samuraijs.com/api/1.0/', headers, 'include')

export const ProfileApi = {
  getProfile(userId: number) {
    return include.get(`profile/${userId}`).then((resp) => {
      return resp.json()
    })
  },
  getProfileStatus(userId: number) {
    return include.get(`profile/status/${userId}`).then((resp) => {
      return resp.json()
    })
  },
  updateProfileStatus(status: string) {
    return include.put('profile/status', { status: status }).then((resp) => {
      return resp.json()
    })
  },
}

export const UsersApi = {
  getUsers(pageSize: number, numberPage: number) {
    return include.get(`users?count=${pageSize}&page=${numberPage}`)
  },
}
