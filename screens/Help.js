import React, { useEffect, useState } from 'react';
import { AsyncStorage, StyleSheet } from 'react-native'
import { Container, Content, H1, Item, Input, Textarea, Form, Text, Toast } from 'native-base';
import HeaderComponent from '../components/Header';
import * as yup from 'yup';
import { TouchableHighlight } from 'react-native-gesture-handler';

const HelpScreen = ({ params, navigation }) => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [sug, setSug] = useState('');
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
        phone: yup
            .string()
            .label('Number')
            .required(' رقم التليفون مطلوب')
            .min(6, 'اقل عدد من الحروف للرقم الهاتف هو 6'),
        sug: yup
            .string()
            .label('Number')
            .required('اقتراحك او طلبك مطلوب')
            .min(6, 'اقل عدد من الحروف للاقتراح  هو 6'),


    });

    const Send = async () => {
        validationSchema.validate({ fullName: fullName, email: email, phone: phone, sug: sug })
            .then(async () => {
                let body = {
                    "fullName": fullName,
                    "email": email,
                    "phone": phone,
                    "sug": sug
                };
                // const { data } = await http.post('/users/new', body);
                // send to server

                Toast.show({
                    text: "تم ارسال طلبك بنجاح",
                    type: "success",
                    position: "top",
                    duration: 5000
                })
                navigation.navigate('Home');
            })
            .catch(err => {
                let msg = 'حدث خطأ';
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


    useEffect(() => {
    }, []);
    return (
        <Container>
            <HeaderComponent title="Help Me" navigation={navigation} />
            <Content style={{ marginHorizontal: 15, marginTop: 15 }}>
                <Item>
                    <Input placeholder="الاسم" style={{ textAlign: 'right', marginBottom: 10, fontFamily: 'Cairo' }}  onChangeText={(em) => setFullName(em)} />
                </Item>
                <Item>
                    <Input placeholder="البريد الالكتروني" style={{ textAlign: 'right', marginBottom: 10, fontFamily: 'Cairo' }}  onChangeText={(em) => setEmail(em)}/>
                </Item>
                <Item>
                    <Input placeholder="رقمك التليفون" style={{ textAlign: 'right', marginBottom: 10, fontFamily: 'Cairo' }}  onChangeText={(em) => setPhone(em)}/>
                </Item>

                <Textarea bordered rowSpan={5} placeholder="ماهو اقتراحك او طلبك" style={{ textAlign: 'right', marginBottom: 10, fontFamily: 'Cairo' }}  onChangeText={(em) => setSug(em)}/>

                <TouchableHighlight style={[styles.buttonContainer, { backgroundColor: '#742A99' }]} onPress={() => Send()}>
                    <Text style={{ color: 'white', fontFamily: 'Cairo' }}>ارسل</Text>
                </TouchableHighlight>
            </Content>
        </Container>

    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20,
        borderRadius: 30,
    },
});
export default HelpScreen;
