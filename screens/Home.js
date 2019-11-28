import React, { useEffect, useState } from 'react';
import { StyleSheet, AsyncStorage } from 'react-native';
import { Button, Container, Content, Footer, FooterTab, Text } from 'native-base'
import { LinearGradient } from 'expo-linear-gradient';
import HeaderComponent from '../components/Header';
import FooterComponent from '../components/Footer';
import TabsComponent from '../components/Tabs';
import { checkCurrentUser } from '../services/httpService'


const HomeScreen = ({ navigation }) => {
    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        AsyncStorage.getItem('token').then(data => {
            if (data != null) {
                setIsLogin(true);
            }
        })
    }, [isLogin]);
    return (
        <Container>
            <HeaderComponent title="حكايا" navigation={navigation} />
            <TabsComponent navigation={navigation} />
            {/* till make authentication i'll make the reverse here */}
            {isLogin ? <FooterComponent navigation={navigation} /> : null}
        </Container>

    );
}

export default HomeScreen;
