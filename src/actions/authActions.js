import {AUTH_CLEAN_FORM, AUTH_SET_USER, AUTH_SET_AUTH, AUTH_LOGOUT, AUTH_CHANGE_FORM} from '../types/types'
import {appLoadingShow, appLoadingHidden, appAddAlertMessage, appReady} from './appActions'
import {registerApi, loginApi} from '../api/authApi'
import {setLocalStorage, deleteLocalStorage, getDataLocalStorage} from '../services/authStorageServices'

export const authChangeForm = (event) => ({type: AUTH_CHANGE_FORM, payload: event})
export const authCleanForm = () => ({type: AUTH_CLEAN_FORM})
export const authSetUser = (data) => ({type: AUTH_SET_USER, payload: data})
export const authSetAuth = () => ({type: AUTH_SET_AUTH})
export const authLogout = () => ({type: AUTH_LOGOUT})

export const authSetAuthData = () => {
    const data = getDataLocalStorage()
    return async dispatch => {
        if (data) {
            await dispatch(authSetUser(data))
            await dispatch(authSetAuth())
        }
        await dispatch(appReady())
    }
}

export const loginHandler = (login, password) => {
    return async dispatch => {
        try {
            if (!login || !password) return dispatch(appAddAlertMessage('error', 'Логин и пароль должны быть заполнены'))
            await dispatch(appLoadingShow())
            await loginApi({login, password})
                .then(res => {
                        dispatch(appAddAlertMessage('info', res.data.message))
                        const userData = {id: res.data.id, login: res.data.login, token: res.data.token}
                        dispatch(authSetUser(userData))
                        dispatch(authSetAuth())
                        setLocalStorage(userData)
                        dispatch(authCleanForm())})
                .catch(err => dispatch(appAddAlertMessage('error', err.response.data.message || 'Что-то пошло не так')))
            await dispatch(appLoadingHidden())
        } catch (e) {
            console.log(e)
        }
    }
}

export const logoutHandler = () => {
    return async dispatch => {
        try {
            await deleteLocalStorage()
            dispatch(authLogout())
        } catch (e) {
            console.log(e)
        }
    }
}

export const registrationHandler = (login, password) => {
    return async dispatch => {
        try {
            if (!login || !password) return dispatch(appAddAlertMessage('error', 'Логин и пароль должны быть заполнены'))
            await dispatch(appLoadingShow())
            await registerApi({login, password})
                .then(res => dispatch(appAddAlertMessage('success', res.data.message)))
                .catch(err => dispatch(appAddAlertMessage('error', err.response.data.message || 'Что-то пошло не так!')))
            await dispatch(appLoadingHidden())
        } catch (e) {
            console.log(e)
        }
    }
}