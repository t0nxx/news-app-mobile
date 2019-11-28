import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, AsyncStorage } from 'react-native';
import { http } from '../services/httpService'
import AboutScreen from './AboutUs';

export const LoginScreen = () => {
    const [isLoading, setIsLoading] = useState(true);

    const login = async () => {
        const { data } = await http.post('/auth/login', {
            "email": "a@a.com",
            "password": "123456"
        });
        await AsyncStorage.setItem('token', data.token)
    }
    useEffect(() => {
        login();
    }, []);
    return (
        <Text>Login page</Text>
    )

}

export const LogOutScreen = ({ navigation }) => {


    const logout = async () => {
        await AsyncStorage.removeItem('token')
    }
    useEffect(() => {
        logout()
    }, []);
    AsyncStorage.getItem('token').then(data => {
        console.log(data)
    })
    return (
        <AboutScreen navigation={navigation} />
    )

}

// export default LoginScreen;