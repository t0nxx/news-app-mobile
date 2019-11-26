import { http } from './httpService';

export const getAboutUs = async () => {
    const { data } = await http.get('/aboutUs');
    return data
}

export const getTerms = async () => {
    const { data } = await http.get('/terms');
    return data
}