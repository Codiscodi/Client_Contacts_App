import React from 'react'
import style from './Alert.module.css'
import {AlertItem} from './AlertItem'

export const Alert = ({messages}) => {
    const items = messages.map(item => <AlertItem key={item.id} type={item.type} message={item.message}/>)

    return (
        <div className={style.wrapper}>
            {items}
        </div>
    )
}