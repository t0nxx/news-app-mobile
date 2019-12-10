import React, { useState, useEffect } from 'react';
import { Container, Content, H1  , Text} from 'native-base';
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
                <Text style={{ fontFamily: 'Cairo' , fontSize : 20 , color : 'grey' }}>{data.body}</Text>
            </Content>
        </Container>
    )
};

export default TermsScreen;
