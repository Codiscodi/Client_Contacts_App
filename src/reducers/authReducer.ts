import {AUTH_CLEAN_FORM, AUTH_SET_AUTH, AUTH_SET_USER, AUTH_LOGOUT, AUTH_CHANGE_FORM} from '../types/types'
import {ActionsTypes} from '../actions/authActions'

export type fieldForm = {
    id: string, type: string, title: string, placeholder: string, value: string
}
const initialState = {
    isAuth: false,
    user: {
        id: null as string | null,
        login: null as string | null,
        token: null as string | null
    },
    form: {
        login: {id: 'login', type: 'text', title: 'Login', placeholder: 'Enter your login', value: ''},
        password: {id: 'password', type: 'password', title: 'Password', placeholder: 'Enter your password', value: ''}
    } as {
        login: fieldForm, password: fieldForm
    }
}

export type initialStateType = typeof initialState

export const authReducer = (state = initialState, action: ActionsTypes):initialStateType => {
    switch (action.type) {
        case AUTH_CHANGE_FORM:
            // @ts-ignore
            const input: string = action.payload.target.id
            // @ts-ignore
            return {...state, form: {...state.form, [input]: {...state.form[input], value: action.payload.target.value}}}
        case AUTH_CLEAN_FORM:
            return {
                ...state, form: {
                    ...state.form,
                    login: {...state.form.login, value: ''}, password: {...state.form.password, value: ''}
                }
            }
        case AUTH_SET_AUTH:
            return {...state, isAuth: true}
        case AUTH_SET_USER:
            return {
                ...state,
                user: {...state.user, id: action.payload.id, login: action.payload.login, token: action.payload.token}
            }
        case AUTH_LOGOUT:
            return {...state, isAuth: false, user: {...state.user, id: null, login: null, token: null}}
        default:
            return state
    }
}