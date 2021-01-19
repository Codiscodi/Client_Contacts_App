import React, {useCallback} from 'react'
import {useSelector, useDispatch, shallowEqual} from 'react-redux'
import {loginHandler, registrationHandler, authChangeForm} from '../actions/authActions'
import {AuthPage} from '../pages/AuthPage/AuthPage'

export const AuthPageContainer = () => {
    const template = useSelector(state => state.template.authPage, shallowEqual)
    const authFormData = useSelector(state => state.auth.form, shallowEqual)
    const isLoading = useSelector(state => state.app.isLoading, shallowEqual)
    const dispatch = useDispatch()

    const changeInput = useCallback(event => dispatch(authChangeForm(event)), [dispatch])

    const loginClick = useCallback(() => {
        dispatch(loginHandler(authFormData.login.value, authFormData.password.value))
    }, [dispatch, authFormData])

    const registrationClick = useCallback(() => {
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