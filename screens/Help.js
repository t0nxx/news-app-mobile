import React from 'react';
import { Container, Content, H1 } from 'native-base';
import HeaderComponent from '../components/Header';

const HelpScreen = ({ params, navigation }) => (
    <Container>
        <HeaderComponent title="Help Me" navigation={navigation} />
        <Content style={{ marginHorizontal: 15, marginTop: 15 }}>
            <H1>
                لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت
        </H1>
        </Content>
    </Container>
);

export default HelpScreen;
