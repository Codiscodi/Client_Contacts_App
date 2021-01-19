import {axiosServices} from '../services/axiosServices'

export const getContacts = (token) => axiosServices('get', 'contact', null, token)

export const deleteContactApi = (id, token) => axiosServices('delete', `contact/${id}`, null, token)

export const updateContactApi = (contact, token) => axiosServices('put', 'contact', {contact}, token)

export const favoriteContactApi = (contact, token) => axiosServices('put', 'contact', contact, token)

export const createContactApi = (data, token) => {
    return axiosServices(
        'post', 'contact',
        {name: data.name, phone: data.phone, email: data.email, instagram: data.instagram}, token
    )
}