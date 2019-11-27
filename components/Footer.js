import React from 'react';
import { Text, View, ImageBackground, StyleSheet } from 'react-native';
import { Footer, FooterTab, Button, Icon } from 'native-base';
import { THEME_BACKGROUND_COLOR, THEME_FONT_COLOR, FOOTER_BACKGROUND_COLOR } from '../Colors';

const FooterComponent = ({ navigation, navigate }) => (
    <ImageBackground source={require('../assets/gradient.png')} style={{ height: 50, width: null }} >
        <FooterTab style={{ backgroundColor: 'transparent' }}>
            <Button vertical onPress={() => { navigation.navigate('Bookmarks') }}>
                <Icon name="apps" />
                <Text style={styles.text}> محفوظاتي</Text>
            </Button>
            <Button vertical onPress={() => { navigation.navigate('MyCommments') }}>
                <Icon active name="navigate" />
                <Text style={styles.text}> تعليقاتي</Text>
            </Button>
            <Button vertical onPress={() => { navigation.navigate('Profile') }}>
                <Icon name="person" />
                <Text style={styles.text}>صفحتي</Text>
            </Button>
        </FooterTab>
    </ImageBackground>
);

const styles = StyleSheet.create({
    text: {
        fontFamily: 'Cairo',
        color: 'white',
        fontWeight: '400'
    }
})

export default FooterComponent;
