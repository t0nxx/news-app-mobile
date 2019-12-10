import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ActivityIndicator, TouchableHighlight, FlatList } from 'react-native';
import PostComponent from '../components/Post';
import { getMySub, getMyBookmarked } from '../services/posts';
import HeaderComponent from '../components/Header';



const BookmarksScreen = ({ params, navigation }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [posts, setPosts] = useState([]);
    const [postsPage, setPostsPage] = useState(1);

    // const extractMyBookmarked = (arr) => {
    //     let temp = [...arr];
    //     temp = arr.length > 0 ? temp.filter(e => e.isBookmarked == true) : [];
    //     return temp;
    // }
    // const getMoreMySub = async (n) => {
    //     let { data } = await getMyBookmarked();
    //     data = data.filter(e => e.isBookmarked == true);
    //     setPosts([...posts, ...data]);
    // }

    const fetchAllData = async () => {
        setIsLoading(true);
        let { data } = await getMyBookmarked();
        data = data.filter(e => e.isBookmarked == true)
        setPosts([...data]);
        setIsLoading(false);

    }

    const renderRow = ({ item, index }) => (
        <TouchableHighlight
            onPress={() => navigation.navigate({ key: Math.random() * 10000, routeName: 'SinglePost', params: { data: item } })}

        >
            <PostComponent
                navigation={navigation}
                title={item.title}
                backgroundImage={item.backgroundImage}
                source={item.source}
                category={item.categories[0] ? item.categories[0].name : 'غيرمحدد'}
            />
        </TouchableHighlight >

    );
    useEffect(() => {
        fetchAllData();
    }, []);

    return (
        isLoading ? <ActivityIndicator size="large" color="#0000ff" /> :
            (<View style={{ flex: 1 }}>
                <HeaderComponent title="محفوظاتي" navigation={navigation} />
                <FlatList
                    data={posts}
                    renderItem={renderRow}
                    keyExtractor={(i, k) => k.toString()}
                    refreshing={isLoading}
                    onRefresh={() => fetchAllData()}
                />
            </View>)


    )

}
BookmarksScreen.navigationOptions = ({ navigation }) => {
    return {
        drawerLabel: () => null
    }
}
export default BookmarksScreen;






