import axios from "axios";

const axiosClient = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
})

axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('ACCESS_TOKEN');
    config.headers.Authorization = `Bearer ${123}`
    return config;
})

axiosClient.interceptors.response.use((response) => {
    return response
}, (error) => {
    const { response } = error;
    if (response.status === 401) {
        //Not authorized
        localStorage.removeItem('ACCESS_TOKEN')
        //reload window
    } else if (response.status === 404) {
        //Show not found page (404)
    }

    throw error;
})

export default axiosClient
