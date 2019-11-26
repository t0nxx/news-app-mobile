import React, { useState, useEffect } from 'react';
import { Image, ImageBackground, ScrollView, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';
import { Container, Content, Card, CardItem, Text, Left, Body, Badge, Right, Thumbnail, H1, View } from 'native-base';
import { getOnePost } from '../services/posts';
import HeaderComponent from '../components/Header';
import HTML from 'react-native-render-html';


const SinglePostScreen = ({ navigation }) => {
    const [data, setData] = useState({});
    const [htmlContent, setHtmlContent] = useState('<h1>Loading ...</h1>');
    const htmlStyles = {
        p: { fontFamily: 'Cairo', fontSize: 15 },
        strong: { fontFamily: 'Cairo', fontSize: 25 }
    }

    const fetchData = async () => {
        const res = await getOnePost(navigation.getParam('id'));
        setData({ ...res.data });
        setHtmlContent(res.data.body);
        console.log(res.data);

    }
    useEffect(() => {
        fetchData();
    }, [htmlContent]);
    return (
        <Container>
            <HeaderComponent title="" navigation={navigation} />
            <ScrollView style={{ flex: 1, padding: 15 }}>
                <HTML
                    html={htmlContent}
                    imagesMaxWidth={Dimensions.get('window').width}
                    tagsStyles={htmlStyles}
                />
            </ScrollView>
        </Container>
    )
};

// SinglePostScreen.navigationOptions = ({ navigation }) => {
//     return {
//         drawerLabel: () => null
//     }
// }
export default SinglePostScreen;
