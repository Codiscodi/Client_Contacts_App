import React from 'react'
import style from './InputBlockPerson.module.css'
import {CopyToClipboard} from 'react-copy-to-clipboard/lib/Component'

export const InputBlockPerson = ({title, value, inputChange, isChange, copyField}) => {
    return (
        <div className={style.inputBlock}>
            <div className={style.top}>
                <label htmlFor={title}>{title}</label>
                <CopyToClipboard text={value} onCopy={() => copyField({title, value})}>
                    <button className='btnBlue'><i className="far fa-copy"/></button>
                </CopyToClipboard>
            </div>
            <input id={title} type="text" className={style.input} placeholder={title} disabled={!isChange} value={value}
                   onChange={inputChange}/>
        </div>
    )
}