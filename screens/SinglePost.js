import React, { useState, useEffect } from 'react';
import { ScrollView, Dimensions, View, Text, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { H1, Badge, Icon, Button } from 'native-base'
import { getOnePost } from '../services/posts';
import HeaderComponent from '../components/Header';
import HTML from 'react-native-render-html';
import HeaderImageScrollView from 'react-native-image-header-scroll-view';



const SinglePostScreen = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(true);
    // here i wont need state , when every post change the previous is also exist
    // const [data, setData] = useState({});
    // const [htmlContent, setHtmlContent] = useState('<p>Loading</p>')
    const htmlStyles = {
        p: { fontFamily: 'Cairo', fontSize: 15 },
        strong: { fontFamily: 'Cairo', fontSize: 25 }
    }
    const data = navigation.getParam('data');
    // const fetchData = async () => {
    //     const res = await getOnePost(navigation.getParam('id'));
    //     setData({ ...res.data });
    //     setHtmlContent(res.data.body);
    //     console.log(res.data.body)

    // }
    useEffect(() => {
        // fetchData().then(() => {
        //     setIsLoading(false);
        // });
        setIsLoading(false);
    }, [navigation.getParam('data')]);
    return (

        isLoading ? <ActivityIndicator size="large" color="#0000ff" /> :
            <HeaderImageScrollView
                maxHeight={500}
                headerImage={{ uri: data.backgroundImage }}
                overlayColor="white"
                overScrollMode="never"
                scrollViewBackgroundColor='transparent'
                renderFixedForeground={() => (
                    <View style={{ top: 30, height: 50, }} >
                        {/* <TouchableOpacity onPress={() => console.log("tap!!")}>
                            <Badge>
                                <Text>hhhhh</Text>
                                <Icon name={'arrow-back'} color='white' />
                            </Badge>
                        </TouchableOpacity> */}
                        <Button style={{ backgroundColor: '#B047E5', width: 80, borderTopRightRadius: 20, borderBottomRightRadius: 20, justifyContent: 'center' }}
                            onPress={() => navigation.goBack()}>
                            <Icon name={'arrow-back'} color='white' fontSize={100} />
                        </Button>
                    </View>
                )}
            >
                <ScrollView style={{ flex: 1, padding: 15, borderTopRightRadius: 50, borderTopLeftRadius: 50, backgroundColor: 'white' }}>
                    <Text style={styles.text}>{data.title}</Text>
                    <HTML
                        html={data.body}
                        imagesMaxWidth={Dimensions.get('window').width}
                        tagsStyles={htmlStyles}
                    />
                </ScrollView>
            </HeaderImageScrollView>
    )

};
const styles = StyleSheet.create({
    text: {
        fontSize: 40,
        fontFamily: 'Cairo',
        fontWeight: 'bold'

    },
})
SinglePostScreen.navigationOptions = ({ navigation }) => {
    return {
        drawerLabel: () => null
    }
}
export default SinglePostScreen;
