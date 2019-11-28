import React, { useEffect, useState } from 'react';
import { AsyncStorage } from 'react-native'
import { Container, Content, H1 } from 'native-base';
import HeaderComponent from '../components/Header';

const HelpScreen = ({ params, navigation }) => {
    const [token, setToken] = useState('');
    const getToken = async () => {
        const tok = await AsyncStorage.getItem('token');
        setToken(tok);
    }


    useEffect(() => {
       getToken();
    }, []);
    return (
        <Container>
            <HeaderComponent title="Help Me" navigation={navigation} />
            <Content style={{ marginHorizontal: 15, marginTop: 15 }}>
                <H1>
                    {token}
            </H1>
            </Content>
        </Container>
    );
}

export default HelpScreen;
