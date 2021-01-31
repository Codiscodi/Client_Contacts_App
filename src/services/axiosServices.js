import axios from 'axios'

export const axiosServices = (method, url, data, token) => {
    return axios({method, url: `/api/${url}`, data, headers: {'Authorization': `Bearer ${token}`}})
}

