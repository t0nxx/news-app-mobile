import React from 'react';
import { Container, Content, H1 } from 'native-base';
import HeaderComponent from '../components/Header';

const MyCommentsScreen = ({ params, navigation }) => (
    <Container>
        <HeaderComponent title="My Comments" navigation={navigation} />
        <Content style={{ marginHorizontal: 15, marginTop: 15 }}>
            <H1>
                MyComments page
        </H1>
        </Content>
    </Container>
);

MyCommentsScreen.navigationOptions = ({ navigation }) => {
    return {
        drawerLabel: () => null
    }
}
export default MyCommentsScreen;
