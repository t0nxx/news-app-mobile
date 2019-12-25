import React, { useState, useEffect, useContext } from 'react';
import { Text, View, StyleSheet, ActivityIndicator, Image, TouchableHighlight, FlatList, TextInput, KeyboardAvoidingView, AsyncStorage } from 'react-native';
import { Tabs, Tab, Container, Content, Button, Icon, Thumbnail, Badge, Toast } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import { http } from '../services/httpService'
import { getAllComments } from '../services/posts';
import { AuthContext } from '../services/auth';
import HeaderComponent from '../components/Header';
import { Divider } from 'react-native-paper';



const CommentsScreen = ({ params, navigation }) => {
    const [isLogin, setIsLogin] = useContext(AuthContext);

    const [isLoading, setIsLoading] = useState(true);
    const [newComment, setNewComment] = useState('');
    const [Comments, setComments] = useState([]);
    const [CommentsPage, setCommentsPage] = useState(1);

    const post = navigation.getParam('data');

    const getComments = async (page) => {
        const com = await getAllComments(post, page);
        setComments([...Comments, ...com]);
    }

    const fetchAllData = async () => {
        await getComments(CommentsPage);
        setIsLoading(false);
    }

    const fetchAllDataAfterNewComment = async () => {
        const com = await getAllComments(post, 1);
        setComments([...com]);
        setIsLoading(false);
    }

    const addComment = async () => {

        try {
            if (!isLogin) {
                return navigation.navigate('Login');
            }
            const data = await http.post('/comments/new', {
                body: newComment,
                postId: post,
            });
            setIsLoading(true);
            await fetchAllDataAfterNewComment();

        } catch (err) {
            console.log(err.response);
            let msg = 'حدث خطأ';
            if (err.response) {
                msg = err.response.data.message;
            }
            Toast.show({
                text: msg,
                type: "danger",
                position: "top",
                duration: 5000
            })
        }

    }
    const renderRow = ({ item, index, data }) => (
        <TouchableHighlight
            onPress={() => navigation.navigate({ key: Math.random() * 10000, routeName: 'Replies', params: { data: item } })}

        >
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1, flexDirection: 'row-reverse', margin: 10 }}>
                    <Thumbnail square source={{ uri: item.user.profileImage == 'no image' ? item.user.profileImage : item.user.profileImage }} />
                    <Text
                        style={{ color: '#F53099', fontFamily: 'Cairo', marginRight: 10, }}
                    >{item.user.fullName}</Text>
                    {
                        item.reply_count > 0 ? <Badge style={{ backgroundColor: 'red', position: 'absolute', right: 0 }}>
                            <Text style={{ color: 'white', fontFamily: 'Cairo', }}>{item.reply_count}</Text>
                        </Badge> : null
                    }

                </View>
                <View style={{ flex: 1, flexDirection: 'row-reverse', marginRight: 10, marginLeft: 10, flexWrap: 'wrap' }}>
                    <Text style={{ color: 'black', fontFamily: 'Cairo' }}>{item.body}</Text>
                </View>
                <Divider style={{ backgroundColor: 'grey' }} />
            </View>

        </TouchableHighlight >

    );
    useEffect(() => {
        fetchAllData();

    }, []);
    return (
        isLoading ? <ActivityIndicator size="large" color="#0000ff" /> :
            (<Container>
                <HeaderComponent title="ااا" navigation={navigation} />
                <View style={styles.inputContainer}>

                    <TextInput
                        style={styles.inputs}
                        placeholder="اكنب تعليق"
                        multiline={true}
                        onChangeText={(txt) => setNewComment(txt)}
                    />

                    <Button rounded style={{ backgroundColor: 'red', width: 40, height: 40, marginTop: 5, position: 'absolute', left: 10 }}
                        onPress={() => addComment()}
                    >
                        <Image style={{ marginLeft: 10 }} source={require('../assets/images/test/submit.png')}></Image>
                    </Button>
                </View>
                <Content style={{ marginHorizontal: 20, marginTop: 5 }}>
                    <FlatList
                        data={Comments}
                        renderItem={renderRow}
                        keyExtractor={(i, k) => k.toString()}
                        onEndReached={() => {
                            setCommentsPage(CommentsPage + 1);
                            // here cause i wont re render the component every time
                            getComments(CommentsPage + 1);
                        }}
                    />

                </Content>
            </Container >)
    )

};

const styles = StyleSheet.create({
    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#DCDCDC',
        borderRadius: 30,
        borderBottomWidth: 1,
        height: 50,
        margin: 10,
        marginBottom: 5,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    inputs: {
        height: 45,
        marginRight: 15,
        borderBottomColor: '#FFFFFF',
        flex: 1,
        fontFamily: 'Cairo',
        padding: 3,
        textAlign: 'right',
        // backgroundColor: '#DCDCDC',
        borderRadius: 10,
        flexWrap: 'wrap',

    },
    buttonContainer: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5,
        width: 280,
        borderRadius: 30,
    }
});

export default CommentsScreen;
