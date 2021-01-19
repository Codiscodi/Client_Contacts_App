import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {AuthPageContainer} from './containers/AuthPageContainer'
import {ContactsPageContainer} from './containers/ContactsPageContainer'

export const useRoutes = (isAuth) => {
    if (isAuth) {
        return (
            <Switch>
                <Route path='/contacts' exact component={ContactsPageContainer}/>
                <Redirect to='/contacts'/>
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path='/' exact component={AuthPageContainer}/>
            <Redirect to='/'/>
        </Switch>
    )
}