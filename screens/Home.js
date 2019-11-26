import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Container, Content, Footer, FooterTab, Text } from 'native-base'
import HeaderComponent from '../components/Header';
import FooterComponent from '../components/Footer';
import TabsComponent from '../components/Tabs';


const HomeScreen = ({ navigation }) => (
    <Container>
        <HeaderComponent title="حكايا" navigation={navigation} />
        <TabsComponent navigation={navigation} />
        <FooterComponent navigation={navigation} />
    </Container>
);


export default HomeScreen;
