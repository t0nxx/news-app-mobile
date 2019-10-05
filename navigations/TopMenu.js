import { createMaterialTopTabNavigator, createTabNavigator } from 'react-navigation-tabs'
import HomeScreen from '../screens/Home'
import HelpScreen from '../screens/Help'
import AboutScreen from '../screens/AboutUs'
import TermsScreen from '../screens/Terms'


const NewTAb = createTabNavigator({
    'اخر الاخبار': HomeScreen
})
const MyCommentsTab = createTabNavigator({
    'الاكثر قراءة': HelpScreen
})
const MyBookMarksTab = createTabNavigator({
    'الاكثر تعليق': AboutScreen
})