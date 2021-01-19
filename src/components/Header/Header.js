import React from 'react'
import style from './Header.module.css'

export const Header = ({template, logout}) => {
    return (
        <div className={style.wrapper}>
            <p className={style.logo}><strong>{template.logoTitle}</strong></p>
            <span className={style.logout} onClick={logout}>
                <i className="fas fa-power-off"/> {template.logoutTitle}
            </span>
        </div>
    )
}