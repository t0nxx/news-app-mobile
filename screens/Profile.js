import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, AsyncStorage, TextInput, TouchableHighlight, View, Image, Switch } from 'react-native';
import { http, checkCurrentUser } from '../services/httpService'
import { Container, Toast, Button, Thumbnail, ActivityIndicator, Left, Right, Content } from 'native-base';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import * as yup from 'yup';
import { AuthContext } from '../services/auth';
import HeaderComponent from '../components/Header';

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



export const ProfileScreen = ({ navigation }) => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [img, setImg] = useState('');
    const [receiveNotification, setReceiveNotification] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

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
                const file = `data:image/${fileExtention};base64,${pick.base64}`;
                setImg(file);
            }


        } catch (error) {
            console.log(error);
        }
        // if (!cancelled) setImg(uri);
    };

    const getUserData = async () => {
        let user = await AsyncStorage.getItem('user');
        user = JSON.parse(user);
        console.log(user);
        setEmail(user.email);
        if(user.firstName) {
            setFullName(user.firstName);
        }else {
            setFullName(user.fullName);
        }
       
        setImg(user.profileImage);
        setReceiveNotification(user.receiveNotification);
    }
    const Update = async () => {
        let user = await AsyncStorage.getItem('user');
        user = JSON.parse(user);
        let body = {};

        try {
            if (user.firstName !== fullName) {
                await yup.reach(validationSchema, 'fullName').validate(fullName);
                body.fullName = fullName;
            }
            if (user.email !== email) {
                await yup.reach(validationSchema, 'email').validate(email);
                body.email = email;
            }
            if (user.receiveNotification !== receiveNotification) {
                body.receiveNotification = receiveNotification;
            }
            if (img.startsWith('data')) {
                body.img = img;
            }
            if(password.length > 0 ){
                await yup.reach(validationSchema, 'password').validate(password);
               if(password !== passwordConfirm){
                   throw new Error ('كلمة السر وتاكيد كلمة السر غير متشابهان ')
               }
                body.password = password;
            }


            const { data } = await http.put('/users/update/me', body);
            console.log()

               await AsyncStorage.setItem('user', JSON.stringify(data.data));

                Toast.show({
                    text: "تم التحديث",
                    type: "success",
                    position: "top",
                    duration: 3000
                });
                
        } catch (err) {
            console.log(err);
            let msg = err.message;
            if (err.errors && err.errors.length > 0) {
                msg = err.errors;
            }
            Toast.show({
                text: msg,
                type: "danger",
                position: "top",
                duration: 2000
            })
        }
        // validationSchema.validate({ fullName: fullName, })
        //     .then(async () => {
        //         let body = {
        //             "fullName": fullName,
        //             "email": email,
        //             "password": password
        //         };
        //         if (img.length > 3) {
        //             body.img = img;
        //         }
                
            
        //     .catch(err => {
        //         let msg = "البريد الالكتروني مسجل بالفعل"
        //         if (err.errors && err.errors.length > 0) {
        //             msg = err.errors;
        //         }

        //     });


    }

    useEffect(() => {
        getUserData().then(() => setIsLoading(false))
    }, [isLoading]);

    return (
        
        <Container>
            <HeaderComponent title="متابعاتي" navigation={navigation} />
            <Content style={{ backgroundColor: '#E4EAEE' }}>
                <View style={styles.container}>

                    <TouchableHighlight style={{ paddingBottom: 15 }} onPress={() => selectPicture()}>
                        <>
                            {img.length > 3 ? <Thumbnail style={{ width: 120, height: 120, borderRadius: 120 / 2 }} source={{ uri: img }} />
                                : <Thumbnail style={{ backgroundColor: '#FDC000' }} large source={require('../assets/images/test/user-big.png')} />
                            }
                            <Text style={{ color: 'black', fontFamily: 'Cairo', fontSize: 8 }}> اختر صورة </Text>
                        </>
                    </TouchableHighlight>
                    <View style={{ flexDirection: 'row', paddingBottom: 10 }}>
                        <Switch value={receiveNotification} thumbColor="#742A99" trackColor={{ false: "grey", true: "#742A99" }} onValueChange={(val) => setReceiveNotification(val)} />
                        <Text style={{ color: 'black', fontFamily: 'Cairo', paddingLeft: 100 }}> استلام الاشعارات  </Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput style={[styles.inputs, { textAlign: 'center' }]}
                            placeholder=" اسم المستخدم    "
                            defaultValue={fullName}
                            keyboardType="default"
                            underlineColorAndroid='transparent'
                            onChangeText={(txt) => setFullName(txt)} />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput style={[styles.inputs, { textAlign: 'center' }]}
                            placeholder=" البريد الالكتروني    "
                            defaultValue={email}
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

                    <TouchableHighlight style={[styles.buttonContainer, { backgroundColor: '#742A99' }]} onPress={() => Update()}>
                        <Text style={styles.text}> تحديث </Text>
                    </TouchableHighlight>
                </View >
            </Content>
        </Container>

    )


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E4EAEE',
        marginTop: 10
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

ProfileScreen.navigationOptions = ({ navigation }) => {
    return {
        drawerLabel: () => null
    }
}

export default ProfileScreen;
