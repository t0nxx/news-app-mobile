import { http } from './httpService';

export const getMyData = async () => {
    const { data } = await http.get('/users/me');
    return data.data
}

export const subscribeToCategory = async (body) => {
    const {data} = await http.put('/users/update/me/subscribe',body)
    return data.data
}

export const UnsubscribeToCategory = async (body) => {
    const {data} = await http.put('/users/update/me/unsubscribe',body)
    return data.data
}