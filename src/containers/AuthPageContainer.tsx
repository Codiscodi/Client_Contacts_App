import React, {useCallback} from 'react'
import {useSelector, useDispatch, shallowEqual} from 'react-redux'
import {AppStateType} from '../reducers/rootReducer'
import {loginHandler, registrationHandler, authChangeForm} from '../actions/authActions'
import {AuthPage} from '../pages/AuthPage/AuthPage'

export const AuthPageContainer = () => {
    const template = useSelector((state: AppStateType) => state.template.authPage, shallowEqual)
    const authFormData = useSelector((state: AppStateType) => state.auth.form, shallowEqual)
    const isLoading = useSelector((state: AppStateType) => state.app.isLoading, shallowEqual)
    const dispatch = useDispatch()

    const changeInput:(event: object) => void = useCallback(event => dispatch(authChangeForm(event)), [dispatch])

    const loginClick:() => void = useCallback(() => {
        dispatch(loginHandler(authFormData.login.value, authFormData.password.value))
    }, [dispatch, authFormData])

    const registrationClick:() => void = useCallback(() => {
        dispatch(registrationHandler(authFormData.login.value, authFormData.password.value))
    }, [dispatch, authFormData])

    return (
            <AuthPage template={template}
                      authFormData={authFormData}
                      isLoading={isLoading}
                      changeInput={changeInput}
                      loginClick={loginClick}
                      registrationClick={registrationClick}/>
    )
}