import React from 'react'
import style from './AuthInput.module.css'

export const AuthInput = ({data, changeInput}) => {
    return (
        <div className={style.inputGroup}>
            <label htmlFor={data.id}>
                <strong>{data.title}</strong>
            </label>
            <input id={data.id}
                   type={data.type}
                   placeholder={data.placeholder}
                   value={data.value}
                   onChange={changeInput} />
        </div>
    )
}