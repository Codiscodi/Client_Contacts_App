const localStorageName = 'userData'

const getLocalStorage = () => localStorage.getItem(localStorageName)

export const setLocalStorage = (userData) => localStorage.setItem(localStorageName, JSON.stringify(userData))

export const deleteLocalStorage = () => localStorage.removeItem(localStorageName)

export const getDataLocalStorage = () => {
    const userData = JSON.parse(getLocalStorage())
    if (userData) {
        if (userData.id && userData.login && userData.token) {
            return userData
        }
    }
    return false
}