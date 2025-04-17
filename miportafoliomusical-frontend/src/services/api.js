import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:6161/api', // ajusta si cambias el puerto/backend
})

export default api
