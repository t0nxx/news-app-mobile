import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, AsyncStorage } from 'react-native';
import { http } from '../services/httpService'
import HomeScreen from './Home';
import HeaderComponent from '../components/Header';
import TabsComponent from '../components/Tabs';
import FooterComponent from '../components/Footer';
import { Container } from 'native-base';

export const LoginScreen = ({ navigation }) => {
    const [logErr, setLogErr] = useState(true);

    const login = async () => {
        const { data } = await http.post('/auth/login', {
            "email": "a@a.com",
            "password": "123456"
        });
        await AsyncStorage.setItem('token', data.token);
        setLogErr(false);
    }
    useEffect(() => {
        login();
    }, []);
    return (
        logErr != true ? <Container>
            <HeaderComponent title="حكايا" navigation={navigation} />
            <TabsComponent navigation={navigation} />
            <FooterComponent navigation={navigation} />
        </Container> : null
    )


}

export const LogOutScreen = ({ navigation }) => {


    const logout = async () => {
        await AsyncStorage.removeItem('token')
    }
    logout();
    AsyncStorage.getItem('token').then(data => {
        console.log(data)
    })
    return (
        navigation.navigate('Home')
    )

}

// export default LoginScreen;