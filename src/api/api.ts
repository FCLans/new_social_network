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
      .then((response) => response.json())
      .then((data) => data)
  }

  delete(path = '') {
    return fetch(this.baseUrl + path, {
      method: 'DELETE',
      headers: this.headers,
      credentials: this.credential,
    })
      .then((response) => response.json())
      .then((data) => data)
  }

  post(path = '', body = {}) {
    return fetch(this.baseUrl + path, {
      method: 'POST',
      headers: this.headers,
      credentials: this.credential,
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => data)
  }

  put(path = '', body = {}) {
    return fetch(this.baseUrl + path, {
      method: 'PUT',
      headers: this.headers,
      credentials: this.credential,
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => data)
  }
}
const headers = {
  'API-KEY': '9d3fc0c8-6701-4cc5-b24c-b92d3aeff07b',
  'Content-type': 'application/json',
}
const instance = new ApiSocialNetwork2('https://social-network.samuraijs.com/api/1.0/', headers, 'include')

export const ProfileApi = {
  getProfile(userId: number) {
    return instance.get(`profile1/${userId}`)
  },

  getProfileStatus(userId: number) {
    return instance.get(`profile/status/${userId}`)
  },

  updateProfileStatus(status: string) {
    return instance.put('profile/status', { status: status })
  },
}

export const UsersApi = {
  getUsers(pageSize: number, numberPage: number) {
    return instance.get(`users?count=${pageSize}&page=${numberPage}`)
  },

  follow(userId: number) {
    return instance.post(`follow/${userId}`)
  },

  unfollow(userId: number) {
    return instance.delete(`follow/${userId}`)
  },
}

export const authApi = {
  me() {
    return instance.get('auth/me')
  },

  login(email: string, password: string, rememberMe = false) {
    return instance.post('auth/login', {
      email: email,
      password: password,
      rememberMe: rememberMe,
    })
  },

  logout() {
    return instance.delete('auth/login')
  },
}
