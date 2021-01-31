import React, {FC} from 'react'
import style from './Alert.module.css'
import {AlertItem} from './AlertItem'

type MessageType = {id: number, type: string, message: string}
type PropsType = {
    messages: Array<MessageType>
}

export const Alert:FC<PropsType> = ({messages}) => {
    const items = messages.map(item => <AlertItem key={item.id} type={item.type} message={item.message}/>)

    return (
        <div className={style.wrapper}>
            {items}
        </div>
    )
}