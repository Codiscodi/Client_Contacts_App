import {combineReducers} from 'redux'
import {templateReducer} from './templateReducer'
import {authReducer} from './authReducer'
import {appReducer} from './appReducer'
import {contactsReducer} from './contactsReducer'

export const rootReducer = combineReducers({
    template: templateReducer,
    app: appReducer,
    auth: authReducer,
    contacts: contactsReducer
})