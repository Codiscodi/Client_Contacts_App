import React from 'react'
import style from './ContactsPage.module.css'
import {HeaderContainer} from '../../containers/HeaderContainer'
import {Contacts} from '../../components/Contacts/Contacts'
import {InfoPerson} from '../../components/InfoPerson/InfoPerson'
import {WelcomeWindow} from '../../components/WelcomeWindow/WelcomeWindow'

export const ContactPage = ({
                                data, toggleFavorite, searchChange, setActiveContact, inputChange, activateChange,
                                deleteContact, addingContact, createNewContact, updateContact, copyField
                            }) => {
    return (
        <div className={style.wrapper}>
            <div className={`container ${style.pageWrap}`}>
                <HeaderContainer/>
                <div className={style.contentWrap}>
                    <Contacts data={data}
                              addingContact={addingContact}
                              deleteContact={deleteContact}
                              setActiveContact={setActiveContact}
                              toggleFavorite={toggleFavorite}
                              activateChange={activateChange}
                              searchChange={searchChange}/>

                    {Object.keys(data.activeContact.data).length ? <InfoPerson data={data.activeContact}
                                                                               inputChange={inputChange}
                                                                               updateContact={updateContact}
                                                                               copyField={copyField}
                                                                               createNewContact={createNewContact}/>
                        : <WelcomeWindow/>}
                </div>
            </div>
        </div>
    )
}