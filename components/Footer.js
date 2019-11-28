import React from 'react';
import { Text, View, ImageBackground, StyleSheet } from 'react-native';
import { Footer, FooterTab, Button, Icon } from 'native-base';
import { THEME_BACKGROUND_COLOR, THEME_FONT_COLOR, FOOTER_BACKGROUND_COLOR } from '../Colors';

const FooterComponent = ({ navigation }) => (
    <ImageBackground source={require('../assets/gradient.png')} style={{ height: 50, width: null }} >
        <FooterTab style={{ backgroundColor: 'transparent' }}>
            <View style={{ flex: 1 }}>
                <Button vertical onPress={() => { navigation.navigate('Bookmarks') }}>
                    <Icon name="apps" style={{ fontSize: 15, paddingTop: 5, }} />
                    <Text style={styles.text}> محفوظاتي</Text>
                </Button>
            </View>
            <View style={{ flex: 1 }}>
                <Button vertical onPress={() => { navigation.navigate('MyCommments') }}>
                    <Icon active name="navigate" style={{ fontSize: 15, paddingTop: 5, }} />
                    <Text style={styles.text}> تعليقاتي</Text>
                </Button>
            </View>
            <View style={{ flex: 1 }}>
                <Button vertical onPress={() => { navigation.navigate('Profile') }}>
                    <Icon name="person" style={{ fontSize: 15, paddingTop: 5, }} />
                    <Text style={styles.text}>صفحتي</Text>
                </Button>
            </View>
        </FooterTab>
    </ImageBackground>
);

const styles = StyleSheet.create({
    text: {
        fontFamily: 'Cairo',
        color: 'white',
        fontWeight: '400',
        paddingBottom: 8,
    }
})

export default FooterComponent;
