import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Tabs, Tab, Container, Content } from 'native-base';
import { THEME_BACKGROUND_COLOR, THEME_FONT_COLOR } from '../Colors';
import PostComponent from './Post';
import { ScrollView } from 'react-native-gesture-handler';
import { getAll1Posts } from '../services/posts';

const TabsComponent = ({ params, }) => {

    const [posts, setPosts] = useState([]);
    const [mostRead, setMostRead] = useState([]);
    const [mostComment, setMostComment] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const [allposts, moRead, moComm] = await Promise.all([
                getAll1Posts(),
                getAll1Posts('mostRead'),
                getAll1Posts('mostComment')
            ]);
            setPosts([...allposts.data]);
            setMostRead([...moRead.data]);
            setMostComment([...moComm.data]);
        }
        fetchData();
    }, []);
    return (
        <Tabs tabBarUnderlineStyle={Tabstyles.tabBarUnderlineStyle}    >
            <Tab heading="Latest News"
                tabStyle={Tabstyles.tabStyle}
                activeTabStyle={Tabstyles.activeTabStyle}
                activeTextStyle={Tabstyles.activeTextStyle}
            >
                <Container>
                    <Content>
                        <ScrollView style={{ flex: 1 }}>
                            {posts.map(p => (
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
            <Tab heading="Most Read"
                tabStyle={Tabstyles.tabStyle}
                activeTabStyle={Tabstyles.activeTabStyle}
                activeTextStyle={Tabstyles.activeTextStyle}
            >
                <Container>
                    <Content>
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
            <Tab heading="Most Comment"
                tabStyle={Tabstyles.tabStyle}
                activeTabStyle={Tabstyles.activeTabStyle}
                activeTextStyle={Tabstyles.activeTextStyle}
            >
                <Container>
                    <Content>
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
        fontWeight: 'bold'
    },
    textStyle: {
        color: THEME_FONT_COLOR
    },
    tabBarUnderlineStyle: {
        backgroundColor: THEME_FONT_COLOR,
    }
};

export default TabsComponent;
