import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, AsyncStorage, TextInput, TouchableHighlight, View, Image } from 'react-native';
import { http, checkCurrentUser } from '../services/httpService'
import HomeScreen from './Home';
import HeaderComponent from '../components/Header';
import TabsComponent from '../components/Tabs';
import FooterComponent from '../components/Footer';
import { Container, Toast } from 'native-base';


export const LoginScreen = ({ navigation }) => {
    // const [logErr, setLogErr] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const login = async () => {
        try {
            const { data } = await http.post('/auth/login', {
                "email": email,
                "password": password
            });
            console.log(data);
            await AsyncStorage.setItem('token', data.token);
            
            await AsyncStorage.setItem('user', JSON.stringify(data.data));
            Toast.show({
                text: "تم تسجيل الدخول بنجاح ",
                type: "success",
                position: "top",
                duration: 5000
            })
            navigation.navigate('Home');
        } catch (error) {
            console.log(error);
            Toast.show({
                text: "ايميل او باسورد خاطئ",
                type: "danger",
                position: "top",
                duration: 5000
            })
        }



    }
    // useEffect(() => {
    // }, []);
    return (
        <View style={styles.container}>
            <Image style={{ bottom: 30 }} source={require('../assets/images/logo.png')} />
            <View style={styles.inputContainer}>
                <TextInput style={[styles.inputs, { textAlign: 'right' }]}
                    placeholder=" البريد الالكتروني    "
                    keyboardType="email-address"
                    underlineColorAndroid='transparent'
                    onChangeText={(em) => setEmail(em)} />
            </View>
            <View style={styles.inputContainer}>
                <TextInput style={[styles.inputs, { textAlign: 'right' }]}
                    placeholder=" كلمة السر    "
                    textContentType='password'
                    secureTextEntry={true}
                    underlineColorAndroid='transparent'
                    onChangeText={(pass) => setPassword(pass)} />
            </View>

            <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => login()} >
                <Text style={styles.text}>تسجيل الدخول</Text>
            </TouchableHighlight>

            <TouchableHighlight style={[styles.buttonContainer, { backgroundColor: '#742A99' }]} >
                <Text style={styles.text}>انشاء حساب</Text>
            </TouchableHighlight>
            <Text style={{ color: 'white', fontFamily: 'Cairo', paddingTop: 10, fontSize: 12 }}>نسيت كلمة السر ؟</Text>
            <Text
                style={{ color: 'white', fontFamily: 'Cairo', paddingTop: 30, textDecorationLine: 'underline', fontSize: 12 }}
                onPress={() => navigation.navigate('Home')}
            > تخطي تسجيل الدخول </Text>
        </View>
    )


}

// LoginScreen.navigationOptions = ({ navigation }) => {
//     return {
//         drawerLabel: () => checkCurrentUser() ? null : 'تسجيل الدخول '
//     }
// }

export const LogOutScreen = ({ navigation }) => {


    const logout = async () => {
        await AsyncStorage.removeItem('token')
        await AsyncStorage.removeItem('user')
    }
    logout();
    AsyncStorage.getItem('token').then(data => {
        // console.log(data)
    })
    return (
        navigation.navigate('Home')
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#B047E5',
    },
    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        borderBottomWidth: 1,
        width: 280,
        height: 45,
        marginBottom: 10,
        flexDirection: 'row',
    },
    inputs: {
        height: 45,
        marginLeft: 16,
        borderBottomColor: '#FFFFFF',
        flex: 1,
        fontFamily: 'Cairo',
        padding: 3,
        textAlign: 'center'
    },
    buttonContainer: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5,
        width: 280,
        borderRadius: 30,
    },
    loginButton: {
        backgroundColor: "#FDC000",
        marginBottom: 10,
    },
    text: {
        color: 'white',
        fontFamily: 'Cairo',
        fontSize: 14
    }
});

// export default LoginScreen;