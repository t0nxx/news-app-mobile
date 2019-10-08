import React from 'react';
import { Text, View } from 'react-native';
import { Footer, FooterTab, Button, Icon } from 'native-base';
import { THEME_BACKGROUND_COLOR, THEME_FONT_COLOR } from '../Colors';

const FooterComponent = ({ navigation, navigate }) => (
    <Footer>
        <FooterTab style={{ backgroundColor: THEME_BACKGROUND_COLOR }}>
            <Button vertical onPress={() => { navigation.navigate('Bookmarks') }}>
                <Icon name="apps" />
                <Text>Bookmarks</Text>
            </Button>
            <Button vertical onPress={() => { navigation.navigate('MyCommments') }}>
                <Icon active name="navigate" />
                <Text>My Comments</Text>
            </Button>
            <Button vertical onPress={() => { navigation.navigate('Profile') }}>
                <Icon name="person" />
                <Text>My Profile</Text>
            </Button>
        </FooterTab>
    </Footer>
);

export default FooterComponent;
