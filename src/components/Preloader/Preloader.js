import React from 'react'
import style from './Preloader.module.css'

export const Preloader = () => {
    return (
        <div className={style.wrapper}>
            <div className={style.loader}>
                <div className={style.element}>
                    <span/><span/><span/>
                </div>
                <div className={style.element}>
                    <span/><span/><span/>
                </div>
                <div className={style.element}>
                    <span/><span/><span/>
                </div>
                <div className={style.element}>
                    <span/><span/><span/>
                </div>
            </div>
        </div>
    )
}