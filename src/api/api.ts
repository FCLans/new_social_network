import {UserType} from "../types/types";

export class ApiSocialNetwork {
  baseUrl: string
  headers: {}

  constructor() {
    this.baseUrl = 'https://rickandmortyapi.com/api'
    this.headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    }
  }

  _baseApiUsers = async (apiPath: string) => {
      return await fetch(`${this.baseUrl}/character/${apiPath}`, {headers: this.headers})
        .then(response => response.ok ? response.json() : Promise.reject(response))
        .catch(() => alert('Произошла ошибка, перезагрузи страницу.'))
  }

  getUsers = async (currentPage: number) => {
    return await this._baseApiUsers(`?page=${currentPage}`)
  }

  getUserInfo = async (userId: number) => {
    return await this._baseApiUsers(`${userId}`)
  }

  // Тут дальше могли бы быть методы под POST запросы, но сторонняя API, не может мне предложить этого.
  // Но я бы сделал все по аналогии с GET запросами.
}

