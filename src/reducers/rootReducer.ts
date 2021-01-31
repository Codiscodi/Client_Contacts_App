import {combineReducers} from 'redux'
import {templateReducer} from './templateReducer'
import {authReducer} from './authReducer'
import {appReducer} from './appReducer'
import {contactsReducer} from './contactsReducer'

type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>

export const rootReducer = combineReducers({
    template: templateReducer,
    app: appReducer,
    auth: authReducer,
    contacts: contactsReducer
})

