import React from 'react';
import { Text, View, ImageBackground, StyleSheet, Image } from 'react-native';
import { Footer, FooterTab, Button, Icon } from 'native-base';
import { THEME_BACKGROUND_COLOR, THEME_FONT_COLOR, FOOTER_BACKGROUND_COLOR } from '../Colors';

const FooterComponent = ({ navigation }) => (
    <ImageBackground source={require('../assets/gradient.png')} style={{ height: 65, width: null }} >
        <FooterTab style={{ backgroundColor: 'transparent', height: 65 }}>
            <View style={{ flex: 1 }}>
                <Button vertical onPress={() => { navigation.navigate('Bookmarks') }}>
                    <Image source={require('../assets/images/test/user.png')}></Image>
                    <Text style={styles.text}> صفحتي </Text>
                </Button>
            </View>
            <View style={{ flex: 1 }}>
                <Button vertical onPress={() => { navigation.navigate('Bookmarks') }}>
                    <Image source={require('../assets/images/test/bookmark.png')}></Image>
                    <Text style={styles.text}> محفوظاتي</Text>
                </Button>
            </View>
            <View style={{ flex: 1 }}>
                <Button vertical onPress={() => { navigation.navigate('MyCommments') }}>
                    <Image source={require('../assets/images/test/notification.png')}></Image>
                    <Text style={styles.text}> تعليقاتي</Text>
                </Button>
            </View>
            <View style={{ flex: 1 }}>
                <Button vertical onPress={() => { navigation.navigate('Home') }}>
                    <Image source={require('../assets/images/test/language.png')}></Image>
                    <Text style={styles.text}>الاخبار </Text>
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
        paddingBottom: 3,
    }
})

export default FooterComponent;
