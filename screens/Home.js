import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, AsyncStorage } from 'react-native';
import { Button, Container, Content, Footer, FooterTab, Text } from 'native-base'
import { LinearGradient } from 'expo-linear-gradient';
import HeaderComponent from '../components/Header';
import FooterComponent from '../components/Footer';
import TabsComponent from '../components/Tabs';
import { checkCurrentUser } from '../services/httpService'
import { AuthContext } from '../services/auth';
import { Notifications } from 'expo';
import { getOnePost } from '../services/posts';
import Branch, { BranchEvent } from 'expo-branch';



const HomeScreen = ({ navigation }) => {
    const [isLogin, setIsLogin] = useContext(AuthContext);
    console.log(isLogin);
    useEffect(() => {
        Notifications.addListener(async (notificaton) => {

            if (notificaton.origin == 'selected') {
                console.log(notificaton);
                const { data } = notificaton;
                const getfromServer = await getOnePost(data.postId);
                console.log(getfromServer);
                navigation.navigate('SinglePost', { data: getfromServer });
            }
        });

        Branch.subscribe(bundle => {
            if (bundle && bundle.params && !bundle.error) {
                // `bundle.params` contains all the info about the link.
                alert(JSON.stringify(bundle.params, null, 4));
                if (bundle.params.$cononical_identifier) {
                    let id = parseInt(bundle.params.$cononical_identifier,10);
                    const getfromServer = await getOnePost(id);
                    console.log(getfromServer);
                    navigation.navigate('SinglePost', { data: getfromServer });
                }

            }
        });
    }, [])
    return (
        <Container>
            <HeaderComponent title="حكايا" navigation={navigation} />
            <TabsComponent navigation={navigation} />
            {isLogin ? <FooterComponent navigation={navigation} /> : null}
        </Container>

    );
}

export default HomeScreen;
