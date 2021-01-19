import {
    APP_READY, APP_LOADING_SHOW, APP_LOADING_HIDDEN, APP_ADD_ALERT_MESSAGE, APP_DELETE_ALERT_MESSAGE
} from '../types/types'

export const appReady = () => ({type: APP_READY})
export const appLoadingShow = () => ({type: APP_LOADING_SHOW})
export const appLoadingHidden = () => ({type: APP_LOADING_HIDDEN})
export const appDeleteAlertMessage = (alert) => ({type: APP_DELETE_ALERT_MESSAGE, payload: alert})

export const appAddAlertMessage = (type, message) => {
    return async dispatch => {
        try {
            const alert = {id: Date.now(), type: type, message: message}
            await dispatch({type: APP_ADD_ALERT_MESSAGE, payload: alert})
            setTimeout(() => dispatch(appDeleteAlertMessage(alert)), 3000)
        } catch (e) {
            console.log(e)
        }
    }
}