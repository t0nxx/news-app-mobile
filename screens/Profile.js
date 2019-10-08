import React from 'react';
import { Container, Content, H1 } from 'native-base';
import HeaderComponent from '../components/Header';

const ProfileScreen = ({ params, navigation }) => (
    <Container>
        <HeaderComponent title="Profile" navigation={navigation} />
        <Content style={{ marginHorizontal: 15, marginTop: 15 }}>
            <H1>
                Profile page
        </H1>
        </Content>
    </Container>
);

ProfileScreen.navigationOptions = ({ navigation }) => {
    return {
        drawerLabel: () => null
    }
}

export default ProfileScreen;
