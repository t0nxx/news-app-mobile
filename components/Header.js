import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Header, Left, Body, Title, Right, Button, Icon, Tabs, Tab } from 'native-base';
import { THEME_BACKGROUND_COLOR } from '../Colors';


const HeaderComponent = ({ params, title, navigation }) => (
    <Header style={{ backgroundColor: THEME_BACKGROUND_COLOR }} hasTabs>
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
        <Right style={{ flex: 1 }}>
            <Body style={{ flex: 1 }}>
                <Text style={{ fontWeight: 'bold', color: 'white', fontFamily: 'Cairo' }}>{title}</Text>
            </Body>
        </Right>
        <Right style={{ flex: 1 }}>
            <Button transparent onPress={() => navigation.openDrawer()}>
                <Icon name='menu' />
            </Button>
        </Right>
    </Header >
);

export default HeaderComponent;
