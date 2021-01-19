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

export const templateReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state
    }
}