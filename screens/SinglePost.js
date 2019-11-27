import React, { useState, useEffect } from 'react';
import { ScrollView, Dimensions, View,Text } from 'react-native';
import { H1 } from 'native-base'
import { getOnePost } from '../services/posts';
import HeaderComponent from '../components/Header';
import HTML from 'react-native-render-html';
import HeaderImageScrollView from 'react-native-image-header-scroll-view';



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
        console.log();

    }
    useEffect(() => {
        fetchData();
    }, [navigation.getParam('id')]);
    return (
        // <Container>
        //     <HeaderComponent title="" navigation={navigation} />
        //     <Image source={{ uri: data.backgroundImage }} style={{ height: 200, width: null, flex: 1, opacity: 1.5 }} />
        //     <ScrollView style={{ flex: 1, padding: 15 }}>
        //         <HTML
        //             html={htmlContent}
        //             imagesMaxWidth={Dimensions.get('window').width}
        //             tagsStyles={htmlStyles}
        //         />
        //     </ScrollView>
        // </Container>
        <HeaderImageScrollView
            maxHeight={350}
            headerImage={{ uri: data.backgroundImage }}
        >
            <ScrollView style={{ flex: 1, padding: 15 }}>
                <View style={{ borderTopRightRadius: 40, borderTopStartRadius: 40, overflow: 'hidden' }}>
                    <Text style={{ fontSize: 40, fontFamily: 'Cairo', fontWeight: 'bold' }}>{data.title}</Text>
                    <HTML
                        html={htmlContent}
                        imagesMaxWidth={Dimensions.get('window').width}
                        tagsStyles={htmlStyles}
                    />
                </View>

            </ScrollView>
        </HeaderImageScrollView>
    )
};

// SinglePostScreen.navigationOptions = ({ navigation }) => {
//     return {
//         drawerLabel: () => null
//     }
// }
export default SinglePostScreen;
