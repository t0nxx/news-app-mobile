import React from 'react';
import { Container, Content, H1 } from 'native-base';
import HeaderComponent from '../components/Header';

const BookmarksScreen = ({ params, navigation }) => (
    <Container>
        <HeaderComponent title="Bookmarks" navigation={navigation} />
        <Content style={{ marginHorizontal: 15, marginTop: 15 }}>
            <H1>
                Bookmarks page 
                {navigation.getParam('id','hhh')}
        </H1>
        </Content>
    </Container>
);
BookmarksScreen.navigationOptions = ({ navigation }) => {
    return {
        drawerLabel: () => null
    }
}

export default BookmarksScreen;
