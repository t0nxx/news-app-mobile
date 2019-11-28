import axois from 'axios';
import { AsyncStorage } from 'react-native';

export const checkCurrentUser = () => {
    AsyncStorage.getItem('token').then(data => {
        if (data != null) {
            return true;
        } else {
            return false;
        }
    }
    )
}
axois.interceptors.request.use(async (config) => {
    if (checkCurrentUser()) {
        const jwt = await AsyncStorage.getItem('token');
        config.headers = { ...config.headers, 'Authorization': jwt }
    }
    return config;
})

export const http = axois.create({
    baseURL: 'https://api.hakaya.news/',

})