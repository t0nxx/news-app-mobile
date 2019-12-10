import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, AsyncStorage } from 'react-native';
import { Button, Container, Content, Footer, FooterTab, Text } from 'native-base'
import { LinearGradient } from 'expo-linear-gradient';
import HeaderComponent from '../components/Header';
import FooterComponent from '../components/Footer';
import TabsComponent from '../components/Tabs';
import { checkCurrentUser } from '../services/httpService'
import { AuthContext } from '../services/auth';
import { Notifications } from 'expo';


const HomeScreen = ({ navigation }) => {
    const [isLogin, setIsLogin] = useContext(AuthContext);
    console.log(isLogin);
    useEffect(() => {
        Notifications.addListener((notificaton) => {

            if (notificaton.origin == 'selected') {
                console.log(notificaton);
                const { data } = notificaton;
                navigation.navigate('SinglePost', { id: data.postId });
            }
            // navigation.navigate('Terms')
        })
    }, [])
    return (
        <Container>
            <HeaderComponent title="حكايا" navigation={navigation} />
            <TabsComponent navigation={navigation} />
            {isLogin ? <FooterComponent navigation={navigation} /> : null}
        </Container>

    );
}

export default HomeScreen;
