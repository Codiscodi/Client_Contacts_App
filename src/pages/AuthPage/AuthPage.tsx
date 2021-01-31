import React, {FC} from 'react'
import style from './AuthPage.module.css'
import {fieldForm} from '../../reducers/authReducer'
import {AuthInput} from '../../components/AuthInput/AuthInput'

type PropsType = {
    template: {title: string, description: string}
    authFormData: {login: fieldForm, password: fieldForm}
    isLoading: boolean
    changeInput: (event: object) => void
    loginClick: () => void
    registrationClick: () => void
}

export const AuthPage:FC<PropsType> = ({template, authFormData, isLoading, changeInput, loginClick, registrationClick}) => {
    return (
        <div className={style.wrapper}>
            <div className={style.box}>
                <div className={style.boxTitle}>
                    <h1>{template.title}</h1>
                    <p>{template.description}</p>
                    <span/>
                </div>
                <div className={style.form}>
                    <AuthInput data={authFormData.login} changeInput={changeInput}/>
                    <AuthInput data={authFormData.password} changeInput={changeInput}/>
                    <div className={style.buttons}>
                        <button className='btnGreen' disabled={isLoading} onClick={loginClick}>Sign in</button>
                        <button className='btnBlue' disabled={isLoading} onClick={registrationClick}>Registration</button>
                    </div>
                </div>
            </div>
        </div>
    )
}