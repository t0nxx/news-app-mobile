import React from 'react';
import { StyleSheet, Text, ImageBackground, Image } from 'react-native';
import { Header, Left, Body, Title, Right, Button, Icon, Tabs, Tab } from 'native-base';
import { THEME_BACKGROUND_COLOR } from '../Colors';


const HeaderComponent = ({ params, title, navigation }) => (
    <ImageBackground source={require('../assets/gradient.png')} style={{ height: 65, width: null }} >
        <Header style={{ backgroundColor: 'transparent', paddingTop:35 , position : 'absolute'}} hasTabs>
            <Left style={{ flex: 1 }}>
                <Button transparent onPress={() => {
                    if (navigation.state.routeName == 'Home') {
                        // got to search button
                        return navigation.navigate('Search')
                    } else {
                        return navigation.goBack()
                    }
                }}>
                    {navigation.state.routeName == 'Home' ?
                        <Image source={require('../assets/images/test/search.png')} /> :
                        <Icon name={'arrow-back'} />
                    }

                    {/* <Icon name={'arrow-back'} /> */}
                    {/* <Image source={navigation.state.routeName == 'Home' ?
                        require('../assets/images/test/search.png') :
                        require('../assets/images/test/back.png')
                    } /> */}
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
                    <Image source={require('../assets/images/test/menu.png')} />
                </Button>
            </Right>
        </Header >
    </ImageBackground >
);

export default HeaderComponent;
