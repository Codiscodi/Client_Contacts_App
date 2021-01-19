import React, {useCallback, useEffect} from 'react'
import {useSelector, useDispatch, shallowEqual} from 'react-redux'
import {
    contactsChangeSearch, contactToggleFavorite, contactsSetActiveContact, contactActivateChange, contactInputChange,
    contactsDeleteContact, contactsAddingContact, contactsSetContacts, contactsCreateNewContact, contactsUpdateContact,
    contactCopyField
} from '../actions/contactsActions'
import {ContactPage} from '../pages/ContactsPage/ContactsPage'

export const ContactsPageContainer = () => {
    const data = useSelector(state => state.contacts, shallowEqual)
    const user = useSelector(state => state.auth.user, shallowEqual)
    const dispatch = useDispatch()

    const searchChange = useCallback(event => dispatch(contactsChangeSearch(event.target.value)),[dispatch])
    const toggleFavorite = useCallback(contact => dispatch(contactToggleFavorite(contact, user.token)),[dispatch, user])
    const setActiveContact = useCallback(id => dispatch(contactsSetActiveContact(id)),[dispatch])
    const activateChange = useCallback(id => dispatch(contactActivateChange(id)),[dispatch])
    const inputChange = useCallback(event => dispatch(contactInputChange(event)),[dispatch])
    const deleteContact = useCallback(id => dispatch(contactsDeleteContact(id, user.token, data.activeContact)), [dispatch, data, user])
    const addingContact = useCallback(() => dispatch(contactsAddingContact()), [dispatch])
    const setContacts = useCallback(() => dispatch(contactsSetContacts(user.token)), [dispatch, user])
    const createNewContact = useCallback(() => dispatch(contactsCreateNewContact(user.token, data.activeContact.data)), [dispatch, user, data])
    const updateContact = useCallback(() => dispatch(contactsUpdateContact(data.activeContact.data, user.token)), [dispatch, data, user])
    const copyField = useCallback(dataField => dispatch(contactCopyField(dataField)), [dispatch])

    useEffect(() => setContacts(), [setContacts])

    return (
        <ContactPage data={data}
                     toggleFavorite={toggleFavorite}
                     setActiveContact={setActiveContact}
                     deleteContact={deleteContact}
                     inputChange={inputChange}
                     activateChange={activateChange}
                     searchChange={searchChange}
                     updateContact={updateContact}
                     addingContact={addingContact}
                     copyField={copyField}
                     createNewContact={createNewContact}/>
    )
}