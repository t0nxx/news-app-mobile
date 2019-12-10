import React, { useState, useEffect,useContext } from 'react';
import { Text, View, StyleSheet, ActivityIndicator, TouchableOpacity, TouchableHighlight, FlatList } from 'react-native';
import { Tabs, Tab, Container, Content } from 'native-base';
import { THEME_BACKGROUND_COLOR, THEME_FONT_COLOR } from '../Colors';
import PostComponent from './Post';
import { ScrollView } from 'react-native-gesture-handler';
import { getAll1Posts, getMySub } from '../services/posts';
import { AuthContext } from '../services/auth';


const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    // to make infinty scroll
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >=
        contentSize.height - paddingToBottom;
};

const TabsComponent = ({ params, navigation }) => {
    const [isLogin, setIsLogin] = useContext(AuthContext);

    const [isLoading, setIsLoading] = useState(true);
    const [posts, setPosts] = useState([]);
    const [mostRead, setMostRead] = useState([]);
    const [mostComment, setMostComment] = useState([]);

    const [postsPage, setPostsPage] = useState(1);
    const [mostReadPage, setMostReadPage] = useState(1);
    const [mostCommentPage, setMostCommentPage] = useState(1);

    const getLatestNews = async (n) => {
        const allposts = isLogin ? await getMySub(n) : await getAll1Posts('all', n);
        setPosts([...posts, ...allposts.data]);
    }
    const getMostRead = async (n) => {
        const moRead = await getAll1Posts('mostRead', n);
        setMostRead([...mostRead, ...moRead.data]);
    }

    const getMostComment = async (n) => {
        const moComm = await getAll1Posts('mostComment', n)
        setMostComment([...mostComment, ...moComm.data]);
    }

    const fetchAllData = async () => {
        await Promise.all([
            getLatestNews(postsPage),
            getMostComment(mostCommentPage),
            getMostRead(mostReadPage)
        ]);

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
        fetchAllData().then(() => {
            setIsLoading(false);
        })

    }, []);
    return (
        <Tabs tabBarUnderlineStyle={Tabstyles.tabBarUnderlineStyle}    >
            <Tab heading="اخر الاخبار"
                tabStyle={Tabstyles.tabStyle}
                activeTabStyle={Tabstyles.activeTabStyle}
                activeTextStyle={Tabstyles.activeTextStyle}
                textStyle={Tabstyles.textStyle}
            >
                {isLoading ? <ActivityIndicator size="large" color="#0000ff" /> :
                    (<View style={{ flex: 1 }}>
                        <FlatList
                            data={posts}
                            renderItem={renderRow}
                            keyExtractor={(i, k) => k.toString()}
                            onEndReached={() => {
                                setPostsPage(postsPage + 1);
                                // here cause i wont re render the component every time
                                getLatestNews(postsPage + 1);
                            }}
                        />
                    </View>)
                }

            </Tab>
            <Tab heading="الاكثر قراءة"
                tabStyle={Tabstyles.tabStyle}
                activeTabStyle={Tabstyles.activeTabStyle}
                activeTextStyle={Tabstyles.activeTextStyle}
                textStyle={Tabstyles.textStyle}

            >
                {isLoading ? <ActivityIndicator size="large" color="#0000ff" /> :
                    (<View style={{ flex: 1 }}>
                        <FlatList
                            data={mostRead}
                            renderItem={renderRow}
                            keyExtractor={(i, k) => k.toString()}
                            onEndReached={() => {
                                setMostReadPage(mostReadPage + 1);
                                getMostRead(mostReadPage + 1);
                            }}
                        />
                    </View>)
                }


            </Tab>
            <Tab heading="الاكثر تعليق"
                tabStyle={Tabstyles.tabStyle}
                activeTabStyle={Tabstyles.activeTabStyle}
                activeTextStyle={Tabstyles.activeTextStyle}
                textStyle={Tabstyles.textStyle}
            >

                {isLoading ? <ActivityIndicator size="large" color="#0000ff" /> :
                    (<View style={{ flex: 1 }}>
                        <FlatList
                            data={mostComment}
                            renderItem={renderRow}
                            keyExtractor={(i, k) => k.toString()}
                            onEndReached={() => {
                                setMostCommentPage(mostCommentPage + 1);
                                getMostComment(mostCommentPage + 1);
                            }}
                        />
                    </View>)
                }
            </Tab>
        </Tabs >
    )
};
// const styles = StyleSheet.create({
//     text: {
//         fontSize: 20,
//         fontFamily: 'Cairo',
//         fontWeight: 'bold'

//     },
// })
const Tabstyles = StyleSheet.create({
    tabStyle: {
        backgroundColor: 'white',
    },
    activeTabStyle: {
        backgroundColor: 'white'
    },
    activeTextStyle: {
        color: THEME_FONT_COLOR,
        fontFamily: 'Cairo',
    },
    textStyle: {
        color: THEME_FONT_COLOR,
        fontFamily: 'Cairo',
    },
    tabBarUnderlineStyle: {
        backgroundColor: THEME_FONT_COLOR,
    }
});

export default TabsComponent;
