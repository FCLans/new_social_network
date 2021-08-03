export class ApiSocialNetwork {
  constructor() {
    this.baseUrl = 'https://rickandmortyapi.com/api'
    this.headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    }
  }

  _baseApiUsers = async (apiPath) => {
      return await fetch(`${this.baseUrl}/character/${apiPath}`, {headers: this.headers})
        .then(response => response.ok ? response.json() : Promise.reject(response))
        .catch(() => alert('Произошла ошибка, перезагрузи страницу.'))
  }

  getUsers = async (currentPage) => {
    return await this._baseApiUsers(`?page=${currentPage}`)
  }

  getUserInfo = async (userId) => {
    return await this._baseApiUsers(`${userId}`)
  }
}