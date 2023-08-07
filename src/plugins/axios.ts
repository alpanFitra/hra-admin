import router from '@/router'
import axios from 'axios'

const axiosIns = axios.create({
  baseURL: 'https://hraapi.rzkmlna.tech/api',
  headers: {
    'Authorization': 'Bearer ' + localStorage.getItem('hra-token'),
  },
})

// ℹ️ Add response interceptor to handle 401 response
axiosIns.interceptors.response.use(response => {
  return response
}, error => {
  // Handle error
  if (error.response.status === 401) {
    // ℹ️ Logout user and redirect to login page
    // Remove "accessToken" from localStorage
    localStorage.removeItem('hra-token')

    // If 401 response returned from api
    router.push('/login')
  }
  else {
    return Promise.reject(error)
  }
})

export default axiosIns
