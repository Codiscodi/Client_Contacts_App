import React from 'react'
import style from './Alert.module.css'

export const AlertItem = ({type, message}) => {

    return (
        <span className={
            type === 'success' ? style.success :
                type === 'error' ? style.error :
                    type === 'info' ? style.info :
                        null}>
                {message}
            </span>
    )
}