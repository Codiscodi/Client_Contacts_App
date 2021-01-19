import {axiosServices} from '../services/axiosServices'

export const registerApi = (data) => {
    return axiosServices('post', 'auth/register', {login: data.login, password: data.password})
}

export const loginApi = (data) => {
    return axiosServices('post', 'auth/login', {login: data.login, password: data.password})
}