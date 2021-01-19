import React from 'react'
import style from './InfoPerson.module.css'
import {InputBlockPerson} from '../InputBlockPerson/InputBlockPerson'

export const InfoPerson = ({data, inputChange, createNewContact, updateContact,copyField}) => {
    return (
        <div className={style.wrapper}>
            {!data.isChange ? <h2>{data.data.name}</h2> :
                <input id='Name' type="text" placeholder='Name' className={style.input + ' ' + style.inputName}
                       value={data.data.name} onChange={inputChange}/>}

            <InputBlockPerson title='Phone' value={data.data.phone} isChange={data.isChange}
                              inputChange={inputChange} copyField={copyField}/>
            <InputBlockPerson title='Email' value={data.data.email} isChange={data.isChange}
                              inputChange={inputChange} copyField={copyField}/>
            <InputBlockPerson title='Instagram' value={data.data.instagram} isChange={data.isChange}
                              inputChange={inputChange} copyField={copyField}/>

            {data.isChange ?
                <button className='btnGreen' onClick={data.isNew ? createNewContact : updateContact}>
                    <i className="far fa-save"/> {data.isNew ?  'Add contact' : 'Save Change'}
                </button> : null}



        </div>
    )
}