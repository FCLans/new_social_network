import { UsersDataType } from '../types/apiTypes'
import { UserType } from '../types/types'

class ApiSocialNetwork {
  baseUrl: string
  headers: HeadersInit

  constructor() {
    this.baseUrl = 'https://rickandmortyapi.com/api'
    this.headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    }
  }

  _baseApiUsers = async <T>(apiPath: string): Promise<T> => {
    const response = await fetch(`${this.baseUrl}/character/${apiPath}`, {
      headers: this.headers,
    })
    return await response.json()
  }

  getUsers = (currentPage: number) => {
    return this._baseApiUsers<UsersDataType>(`?page=${currentPage}`)
  }

  getUserInfo = async (userId: number) => {
    return await this._baseApiUsers<UserType>(`${userId}`)
  }

  // Тут дальше могли бы быть методы под POST запросы, но сторонняя API, не может мне предложить этого.
  // Но я бы сделал все по аналогии с GET запросами.
}

export const api = new ApiSocialNetwork()
