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
    code: yup
        .number()
        .label('Code')
        .required(' كود اعادة كلمة السر مطلوب')
        .min(6, 'اقل عدد من الارقام هو 6')
});




export const ForgetPasswordCodeScreen = ({ navigation }) => {
    // const [logErr, setLogErr] = useState(true);
    const [resetCode, setresetCode] = useState(0);

    const email = navigation.getParam('email');


    const login = async () => {

        validationSchema.validate({ code: resetCode })
            .then(async () => {
                const { data } = await http.post('/users/forgetpassword/resetcode', {
                    "email": email,
                    "resetCode": resetCode
                });

                Toast.show({
                    text: "الكود صحيح",
                    type: "success",
                    position: "top",
                    duration: 3000
                })
                navigation.navigate('ChangePasswordAfterReset', { email: email, resetCode, resetCode });
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
                    placeholder=" ادخل كود تغيير كلمة السر"
                    keyboardType="number-pad"
                    underlineColorAndroid='transparent'
                    onChangeText={(em) => setresetCode(em)} />
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

export default ForgetPasswordCodeScreen;