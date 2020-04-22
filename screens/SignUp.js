import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, AsyncStorage, TextInput, TouchableHighlight, View, Image, Linking } from 'react-native';
import { http, checkCurrentUser } from '../services/httpService'
import { Container, Toast, Button, Thumbnail, CheckBox } from 'native-base';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import * as yup from 'yup';
import { AuthContext } from '../services/auth';

const validationSchema = yup.object().shape({
    fullName: yup
        .string()
        .label('fullName')
        .required('اسم المستخدم مطلوب')
        .min(3, 'اسم المستخدم لايقل عن 3 حروف '),
    email: yup
        .string()
        .label('Email')
        .email('البريد الالكتروني غير صالح')
        .required('البريد الالكتروني مطلوب'),
    password: yup
        .string()
        .label('Password')
        .required('الرقم السري مطلوب')
        .min(6, 'اقل عدد من الحروف للرقم السري هو 6'),
    passwordConfirm: yup.string()
        .oneOf([yup.ref('password'), null], 'كلمة السر وتاكيد كلمة السر غير متشابهان ')

});



export const SignUpScreen = ({ navigation }) => {
    // const [logErr, setLogErr] = useState(true);
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [img, setImg] = useState('');
    const [isAccept, setIsAccept] = useState(false);
    const [isLogin, setIsLogin] = useContext(AuthContext);

    const selectPicture = async () => {
        try {
            await Permissions.askAsync(Permissions.CAMERA_ROLL);
            const pick = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                aspect: [3, 3],
                allowsEditing: true,
                base64: true
            });
            if (pick.cancelled == false) {
                let filename = pick.uri.split('/').pop();
                let fileExtention = filename.split('.')[1];
                console.log(fileExtention)
                const file = `data:image/${fileExtention};base64,${pick.base64}`;
                setImg(file);
            }


        } catch (error) {
            console.log(error);
        }
        // if (!cancelled) setImg(uri);
    };

    const SignUp = async () => {

        validationSchema.validate({ fullName: fullName, email: email, password: password, passwordConfirm: passwordConfirm })
            .then(async () => {
                let body = {
                    "fullName": fullName,
                    "email": email,
                    "password": password
                };
                if (img.length > 3) {
                    body.img = img;
                }
                if(isAccept !== true) {
                    throw new Error('يرجي الموافقه على الشروط والاحكام')
                }
                const { data } = await http.post('/users/new', body);
                await AsyncStorage.setItem('token', data.token);

                await AsyncStorage.setItem('user', JSON.stringify(data.data));
                setIsLogin(true);

                Toast.show({
                    text: "تم التسجيل بنجاح",
                    type: "success",
                    position: "top",
                    duration: 5000
                })
                navigation.navigate('Home');
            })
            .catch(err => {
                let msg = "  يرجي الموافقة على الشروط والاحكام "
                if (err.errors && err.errors.length > 0) {
                    msg = err.errors;
                }
                Toast.show({
                    text: msg,
                    type: "danger",
                    position: "top",
                    duration: 5000
                })
            });


    }

    return (
        <View style={styles.container}>
            {/* <Image style={{ bottom: 30 }} source={require('../assets/images/logo.png')} /> */}

            <TouchableHighlight onPress={() => selectPicture()}>
                <>
                    {img.length > 3 ? <Thumbnail style={{ width: 120, height: 120, borderRadius: 120 / 2 }} source={{ uri: img }} />
                        : <Thumbnail style={{ width: 120, height: 120, borderRadius: 120 / 2, backgroundColor: 'white' }} source={require('../assets/images/test/user-big.png')} />
                    }
                    <Text style={{ color: 'white', fontFamily: 'Cairo', paddingBottom: 5 }}> اختر صورة </Text>
                </>
            </TouchableHighlight>
            <View style={styles.inputContainer}>
                <TextInput style={[styles.inputs, { textAlign: 'center' }]}
                    placeholder=" اسم المستخدم    "
                    keyboardType="default"
                    underlineColorAndroid='transparent'
                    onChangeText={(txt) => setFullName(txt)} />
            </View>
            <View style={styles.inputContainer}>
                <TextInput style={[styles.inputs, { textAlign: 'center' }]}
                    placeholder=" البريد الالكتروني    "
                    keyboardType="email-address"
                    underlineColorAndroid='transparent'
                    onChangeText={(em) => setEmail(em)} />
            </View>
            <View style={styles.inputContainer}>
                <TextInput style={[styles.inputs, { textAlign: 'center' }]}
                    placeholder=" كلمة السر    "
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

            <Text
                style={{
                    color: 'blue', fontFamily: 'Cairo',
                    marginTop: 5, marginRight: 10,
                    textDecorationLine: 'underline'
                }}
                onPress={() => { Linking.openURL(`https://hakaya.news/terms.html`) }}
                // >{data.source.name}</Text>
                > الشروط والاحكام </Text>
                <Text style={{ fontFamily: 'Cairo', color: 'white' ,margin :5 , textTransform : 'uppercase' }}> i have read the terms and completly</Text>
                <View style={{ flexDirection: 'row', marginBottom: 3  }}>
                    
                    <Text style={{ fontFamily: 'Cairo', color: 'white' ,textTransform : 'uppercase'}}>  agree on the above terms and eula </Text>
                    <CheckBox checked={isAccept} color="white" onPress={() => setIsAccept(!isAccept)} />
                </View>


            <TouchableHighlight style={[styles.buttonContainer, { backgroundColor: '#742A99' }]} onPress={() => SignUp()}>
                <Text style={styles.text}>انشاء حساب</Text>
            </TouchableHighlight>

            {/* <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]}  onPress={() => navigation.navigate('Login')} >
                <Text style={styles.text}>تسجيل الدخول</Text>
            </TouchableHighlight> */}
            <Text
                style={{ color: 'white', fontFamily: 'Cairo', paddingTop: 30, textDecorationLine: 'underline', fontSize: 12 }}
                onPress={() => navigation.navigate('Home')}
            > تخطي تسجيل الدخول </Text>

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

export default SignUpScreen;