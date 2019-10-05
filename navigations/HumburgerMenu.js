import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import HomeScreen from '../screens/Home';
import HelpScreen from '../screens/Help';
import TermsScreen from '../screens/Terms';
import AboutScreen from '../screens/AboutUs';
import BottomMenu from './BottomMenu';

const HumburgerMenu = createDrawerNavigator({
    "الرئيسية": {
        screen: BottomMenu,
    },
    "من نحن": {
        screen: AboutScreen
    },
    "مساعدتي": {
        screen: HelpScreen
    },
    "الشروط والاحكام": {
        screen: TermsScreen
    }
}, {
    initialRouteName: 'الرئيسية',
    drawerPosition: 'right',
    drawerBackgroundColor: 'white',
    activeTintColor: '#e91e63',
    drawerWidth: '60%',
    

})

export default createAppContainer(HumburgerMenu);
