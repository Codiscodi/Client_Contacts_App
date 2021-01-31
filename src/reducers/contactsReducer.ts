import {
    CONTACT_TOGGLE_FAVORITE, CONTACTS_CHANGE_SEARCH, CONTACTS_SET_ACTIVE_CONTACT, CONTACT_ACTIVATE_CHANGE,
    CONTACT_INPUT_CHANGE, CONTACTS_DELETE_CONTACT, CONTACTS_CLEAN_ACTIVE_CONTACT, CONTACTS_ADDING_CONTACT,
    CONTACTS_SET_CONTACTS, CONTACTS_SET_NEW_CONTACT, CONTACTS_UPDATE_CONTACT, CONTACT_DEACTIVATE_CHANGE
} from '../types/types'

type ContactType = {_id: string, name: string, phone: string, email: string, instagram: string, isFavorite: boolean}

const initialState = {
    search: '',
    activeContact: {
        data: {},
        isChange: false,
        isNew: false
    },
    contacts: [] as Array<ContactType>
}

export type initialStateType = typeof initialState

export const contactsReducer = (state = initialState, action:any):initialStateType => {
    switch (action.type) {
        case CONTACTS_SET_NEW_CONTACT:
            return {...state, contacts: [...state.contacts, action.payload]}
        case CONTACTS_SET_CONTACTS:
            return {...state, contacts: action.payload}
        case CONTACTS_ADDING_CONTACT:
            return {...state, activeContact: {...state.activeContact, data: action.payload, isChange: true, isNew: true}}
        case CONTACTS_SET_ACTIVE_CONTACT:
            return {...state,
                activeContact: {
                    ...state.activeContact,
                    data: state.contacts.filter(i => i._id === action.payload)[0],
                    isChange: false, isNew: false
                }
            }
        case CONTACTS_UPDATE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.map(i => {
                    if (i._id === action.payload._id) {
                        return action.payload
                    }
                    return i
                })
            }
        case CONTACTS_CLEAN_ACTIVE_CONTACT:
            return {...state, activeContact: {...state.activeContact, data: {}, isChange: false, isNew: false}}
        case CONTACTS_DELETE_CONTACT:
            return {...state, contacts: [...state.contacts].filter(i => i._id !== action.payload)}
        case CONTACT_INPUT_CHANGE:
            return {...state,
                activeContact: {
                    ...state.activeContact,
                    data: {...state.activeContact.data, [action.payload.name]: action.payload.value}
                }
            }
        case CONTACT_ACTIVATE_CHANGE:
            return {...state, activeContact: {...state.activeContact, isChange: true}}
        case CONTACT_DEACTIVATE_CHANGE:
            return {...state, activeContact: {...state.activeContact, isChange: false}}
        case CONTACT_TOGGLE_FAVORITE:
            return {
                ...state,
                contacts: state.contacts.map(i => {
                    if (i._id === action.payload) {
                        return {...i, isFavorite: !i.isFavorite}
                    }
                    return i
                })
            }
        case CONTACTS_CHANGE_SEARCH:
            return {...state, search: action.payload}
        default:
            return state
    }
}