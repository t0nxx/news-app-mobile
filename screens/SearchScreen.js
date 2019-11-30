import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ActivityIndicator, TouchableOpacity, TouchableHighlight, FlatList } from 'react-native';
import { Tabs, Tab, Container, Content, Header, Item, Icon, Button, Input } from 'native-base';
import PostComponent from '../components/Post';
import { serchPosts, searchPosts } from '../services/posts';
import HeaderComponent from '../components/Header';



const SearchScreen = ({ params, navigation }) => {
    const [posts, setPosts] = useState([]);
    const [query, setQuery] = useState('');
    const fetchAllData = async () => {
        const { data } = await searchPosts(query);
        setPosts([...data]);

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

    }, [query]);

    return (
        <Container>
            <HeaderComponent title="البحث" navigation={navigation} />
            <Header searchBar rounded style={{ backgroundColor: 'transparent' }}>
                <Item>
                    <Icon name="ios-search" />
                    <Input placeholder="Search" onChangeText={(txt) => {
                        if (txt.length > 2) {
                            setQuery(txt);
                            fetchAllData();
                        }
                    }} />
                </Item>
            </Header>
            <View style={{ flex: 1 }}>
                <FlatList
                    data={posts}
                    renderItem={renderRow}
                    keyExtractor={(i, k) => k.toString()}
                />
            </View>
        </Container>

    )

}
SearchScreen.navigationOptions = ({ navigation }) => {
    return {
        drawerLabel: () => null
    }
}
export default SearchScreen;
