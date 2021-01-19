import {
    APP_READY, APP_LOADING_SHOW, APP_LOADING_HIDDEN, APP_ADD_ALERT_MESSAGE, APP_DELETE_ALERT_MESSAGE
} from '../types/types'

const initialState = {
    isAppReady: false,
    isLoading: false,
    alertMessages: []
}

export const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case APP_READY:
            return {...state, isAppReady: true}
        case APP_LOADING_SHOW:
            return {...state, isLoading: true}
        case APP_LOADING_HIDDEN:
            return {...state, isLoading: false}
        case APP_ADD_ALERT_MESSAGE:
            return {...state, alertMessages: [...state.alertMessages, action.payload]}
        case APP_DELETE_ALERT_MESSAGE:
            return {...state, alertMessages: [...state.alertMessages].filter(i => i !== action.payload)}
        default:
            return state
    }
}