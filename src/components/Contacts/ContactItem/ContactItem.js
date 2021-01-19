import React from 'react'
import style from './ContactItem.module.css'

export const ContactItem = ({data, toggleFavorite, setActiveContact, activateChange, deleteContact}) => {
    return (
        <li className={style.wrapper} onClick={event => setActiveContact(data._id)}>
            <div className={style.top}>
                {data.name}
                <button className={style.btnFavorite}
                        onClick={event => {
                            event.stopPropagation()
                            toggleFavorite(data)
                        }}>
                    {data.isFavorite ? <i className="fas fa-star" style={{color: 'orange'}}/> : <i className="far fa-star"/>}
                </button>
                <button className={style.btnChange} onClick={event => {
                    event.stopPropagation()
                    activateChange(data._id)
                }}>
                    <i className="far fa-edit"/>
                </button>
                <button className={style.btnDelete} onClick={event => {
                    event.stopPropagation()
                    deleteContact(data._id)
                }}><i className="far fa-trash-alt"/></button>
            </div>

            <div className={style.contacts}>
                {data.phone && <i className="fas fa-phone-square-alt"/>}
                {data.email && <i className="fas fa-envelope-square"/>}
                {data.instagram && <i className="fab fa-instagram-square"/>}
            </div>
        </li>
    )
}