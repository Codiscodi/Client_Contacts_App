import {AUTH_CLEAN_FORM, AUTH_SET_AUTH, AUTH_SET_USER, AUTH_LOGOUT, AUTH_CHANGE_FORM} from '../types/types'

const initialState = {
    isAuth: false,
    user: {
        id: null,
        login: null,
        token: null
    },
    form: {
        login: {id: 'login', type: 'text', title: 'Login', placeholder: 'Enter your login', value: ''},
        password: {id: 'password', type: 'password', title: 'Password', placeholder: 'Enter your password', value: ''}
    }
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {

        case AUTH_CHANGE_FORM:
            const input = action.payload.target.id
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