import request from 'superagent'

import { isAuthenticated, getEncodedToken } from 'authenticare/client'

export const baseUrl = '/api/v1'

export function callApi (method = 'get', endpoint, data = {}) {
  const payloadMethod = method.toLowerCase() === 'get' ? 'query' : 'send'
  const token = getEncodedToken()
  const headers = {
    Accept: 'application/json'
  }

  if (isAuthenticated()) {
    headers['Authorization'] = `Bearer ${token}`
  }

  return request[method](baseUrl + endpoint)
    .set(headers)[payloadMethod](data)
    .then(res => res)
    .catch(err => {
      throw err
    })
}
