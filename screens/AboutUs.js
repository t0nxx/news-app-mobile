import React, { useState, useEffect } from 'react';
import { Container, Content, H1 } from 'native-base';
import HeaderComponent from '../components/Header';
import { getAboutUs } from '../services/drawer';


const AboutScreen = ({ navigation }) => {
    const [data, setData] = useState({});
    const fetchData = async () => {
        const res = await getAboutUs();
        setData({ ...res.data });
    }
    useEffect(() => {
        fetchData();
    }, []);
    return (
        <Container>
            <HeaderComponent title="عن التطبيق" navigation={navigation} />
            <Content style={{ marginHorizontal: 20, marginTop: 20 }}>
                <H1 style={{ fontFamily: 'Cairo' }}>{data.body}</H1>
            </Content>
        </Container>
    )
}

export default AboutScreen;
