import React, {useEffect, useCallback} from 'react'
import style from './App.module.css'
import {shallowEqual, useSelector, useDispatch} from 'react-redux'
import {useRoutes} from '../routes'
import {authSetAuthData} from '../actions/authActions'
import {Preloader} from '../components/Preloader/Preloader'
import {Alert} from '../components/Alert/Alert'

export const App = () => {
    const isAppReady = useSelector(state => state.app.isAppReady, shallowEqual)
    const isAuth = useSelector(state => state.auth.isAuth, shallowEqual)
    const isLoading = useSelector(state => state.app.isLoading, shallowEqual)
    const alertMessages = useSelector(state => state.app.alertMessages, shallowEqual)
    const dispatch = useDispatch()

    const checkAuth = useCallback(() => dispatch(authSetAuthData()),[dispatch])

    useEffect(() => checkAuth(), [checkAuth])

    const routes = useRoutes(isAuth)

    return (
        <div className={style.wrapper}>
            {isLoading && <Preloader/>}
            {alertMessages.length ? <Alert messages={alertMessages}/> : null}
            {isAppReady ? routes : <Preloader/>}
        </div>
    )
}