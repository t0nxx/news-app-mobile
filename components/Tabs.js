import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Tabs, Tab, Container, Content } from 'native-base';
import Home from '../screens/Home';
import Help from '../screens/Help';
import About from '../screens/AboutUs';
import { THEME_BACKGROUND_COLOR, THEME_FONT_COLOR } from '../Colors';
import PostComponent from './Post';
import { ScrollView } from 'react-native-gesture-handler';

const TabsComponent = ({ params, }) => (
    <Tabs tabBarUnderlineStyle={Tabstyles.tabBarUnderlineStyle}    >
        <Tab heading="Latest News"
            tabStyle={Tabstyles.tabStyle}
            activeTabStyle={Tabstyles.activeTabStyle}
            activeTextStyle={Tabstyles.activeTextStyle}
        >
          
                <Container>
                    <Content>
                        <ScrollView style={{ flex: 1 }}>
                            <PostComponent category="sport" title="world cup" />
                            <PostComponent category="news" title="news cup" />
                            <PostComponent category="hhhh" title="hhhh cup" />
                            <PostComponent category="Tech" title="Tech post" />
                            <PostComponent category="Kora" title="kora post" />
                            <PostComponent category="Art" title="Art cup post " />
                            <PostComponent category="sport" title="world cup" />
                            <PostComponent category="news" title="news cup" />
                            <PostComponent category="hhhh" title="hhhh cup" />
                            <PostComponent category="Tech" title="Tech post" />
                            <PostComponent category="Kora" title="kora post" />
                            <PostComponent category="Art" title="Art cup post " />
                        </ScrollView>
                    </Content>
                </Container>

        </Tab>
        <Tab heading="Most Read"
            tabStyle={Tabstyles.tabStyle}
            activeTabStyle={Tabstyles.activeTabStyle}
            activeTextStyle={Tabstyles.activeTextStyle}
        >
            <Text>Most Read</Text>
        </Tab>
        <Tab heading="Most Comment"
            tabStyle={Tabstyles.tabStyle}
            activeTabStyle={Tabstyles.activeTabStyle}
            activeTextStyle={Tabstyles.activeTextStyle}
        >
            <Text>Most Comment</Text>
        </Tab>
    </Tabs>
);
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
