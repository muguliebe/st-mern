import axios from 'axios'

export const initBaseUrl = () => {
  const port = process.env.PORT || 3000
  axios.defaults.baseURL = 'http://localhost:' + port
}
