import { createAppContainer } from 'react-navigation'
import HomeScreen from '../screens/Home'
import HelpScreen from '../screens/Help'
import AboutScreen from '../screens/AboutUs'
import TermsScreen from '../screens/Terms'
import HumburgerMenu from './HumburgerMenu'
import { createBottomTabNavigator } from 'react-navigation-tabs'

const BottomMenu = createBottomTabNavigator({
    "اخر الاخبار": { screen: HomeScreen },
    "تعليقاتي": { screen: HelpScreen },
    "محفوظاتي": { screen: AboutScreen },
    "صفحتي": { screen: TermsScreen },

}, {
    tabBarOptions: {
        activeTintColor: 'white',
        labelStyle: {
            fontSize: 15,
            paddingBottom: 10
        },
        style: {
            backgroundColor: 'blue',
            marginBottom: 3,
        },
    }
})
export default createAppContainer(BottomMenu);