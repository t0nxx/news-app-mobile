import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ListView, TouchableOpacity, TouchableHighlight } from 'react-native';
import { Tabs, Tab, Container, Content } from 'native-base';
import { THEME_BACKGROUND_COLOR, THEME_FONT_COLOR } from '../Colors';
import PostComponent from './Post';
import { ScrollView } from 'react-native-gesture-handler';
import { getAll1Posts } from '../services/posts';


const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    // to make infinty scroll
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >=
        contentSize.height - paddingToBottom;
};

const TabsComponent = ({ params, navigation }) => {

    const [posts, setPosts] = useState([]);
    const [mostRead, setMostRead] = useState([]);
    const [mostComment, setMostComment] = useState([]);

    const [postsPage, setPostsPage] = useState(1);
    const [mostReadPage, setMostReadPage] = useState(1);
    const [mostCommentPage, setMostCommentPage] = useState(1);

    const getLatestNews = async () => {
        const allposts = await getAll1Posts('all', postsPage);
        setPosts([...posts, ...allposts.data]);
    }
    const getMostRead = async () => {
        const moRead = await getAll1Posts('mostRead', mostReadPage);
        setMostRead([...mostRead, ...moRead.data]);
    }

    const getMostComment = async () => {
        const moComm = await getAll1Posts('mostComment', mostCommentPage)
        setMostComment([...mostComment, ...moComm.data]);
    }

    const fetchAllData = async () => {
        await Promise.all([
            getLatestNews(),
            getMostComment(),
            getMostRead()
        ]);

    }
    useEffect(() => {
        fetchAllData();
    }, []);
    return (
        <Tabs tabBarUnderlineStyle={Tabstyles.tabBarUnderlineStyle}    >
            <Tab heading="اخر الاخبار"
                tabStyle={Tabstyles.tabStyle}
                activeTabStyle={Tabstyles.activeTabStyle}
                activeTextStyle={Tabstyles.activeTextStyle}
            >
                <Container>
                    <Content
                        onScroll={({ nativeEvent }) => {
                            if (isCloseToBottom(nativeEvent)) {
                                setPostsPage(postsPage + 1);
                                getLatestNews();
                            }
                        }}
                        scrollEventThrottle={400}
                    >
                        <ScrollView style={{ flex: 1 }}>
                            {
                                posts.map(p => (
                                    <TouchableHighlight
                                        onPress={() => navigation.navigate('SinglePost', { id: p.id })}
                                        key={p.id}
                                    >
                                        <PostComponent
                                            title={p.title}
                                            backgroundImage={p.backgroundImage}
                                            source={p.source}
                                            category={p.categories[0] ? p.categories[0].name : 'غيرمحدد'} />
                                    </TouchableHighlight>

                                ))
                            }
                        </ScrollView>
                    </Content>
                </Container>

            </Tab>
            <Tab heading="الاكثر قراءة"
                tabStyle={Tabstyles.tabStyle}
                activeTabStyle={Tabstyles.activeTabStyle}
                activeTextStyle={Tabstyles.activeTextStyle}
            >
                <Container>
                    <Content
                        onScroll={({ nativeEvent }) => {
                            if (isCloseToBottom(nativeEvent)) {
                                setMostReadPage(mostReadPage + 1);
                                getMostRead();
                            }
                        }}
                        scrollEventThrottle={400}
                    >
                        <ScrollView style={{ flex: 1 }}>
                            {mostRead.map(p => (
                                <PostComponent
                                    key={p.id}
                                    title={p.title}
                                    backgroundImage={p.backgroundImage}
                                    source={p.source}
                                    category={p.categories[0] ? p.categories[0].name : 'غيرمحدد'} />
                            ))}
                        </ScrollView>
                    </Content>
                </Container>

            </Tab>
            <Tab heading="الاكثر تعليق"
                tabStyle={Tabstyles.tabStyle}
                activeTabStyle={Tabstyles.activeTabStyle}
                activeTextStyle={Tabstyles.activeTextStyle}
            >
                <Container>
                    <Content
                        onScroll={({ nativeEvent }) => {
                            if (isCloseToBottom(nativeEvent)) {
                                setMostCommentPage(mostCommentPage + 1);
                                getMostComment();
                            }
                        }}
                        scrollEventThrottle={400}
                    >
                        <ScrollView style={{ flex: 1 }}>
                            {mostComment.map(p => (
                                <PostComponent
                                    key={p.id}
                                    title={p.title}
                                    backgroundImage={p.backgroundImage}
                                    source={p.source}
                                    category={p.categories[0] ? p.categories[0].name : 'غيرمحدد'} />
                            ))}
                        </ScrollView>
                    </Content>
                </Container>
            </Tab>
        </Tabs>
    )
};
const Tabstyles = {
    tabStyle: {
        backgroundColor: THEME_BACKGROUND_COLOR,
    },
    activeTabStyle: {
        backgroundColor: THEME_BACKGROUND_COLOR
    },
    activeTextStyle: {
        color: 'white',
        fontWeight: 'bold',
        fontFamily: 'Cairo',
    },
    textStyle: {
        color: THEME_FONT_COLOR
    },
    tabBarUnderlineStyle: {
        backgroundColor: THEME_FONT_COLOR,
    }
};

export default TabsComponent;
