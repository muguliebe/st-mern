import axios from 'axios'

export const initBaseUrl = () => {
  const port = process.env.PORT || 3001
  axios.defaults.baseURL = 'http://localhost:' + port
}
