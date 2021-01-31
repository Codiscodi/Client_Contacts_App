import {
    APP_READY, APP_LOADING_SHOW, APP_LOADING_HIDDEN, APP_ADD_ALERT_MESSAGE, APP_DELETE_ALERT_MESSAGE
} from '../types/types'
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "../reducers/rootReducer";


type appReadyType = { type: typeof APP_READY }
export const appReady = (): appReadyType => ({type: APP_READY})

type appLoadingShowType = { type: typeof APP_LOADING_SHOW }
export const appLoadingShow = (): appLoadingShowType => ({type: APP_LOADING_SHOW})

type appLoadingHiddenType = { type: typeof APP_LOADING_HIDDEN }
export const appLoadingHidden = (): appLoadingHiddenType => ({type: APP_LOADING_HIDDEN})

type alertMessageType = { id: number, type: string, message: string }

type appSetAlertMessageType = { type: typeof APP_ADD_ALERT_MESSAGE, payload: alertMessageType }
export const appSetAlertMessage = (alert: alertMessageType): appSetAlertMessageType => (
    {type: APP_ADD_ALERT_MESSAGE, payload: alert})

type appDeleteAlertMessageType = { type: typeof APP_DELETE_ALERT_MESSAGE, payload: alertMessageType }
export const appDeleteAlertMessage = (alert: alertMessageType): appDeleteAlertMessageType => (
    {type: APP_DELETE_ALERT_MESSAGE, payload: alert})

export const appAddAlertMessage = (type: string, message: string): ThunkType => {
    return async (dispatch) => {
        try {
            const alert: alertMessageType = {id: Date.now(), type: type, message: message}
            await dispatch(appSetAlertMessage(alert))
            setTimeout(() => dispatch(appDeleteAlertMessage(alert)), 3000)
        } catch (e) {
            console.log(e)
        }
    }
}

export type ActionsTypes = appReadyType | appLoadingShowType | appLoadingHiddenType |
    appSetAlertMessageType | appDeleteAlertMessageType

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>