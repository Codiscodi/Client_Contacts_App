import React, {useEffect, useCallback, FC} from 'react'
import style from './App.module.css'
import {shallowEqual, useSelector, useDispatch} from 'react-redux'
import {AppStateType} from '../reducers/rootReducer'
import {useRoutes} from '../routes'
import {authSetAuthData} from '../actions/authActions'
import {Preloader} from '../components/Preloader/Preloader'
import {Alert} from '../components/Alert/Alert'

export const App:FC = () => {

    const isAppReady = useSelector((state: AppStateType) => state.app.isAppReady, shallowEqual)
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth, shallowEqual)
    const isLoading = useSelector((state: AppStateType) => state.app.isLoading, shallowEqual)
    const alertMessages = useSelector((state: AppStateType) => state.app.alertMessages, shallowEqual)
    const dispatch = useDispatch()

    const checkAuth:() => void = useCallback(() => dispatch(authSetAuthData()),[dispatch])

    useEffect(() => checkAuth(), [checkAuth])

    const routes:JSX.Element = useRoutes(isAuth)

    return (
        <div className={style.wrapper}>
        <Preloader/>
            {isLoading && <Preloader/>}
            {alertMessages.length ? <Alert messages={alertMessages}/> : null}
            {isAppReady ? routes : <Preloader/>}
        </div>
    )
}