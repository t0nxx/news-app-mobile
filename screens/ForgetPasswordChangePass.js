import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, AsyncStorage, TextInput, TouchableHighlight, View, Image } from 'react-native';
import { http, checkCurrentUser } from '../services/httpService'
import HomeScreen from './Home';
import HeaderComponent from '../components/Header';
import TabsComponent from '../components/Tabs';
import FooterComponent from '../components/Footer';
import { Container, Toast } from 'native-base';

import { Formik } from 'formik';
import * as yup from 'yup';
import { AuthContext } from '../services/auth';

const validationSchema = yup.object().shape({
    password: yup
        .string()
        .label('Password')
        .required('الرقم السري مطلوب')
        .min(6, 'اقل عدد من الحروف للرقم السري هو 6'),
    passwordConfirm: yup.string()
        .oneOf([yup.ref('password'), null], 'كلمة السر وتاكيد كلمة السر غير متشابهان ')

});


export const ForgetPasswordChangePassScreen = ({ navigation }) => {
    // const [logErr, setLogErr] = useState(true);
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const email = navigation.getParam('email');
    const resetCode = navigation.getParam('resetCode');

    const login = async () => {

        validationSchema.validate({ password: password, passwordConfirm: passwordConfirm })
            .then(async () => {
                const { data } = await http.post('/users/forgetpassword/resetcode/changepassword', {
                    "email": email,
                    "resetCode": resetCode,
                    "password": password
                });

                Toast.show({
                    text: "تم تغيير كلمة السر ز برجاء اعادة الدخول ",
                    type: "success",
                    position: "top",
                    duration: 5000
                })
                navigation.navigate('Login');
            })
            .catch(err => {
                let msg = '';
                if (err.errors && err.errors.length > 0) {
                    msg = err.errors;
                } else {
                    msg = err.response.data.message;
                }
                Toast.show({
                    text: msg,
                    type: "danger",
                    position: "top",
                    duration: 2000
                })
            });


    }

    return (
        <View style={styles.container}>
            <Image style={{ bottom: 30 }} source={require('../assets/images/logo.png')} />
            <View style={styles.inputContainer}>
                <TextInput style={[styles.inputs, { textAlign: 'center' }]}
                    placeholder="  كلمة السر الجديدة   "
                    textContentType='password'
                    secureTextEntry={true}
                    underlineColorAndroid='transparent'
                    onChangeText={(pass) => setPassword(pass)} />
            </View>
            <View style={styles.inputContainer}>
                <TextInput style={[styles.inputs, { textAlign: 'center' }]}
                    placeholder="تاكيد كلمة السر    "
                    textContentType='password'
                    secureTextEntry={true}
                    underlineColorAndroid='transparent'
                    onChangeText={(pass) => setPasswordConfirm(pass)} />
            </View>

            <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => login()} >
                <Text style={styles.text}> التالي </Text>
            </TouchableHighlight>
        </View>
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

export default ForgetPasswordChangePassScreen;