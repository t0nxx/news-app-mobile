import React, { useContext } from 'react';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator, DrawerNavigatorItems } from 'react-navigation-drawer';
import { Image, StyleSheet, SafeAreaView, TouchableOpacity, AsyncStorage } from 'react-native'
import { Icon, View, Button, Text } from 'native-base';
import HomeScreen from '../screens/Home';
import HelpScreen from '../screens/Help';
import TermsScreen from '../screens/Terms';
import AboutScreen from '../screens/AboutUs';
import { THEME_BACKGROUND_COLOR, THEME_FONT_COLOR } from '../Colors';
import BookmarksScreen from '../screens/Bookmarks';
import ProfileScreen from '../screens/Profile';
import MyCommentsScreen from '../screens/MyComments';
import SinglePostScreen from '../screens/SinglePost';
import { LoginScreen, LogOutScreen } from '../screens/LoginScreen';
import MySubscribeScreen from '../screens/MySubscribe';
import SearchScreen from '../screens/SearchScreen';
import { checkCurrentUser } from '../services/httpService';
import { AuthContext } from '../services/auth';
import SignUpScreen from '../screens/SignUp';
import ForgetPasswordScreen from '../screens/ForgetPassword';
import ForgetPasswordCodeScreen from '../screens/ForgetPasswordCode';
import ForgetPasswordChangePassScreen from '../screens/ForgetPasswordChangePass';
import CommentsScreen from '../screens/Comments';
import CommentsReplyScreen from '../screens/ReplyOnComment';


const HumburgerMenu = createDrawerNavigator({
    "Home": {
        navigationOptions: {
            drawerLabel: 'الرئيسية',
            drawerIcon: () => (
                <Icon type="FontAwesome" name="home" style={{ fontSize: 30, color: 'white' }} />
            ),
        },
        screen: HomeScreen,
    },
    "MySubscribe": {
        navigationOptions: {
            drawerLabel: 'متابعاتي',
            drawerIcon: () => (
                <Icon name="archive" style={{ fontSize: 30, color: 'white' }} />
            ),
        },
        screen: MySubscribeScreen
    },
    "About": {
        navigationOptions: {
            drawerLabel: 'عن البرنامج',
            drawerIcon: () => (
                <Icon name="eye" style={{ fontSize: 30, color: 'white' }} />
            ),
        },
        screen: AboutScreen
    },
    "Help": {
        navigationOptions: {
            drawerLabel: 'المساعدة',
            drawerIcon: () => (
                <Icon name="hand" style={{ fontSize: 30, color: 'white' }} />
            ),
        },
        screen: HelpScreen
    },
    "Terms": {
        navigationOptions: {
            drawerLabel: 'شروط الاستخدام',
            drawerIcon: () => (
                <Icon name="clipboard" style={{ fontSize: 30, color: '#fff' }} />
            ),
        },
        screen: TermsScreen
    },
    // this is hidden from drawer in navigation options 
    "Bookmarks": {
        screen: BookmarksScreen
    },
    "Profile": {
        screen: ProfileScreen
    },
    "MyCommments": {
        screen: MyCommentsScreen
    },
    'SinglePost': {
        screen: SinglePostScreen
    },
    'Comments': {
        navigationOptions: {
            drawerLabel: () => null,
            drawerIcon: () => null,
        },
        screen: CommentsScreen
    },
    'Replies': {
        navigationOptions: {
            drawerLabel: () => null,
            drawerIcon: () => null,
        },
        screen: CommentsReplyScreen
    },
    'Login': {
        navigationOptions: {
            drawerLabel: () => null,
            drawerIcon: () => null,
        },
        screen: LoginScreen
    },
    'Logout': {
        navigationOptions: {
            drawerLabel: () => null,
            drawerIcon: () => null,
        },
        screen: LogOutScreen
    },
    'SignUp': {
        navigationOptions: {
            drawerLabel: () => null,
            drawerIcon: () => null,
        },
        screen: SignUpScreen
    },
    'ForgetPassword': {
        navigationOptions: {
            drawerLabel: () => null,
            drawerIcon: () => null,
        },
        screen: ForgetPasswordScreen
    },
    'ResetCode': {
        navigationOptions: {
            drawerLabel: () => null,
            drawerIcon: () => null,
        },
        screen: ForgetPasswordCodeScreen
    },
    'ChangePasswordAfterReset': {
        navigationOptions: {
            drawerLabel: () => null,
            drawerIcon: () => null,
        },
        screen: ForgetPasswordChangePassScreen
    },
    'Search': {
        screen: SearchScreen
    },


}, {
    initialRouteName: 'Home',
    drawerPosition: 'right',
    drawerBackgroundColor: '#B047E5',
    drawerWidth: '80%',
    activeTintColor: '#e91e63',
    contentOptions: {
        activeTintColor: 'white',
        inactiveTintColor: 'white',
        itemsContainerStyle: {
            marginVertical: 50,
        },
        iconContainerStyle: {
            opacity: .5
        },
        itemStyle: {
            // for rtl lable
            flexDirection: 'row-reverse',
        },
        labelStyle: {
            fontFamily: 'Cairo',
            fontWeight: 'normal',
            color: 'white',
            fontSize: 15
        },
    },
    // kill every component after leave
    unmountInactiveRoutes: true,
    contentComponent: (props) => {
        const [isLogin, setIsLogin] = useContext(AuthContext);
        return (
            <View style={{ flex: 1 }}>
                <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
                    <DrawerNavigatorItems {...props} />
                    {
                        isLogin ?
                            <TouchableOpacity style={{ backgroundColor: 'transparent', flexDirection: 'row-reverse' }} onPress={() => props.navigation.navigate('Logout')}>
                                <Image source={require('../assets/images/test/logout.png')} style={{ marginRight: 15 }} />
                                <Text style={{ color: 'white', fontFamily: 'Cairo', textAlign: 'right', marginRight: 10 }} > تسجيل الخروج</Text>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity style={{ backgroundColor: 'transparent', flexDirection: 'row-reverse' }} onPress={() => props.navigation.navigate('Login')} >
                                <Image source={require('../assets/images/test/logout.png')} style={{ marginRight: 15 }} />
                                <Text style={{ color: 'white', fontFamily: 'Cairo', textAlign: 'right', marginRight: 10 }} > تسجيل الدخول  </Text>
                            </TouchableOpacity>
                    }
                </SafeAreaView>
            </View>
        )

    },

})
const styles = StyleSheet.create({
    icon: {
        width: 24,
        height: 24,
        backgroundColor: 'transparent'
    },
});

export default createAppContainer(HumburgerMenu);
