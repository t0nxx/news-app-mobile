import React from 'react';
import { StyleSheet } from 'react-native';
import { Header, Left, Body, Title, Right, Button, Icon, Tabs, Tab } from 'native-base';
import { THEME_BACKGROUND_COLOR } from '../Colors';


const HeaderComponent = ({ params, title, navigation }) => (
    <Header style={{ backgroundColor: THEME_BACKGROUND_COLOR }} hasTabs>
        <Left style={{ flex: 1 }}>
            <Button transparent  onPress={() => navigation.goBack()}>
                <Icon name={navigation.state.routeName == 'Home' ? 'search' : 'arrow-back'} />
            </Button>
        </Left>
        <Body style={{ flex: 1 }}>
            <Title>{title}</Title>
        </Body>
        <Right style={{ flex: 1 }}>
            <Button transparent onPress={() => navigation.openDrawer()}>
                <Icon name='menu' />
            </Button>
        </Right>
    </Header>
);

export default HeaderComponent;
