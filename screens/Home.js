import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Container, Content, Footer, FooterTab, Text } from 'native-base'
import { LinearGradient } from 'expo-linear-gradient';
import HeaderComponent from '../components/Header';
import FooterComponent from '../components/Footer';
import TabsComponent from '../components/Tabs';
import { checkCurrentUser } from '../services/auth'


const HomeScreen = ({ navigation }) => (
    <Container>
        <HeaderComponent title="حكايا" navigation={navigation} />
        <TabsComponent navigation={navigation} />
        {/* till make authentication i'll make the reverse here */}
        {checkCurrentUser() ? null : <FooterComponent navigation={navigation} />}
    </Container>
);

export default HomeScreen;
