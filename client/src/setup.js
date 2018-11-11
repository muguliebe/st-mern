import axios from 'axios'

export const initBaseUrl = () => {
  console.log(axios.defaults.baseURL)
  console.log(axios.defaults.url)
  console.dir(axios.defaults)
  axios.defaults.proxy = {
    host: 'localhost',
    port: process.env.PORT || 3001
  }
  console.log(axios.defaults.proxy)
}
