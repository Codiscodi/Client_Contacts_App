import React, {useCallback} from 'react'
import {useSelector, useDispatch, shallowEqual} from 'react-redux'
import {logoutHandler} from '../actions/authActions'
import {Header} from '../components/Header/Header'

export const HeaderContainer = () => {
    const template = useSelector(state => state.template.header, shallowEqual)
    const dispatch = useDispatch()

    const logout = useCallback(() => dispatch(logoutHandler()), [dispatch])

    return <Header template={template} logout={logout}/>
}