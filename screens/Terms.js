import React, { useState, useEffect } from 'react';
import { Container, Content, H1 } from 'native-base';
import HeaderComponent from '../components/Header';
import { getTerms } from '../services/drawer';


const TermsScreen = ({ params, navigation }) => {
    const [data, setData] = useState({});
    const fetchData = async () => {
        const res = await getTerms();
        setData({ ...res.data });
    }
    useEffect(() => {
        fetchData();
    }, []);
    return (
        <Container>
            <HeaderComponent title="شروط الاستخدام" navigation={navigation} />
            <Content style={{ marginHorizontal: 20, marginTop: 30 }}>
                <H1 style={{ fontFamily: 'Cairo' }}>{data.body}</H1>
            </Content>
        </Container>
    )
};

export default TermsScreen;
