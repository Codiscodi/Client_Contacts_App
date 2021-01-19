import React from 'react'
import style from './Contacts.module.css'
import {ContactItem} from './ContactItem/ContactItem'

export const Contacts = ({
                             data, toggleFavorite, searchChange, setActiveContact, activateChange, deleteContact,
                             addingContact
                         }) => {

    const sortByName = (a, b) => {
        return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
    }
    const contactItems = data.contacts
        .filter(i => i.name.toLowerCase().startsWith(data.search.toLowerCase()))
        .sort(sortByName).map(item => <ContactItem key={item._id}
                                                   data={item}
                                                   deleteContact={deleteContact}
                                                   setActiveContact={setActiveContact}
                                                   activateChange={activateChange}
                                                   toggleFavorite={toggleFavorite}/>)
    return (
        <div className={style.wrapper}>
            <div className={style.topBlock}>
                <button onClick={addingContact}><i className="fas fa-plus"/></button>
                <div className={style.search}>
                    <input type="text" placeholder='Search' value={data.search} onChange={searchChange}/>
                    <i className="fas fa-search"/>
                </div>
            </div>

            {contactItems.length ? <ul className={style.list}>{contactItems}</ul> : <p>The List Is Empty</p>}
        </div>
    )
}