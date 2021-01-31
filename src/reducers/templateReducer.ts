const initialState = {
    header: {
        logoTitle: 'Contacts App',
        logoutTitle: 'Sign Out',
    },
    authPage: {
        title: 'Contacts App',
        description: 'Welcome, sign in to continue.'
    }
}

export type initialStateType = typeof initialState

export const templateReducer = (state = initialState, action:any):initialStateType => {
    switch (action.type) {
        default:
            return state
    }
}