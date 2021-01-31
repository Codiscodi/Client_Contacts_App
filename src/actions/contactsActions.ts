import {
    CONTACTS_CHANGE_SEARCH, CONTACT_TOGGLE_FAVORITE, CONTACTS_SET_ACTIVE_CONTACT, CONTACT_ACTIVATE_CHANGE,
    CONTACT_INPUT_CHANGE, CONTACTS_CLEAN_ACTIVE_CONTACT, CONTACTS_DELETE_CONTACT, CONTACTS_ADDING_CONTACT,
    CONTACTS_SET_CONTACTS, CONTACTS_SET_NEW_CONTACT, CONTACTS_UPDATE_CONTACT, CONTACT_DEACTIVATE_CHANGE
} from '../types/types'
import {appLoadingShow, appLoadingHidden, appAddAlertMessage} from './appActions'
import {authLogout} from './authActions'
import {getContacts, createContactApi, deleteContactApi, updateContactApi, favoriteContactApi} from '../api/contactApi'
import {deleteLocalStorage} from '../services/authStorageServices'

type contactsChangeSearchType = {type: typeof CONTACTS_CHANGE_SEARCH, payload: string}
export const contactsChangeSearch = (payload: string):contactsChangeSearchType => ({type: CONTACTS_CHANGE_SEARCH, payload})

type contactsSetActiveContactType = {type: typeof CONTACTS_SET_ACTIVE_CONTACT, payload: string}
export const contactsSetActiveContact = (id:string):contactsSetActiveContactType => ({type: CONTACTS_SET_ACTIVE_CONTACT, payload: id})

type contactsCleanActiveContactType = {type: typeof CONTACTS_CLEAN_ACTIVE_CONTACT}
export const contactsCleanActiveContact = ():contactsCleanActiveContactType  => ({type: CONTACTS_CLEAN_ACTIVE_CONTACT})

type contactType = {_id: string, name: string, phone: string, email: string, instagram: string, isFavorite: boolean}
type contactsSetNewContactType = {type: typeof CONTACTS_SET_NEW_CONTACT, payload: contactType}
export const contactsSetNewContact = (contact: contactType):contactsSetNewContactType => ({type: CONTACTS_SET_NEW_CONTACT, payload: contact})

type contactDeactivateChangeType = {type: typeof CONTACT_DEACTIVATE_CHANGE}
export const contactDeactivateChange = ():contactDeactivateChangeType => ({type: CONTACT_DEACTIVATE_CHANGE})

type dataFieldType = {title: string, value: string}
export const contactCopyField = (dataField: dataFieldType) => (appAddAlertMessage('info',
    dataField.value ? `${dataField.title} copied to clipboard` : `${dataField.title} field is not filled`))

type userDataType = {name: string, phone: string, email: string, instagram: string }
export const contactsCreateNewContact = (token: string, userData: userDataType) => {
    return async (dispatch:any) => {
        await dispatch(appLoadingShow())
        await createContactApi(userData, token)
            .then(res => {
                dispatch(appAddAlertMessage('info', res.data.message))
                dispatch(contactsSetNewContact(res.data.contact))
                dispatch(contactsCleanActiveContact())
            })
            .catch(err => dispatch(appAddAlertMessage('error', err.response.data.message)))
        await dispatch(appLoadingHidden())
    }
}

export const contactsAddingContact = () => {
    return async (dispatch:any) => {
        dispatch({type: CONTACTS_ADDING_CONTACT, payload: {name: '', phone: '', email: '', instagram: ''}})
    }
}

export const contactsDeleteContact = (id: string, token: string, activeContact:any) => {
    return async (dispatch: any) => {
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

export const contactActivateChange = (id: string) => {
    return async (dispatch:any) => {
        await dispatch(contactsSetActiveContact(id))
        dispatch({type: CONTACT_ACTIVATE_CHANGE})
    }
}
export const contactInputChange = (event:any) => {
    return (dispatch:any) => {
        dispatch({type: CONTACT_INPUT_CHANGE, payload: {name: event.target.id.toLowerCase(), value: event.target.value}})
    }
}

export const contactsSetContacts = (token: string) => {
    return async (dispatch:any) => {
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

export const contactsUpdateContact = (contact: any, token:string) => {
    return async (dispatch:any) => {
        await dispatch(appLoadingShow())
        await updateContactApi(contact, token)
            .then(res => {
                dispatch(appAddAlertMessage('info', res.data.message))
                dispatch({type: CONTACTS_UPDATE_CONTACT, payload: contact})
                dispatch(contactDeactivateChange())
            })
            .catch(err => dispatch(appAddAlertMessage('error', err.response.data.message)))

        await dispatch(appLoadingHidden())
    }
}

export const contactToggleFavorite = (contact:any, token: string) => {
    return async (dispatch: any) => {
        await dispatch(appLoadingShow())
        await favoriteContactApi({contact: {...contact, isFavorite: !contact.isFavorite}}, token)
            .then(() => {
                dispatch({type: CONTACT_TOGGLE_FAVORITE, payload: contact._id})
            })
            .catch(err => console.log(err))
        await dispatch(appLoadingHidden())
    }
}