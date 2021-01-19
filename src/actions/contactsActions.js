import {
    CONTACTS_CHANGE_SEARCH, CONTACT_TOGGLE_FAVORITE, CONTACTS_SET_ACTIVE_CONTACT, CONTACT_ACTIVATE_CHANGE,
    CONTACT_INPUT_CHANGE, CONTACTS_CLEAN_ACTIVE_CONTACT, CONTACTS_DELETE_CONTACT, CONTACTS_ADDING_CONTACT,
    CONTACTS_SET_CONTACTS, CONTACTS_SET_NEW_CONTACT, CONTACTS_UPDATE_CONTACT, CONTACT_DEACTIVATE_CHANGE
} from '../types/types'
import {appLoadingShow, appLoadingHidden, appAddAlertMessage} from './appActions'
import {authLogout} from './authActions'
import {getContacts, createContactApi, deleteContactApi, updateContactApi, favoriteContactApi} from '../api/contactApi'
import {deleteLocalStorage} from '../services/authStorageServices'

export const contactsChangeSearch = (payload) => ({type: CONTACTS_CHANGE_SEARCH, payload})
export const contactsSetActiveContact = (id) => ({type: CONTACTS_SET_ACTIVE_CONTACT, payload: id})

export const contactsCleanActiveContact = () => ({type: CONTACTS_CLEAN_ACTIVE_CONTACT})
export const contactsSetNewContact = (contact) => ({type: CONTACTS_SET_NEW_CONTACT, payload: contact})

export const contactDeactivateChange = () => ({type: CONTACT_DEACTIVATE_CHANGE})
export const contactCopyField = dataField => (appAddAlertMessage('info',
    dataField.value ? `${dataField.title} copied to clipboard` : `${dataField.title} field is not filled`))

export const contactsCreateNewContact = (token, userData) => {
    return async dispatch => {
        await dispatch(appLoadingShow())
        await createContactApi(userData, token)
            .then(res => {
                dispatch(appAddAlertMessage('info', res.data.message))
                dispatch(contactsSetNewContact(res.data.contact))
                dispatch(contactsCleanActiveContact())
            })
            .catch(err => console.log(err))
        await dispatch(appLoadingHidden())
    }
}

export const contactsAddingContact = () => {
    return async dispatch => {
        dispatch({type: CONTACTS_ADDING_CONTACT, payload: {name: '', phone: '', email: '', instagram: ''}})
    }
}

export const contactsDeleteContact = (id, token, activeContact) => {
    return async dispatch => {
        await dispatch(appLoadingShow())
        await deleteContactApi(id, token)
            .then(res => {
                dispatch({type: CONTACTS_DELETE_CONTACT, payload: id})
                dispatch(appAddAlertMessage('info', res.data.message))
            })
        if (id === activeContact.data._id) dispatch(contactsCleanActiveContact())
        dispatch(appLoadingHidden())
    }
}

export const contactActivateChange = (id) => {
    return async dispatch => {
        await dispatch(contactsSetActiveContact(id))
        dispatch({type: CONTACT_ACTIVATE_CHANGE})
    }
}
export const contactInputChange = (event) => {
    return dispatch => {
        dispatch({type: CONTACT_INPUT_CHANGE, payload: {name: event.target.id.toLowerCase(), value: event.target.value}})
    }
}

export const contactsSetContacts = (token) => {
    return async dispatch => {
        await dispatch(appLoadingShow())
        await getContacts(token)
            .then(res => dispatch({type: CONTACTS_SET_CONTACTS, payload: res.data.contacts}))
            .catch(err => {
                if (err.response.status === 401) {
                    deleteLocalStorage()
                    dispatch(authLogout())
                }
            })
        await dispatch(appLoadingHidden())
    }
}

export const contactsUpdateContact = (contact, token) => {
    return async dispatch => {
        await dispatch(appLoadingShow())
        await updateContactApi(contact, token)
            .then(res => {
                dispatch(appAddAlertMessage('info', res.data.message))
                dispatch({type: CONTACTS_UPDATE_CONTACT, payload: contact})
            })
            .catch(err => console.log(err))
        await dispatch(contactDeactivateChange())
        await dispatch(appLoadingHidden())
    }
}

export const contactToggleFavorite = (contact, token) => {
    return async dispatch => {
        await dispatch(appLoadingShow())
        await favoriteContactApi({contact: {...contact, isFavorite: !contact.isFavorite}}, token)
            .then(res => {
                dispatch({type: CONTACT_TOGGLE_FAVORITE, payload: contact._id})
            })
            .catch(err => console.log(err))
        await dispatch(appLoadingHidden())
    }
}