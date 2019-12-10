import React, { useState, useEffect } from 'react';
import { ScrollView, Dimensions, View, Text, ActivityIndicator, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { H1, Badge, Icon, Button, Thumbnail, Right, Body } from 'native-base'
import { getPostReactions, bookmarkPost, unbookmarkPost } from '../services/posts';
import HeaderComponent from '../components/Header';
import HTML from 'react-native-render-html';
import HeaderImageScrollView from 'react-native-image-header-scroll-view';
import { Divider } from 'react-native-paper';



const SinglePostScreen = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [reactions, setReactions] = useState([]);
    const [likeCount, setLikeCount] = useState(0);
    const [loveCount, setLoveCount] = useState(0);
    const [wowCount, setWowCount] = useState(0);
    const [angryCount, setAngryCount] = useState(0);
    const [sadCount, setSadCount] = useState(0);
    const [hahaCount, sethahaCount] = useState(0);
    // here i wont need state , when every post change the previous is also exist
    // const [data, setData] = useState({});
    // const [htmlContent, setHtmlContent] = useState('<p>Loading</p>')
    const htmlStyles = {
        p: { fontFamily: 'Cairo', fontSize: 15, color: 'grey' },
        u: { fontFamily: 'Cairo', fontSize: 18, color: 'grey' },
        blockquote: { fontFamily: 'Cairo', fontSize: 18, color: 'grey' },
        strong: { fontFamily: 'Cairo', fontSize: 18, color: 'grey' },
    }

    const data = navigation.getParam('data');

    const bookmark = async () => {
        try {
            setIsBookmarked(true);
            await bookmarkPost(data.id);
        } catch (error) {
            console.log(error)
        }

    }
    const Unbookmark = async () => {
        try {
            setIsBookmarked(false);
            await unbookmarkPost(data.id);
        } catch (error) {
            console.log(error)
        }
    }

    // const fetchData = async () => {
    //     const res = await getPostReactions(data.id);
    //     setReactions([...res]);
    //     console.log(reactions)

    //     }
    useEffect(() => {
        // fetchData().then(() => {
        //     setIsLoading(false);
        // });
        setIsLoading(false);
        setIsBookmarked(data.isBookmarked);
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
                    <View style={{ top: 30, height: 50, flex: 1, flexDirection: 'row' }} >
                        <Button style={{ backgroundColor: '#B047E5', width: 80, borderTopRightRadius: 20, borderBottomRightRadius: 20, justifyContent: 'center' }}
                            onPress={() => navigation.goBack()}>
                            <Icon name={'arrow-back'} color='white' fontSize={100} />
                        </Button>

                        {
                            isBookmarked ? <Icon name={'bookmark'} style={{ left: 170, backgroundColor: 'transparent', color: '#87ceeb', fontSize: 40 }} onPress={() => Unbookmark()} />
                                : <Icon name={'bookmark'} style={{ left: 170, backgroundColor: 'transparent', color: 'white', fontSize: 40 }} onPress={() => bookmark()} />
                        }

                        <Icon name={'share'} style={{ left: 195, backgroundColor: 'transparent', color: 'white', fontSize: 40 }} onPress={() => alert('share')} />
                    </View>
                )}
            >
                <ScrollView style={{ flex: 1, padding: 25, borderTopRightRadius: 50, borderTopLeftRadius: 50, backgroundColor: 'white' }}>
                    <Text style={{ fontSize: 20, fontFamily: 'Cairo' }}>{data.title}</Text>
                    <HTML
                        html={data.body}
                        imagesMaxWidth={Dimensions.get('window').width}
                        tagsStyles={htmlStyles}
                        baseFontStyle={{ fontSize: 15 }}
                    />

                    <Divider style={{ backgroundColor: 'grey' }} />

                    <View style={{ flex: 1, flexDirection: 'row-reverse', margin: 10 }}>
                        <Thumbnail source={{ uri: data.user.profileImage == 'no image' ? data.source.backgroundImage : data.user.profileImage }} />
                        <Text
                            style={{
                                color: 'black', fontFamily: 'Cairo',
                                marginTop: 20, marginRight: 15,
                            }}
                        >{data.user.fullName}</Text>
                    </View>
                    <Divider style={{ backgroundColor: 'grey' }} />
                    {/* <Text style={{ textAlign: 'right', margin: 5, fontFamily: 'Cairo', fontSize: 25 }}> المصدر </Text> */}
                    <View style={{ flex: 1, flexDirection: 'row-reverse', margin: 10 }}>
                        <Thumbnail source={{ uri: data.source.backgroundImage }} />
                        <Text
                            style={{
                                color: 'blue', fontFamily: 'Cairo',
                                marginTop: 20, marginRight: 10,
                                textDecorationLine: 'underline'
                            }}
                            onPress={() => { Linking.openURL(`${data.source.link}`) }}
                        // >{data.source.name}</Text>
                        >رابط المصدر </Text>
                    </View>

                    <View style={{ flex: 1, flexDirection: 'row-reverse', margin: 10, flexWrap: 'wrap' }}>
                        <Text style={{ color: '#F53099', fontFamily: 'Cairo', marginTop: 10 }}> الهاش تاج : </Text>
                        {data.tags.map(e => (
                            <Badge style={{ backgroundColor: '#DCDCDC', marginTop: 10, marginLeft: 3 }} key={e.id}>
                                <Text style={{ color: '#F53099', fontFamily: 'Cairo', }}>{e.name}</Text>
                            </Badge>

                        ))}
                    </View>

                    <View style={{ flex: 1, flexDirection: 'row-reverse', margin: 10, flexWrap: 'wrap' }}>
                        <Text style={{ color: '#F53099', fontFamily: 'Cairo', marginTop: 10 }}> التصنيفات : </Text>
                        {data.categories.map(e => (
                            <Badge style={{ backgroundColor: '#DCDCDC', marginTop: 10, marginLeft: 3 }} key={e.id}>
                                <Text style={{ color: '#F53099', fontFamily: 'Cairo', }}>{e.name}</Text>
                            </Badge>

                        ))}
                    </View>

                </ScrollView>
            </HeaderImageScrollView>
    )

};
const styles = StyleSheet.create({
    text: {
        fontSize: 25,
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
