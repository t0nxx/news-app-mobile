import React from 'react';
import { StyleSheet, Text, ImageBackground, Image } from 'react-native';
import { Header, Left, Body, Title, Right, Button, Icon, Tabs, Tab } from 'native-base';
import { THEME_BACKGROUND_COLOR } from '../Colors';


const HeaderComponent = ({ params, title, navigation }) => (
    <ImageBackground source={require('../assets/gradient.png')} style={{ height: 50, width: null }} >
        <Header style={{ backgroundColor: 'transparent' }} hasTabs>
            <Left style={{ flex: 1 }}>
                <Button transparent onPress={() => {
                    if (navigation.state.routeName == 'Home') {
                        // got to search button
                        return navigation.navigate('SinglePost', { id: 90 })
                    } else {
                        return navigation.goBack()
                    }
                }}>
                    <Icon name={navigation.state.routeName == 'Home' ? 'search' : 'arrow-back'} />
                </Button>
            </Left>
            {/* <Right style={{ flex: 1 }}>
                <Body style={{ flex: 1 }}>
                    <Text style={{ fontWeight: 'bold', color: 'white', fontFamily: 'Cairo' }}>{title}</Text>
                </Body>
            </Right> */}
            <Body style={{ flex: 1 }}>
                <Button transparent onPress={() => navigation.openDrawer()}>
                    <Image source={require('../assets/header-img.png')} />
                </Button>

            </Body>

            <Right style={{ flex: 1 }}>
                <Button transparent onPress={() => navigation.openDrawer()}>
                    <Icon name='menu' />
                </Button>
            </Right>
        </Header >
    </ImageBackground>
);

export default HeaderComponent;
