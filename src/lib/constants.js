import { isEmpty } from 'lodash'

import { baseUrl } from './utils'

let headers = {
  'Content-Type': 'application/json',
}

export async function request(endpoint, flagJson = true) {
  if (!isEmpty(endpoint)) {
    try {
      const response = await fetch(`${baseUrl}${endpoint.url}`, {
        headers,
        ...endpoint.options,
      })
      if (flagJson) {
        const json = await response.json()
        if (!response.ok) {
          throw new Error(json.message)
        }
        return json
      }
      return response
    } catch (error) {
      console.log(error)
      return error.message
    }
  }
}
