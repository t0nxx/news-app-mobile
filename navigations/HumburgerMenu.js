import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import HomeScreen from '../screens/Home';
import HelpScreen from '../screens/Help';
import TermsScreen from '../screens/Terms';
import AboutScreen from '../screens/AboutUs';
import BottomNavigator from './BottomMenu';
import { THEME_BACKGROUND_COLOR, THEME_FONT_COLOR } from '../Colors';
import BookmarksScreen from '../screens/Bookmarks';
import ProfileScreen from '../screens/Profile';
import MyCommentsScreen from '../screens/MyComments';


const HumburgerMenu = createDrawerNavigator({
    "Home": {
        screen: HomeScreen,
    },
    "About": {
        screen: AboutScreen
    },
    "Help": {
        screen: HelpScreen
    },
    "Terms": {
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
    }
}, {
    initialRouteName: 'Home',
    drawerPosition: 'right',
    drawerBackgroundColor: THEME_BACKGROUND_COLOR,
    drawerWidth: '80%',
    activeTintColor: '#e91e63',
    contentOptions: {
        activeTintColor: 'white',
        inactiveTintColor: 'black',
        itemsContainerStyle: {
            marginVertical: 50,
        },
        iconContainerStyle: {
            opacity: .5
        }
    }
})

export default createAppContainer(HumburgerMenu);
