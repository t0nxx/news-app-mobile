import axois from 'axios';
import { AsyncStorage } from 'react-native';

export const checkCurrentUser = async () => {
    const token = await AsyncStorage.getItem('token');

    if (typeof (token) != 'string' || token == null) {
        return false;
    }
    return true;
}

const http = axois.create({
    baseURL: 'https://api.hakaya.news/',

})

http.interceptors.request.use(async (config) => {
    // consider is login 
    /**
     * 
     * 
     * 
     * dont forget it's not working
     */
    // if (checkCurrentUser() == true) {
    const jwt = await AsyncStorage.getItem('token');
    let user = await AsyncStorage.getItem('user');
    user = user ? JSON.parse(user) : null;
    config.headers.authorization = jwt;
    if (user != undefined && user != null) {
        config.params = { ...config.params, userId: user.id }
    }

    // }
    return config;
}, (err) => {
    if (err.response == undefined) {
        return Promise.reject(
            Alert.alert("No internet , do  you want to exit", [
                { text: "OK", onPress: () => console.log('exit from axios') }
            ])
        )
    } else if (err.response.status === 401) {
        // return Promise.reject(
        //     goToLogin("Login", null)
        // );
    } else if (err.response.status === 500) {
        return Promise.reject(
           console.log('errrrrrrrrr' + err.response)
        );
    } else {
        return Promise.reject(
            Alert.alert("errrorrrrrrrrrrrrrr")
        )
    }
})
exports.http = http;