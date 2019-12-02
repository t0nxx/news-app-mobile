import axois from 'axios';
import { AsyncStorage } from 'react-native';

export const checkCurrentUser = async () => {
    const token = await AsyncStorage.getItem('token');

    if (typeof (token) != 'string' || token == null) {
        return false;
    }
    return true;
}

export const http = axois.create({
    baseURL: 'https://api.hakaya.news/',

})

http.interceptors.request.use(async (config) => {
    if (checkCurrentUser() == true) {
        const jwt = await AsyncStorage.getItem('token');
        let user = await AsyncStorage.getItem('user');
        user = user ? JSON.parse(user) : null;
        config.headers.authorization = jwt;
        if (user != undefined && user != null) {
            config.params.userId = user.id
        }

    }
    return config;
})