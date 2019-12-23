import React, { useState, useEffect, useContext } from 'react';
import { Text, View, StyleSheet, ActivityIndicator, Image, TouchableHighlight, FlatList, TextInput, KeyboardAvoidingView, AsyncStorage } from 'react-native';
import { Tabs, Tab, Container, Content, Button, Icon, Thumbnail, Badge, Toast } from 'native-base';
import { getAllMyComments } from '../services/posts';
import { AuthContext } from '../services/auth';
import HeaderComponent from '../components/Header';
import { Divider } from 'react-native-paper';

const MyCommentsScreen = ({ params, navigation }) => {
    const [isLogin, setIsLogin] = useContext(AuthContext);

    const [isLoading, setIsLoading] = useState(true);
    const [newComment, setNewComment] = useState('');
    const [Comments, setComments] = useState([]);
    const [CommentsPage, setCommentsPage] = useState(1);


    const getComments = async (page) => {
        const com = await getAllMyComments(page);
        setComments([...Comments, ...com]);
    }

    const fetchAllData = async () => {
        await getComments(CommentsPage);
        setIsLoading(false);
    }
    const renderRow = ({ item, index, data }) => (
        <TouchableHighlight>
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
    );
};

MyCommentsScreen.navigationOptions = ({ navigation }) => {
    return {
        drawerLabel: () => null
    }
}
export default MyCommentsScreen;
