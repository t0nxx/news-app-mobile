import React, { useState, useEffect, useContext } from 'react';
import { Container, Content, H1, Body, ListItem, CheckBox, Right, Text, Left, Toast } from 'native-base';
import HeaderComponent from '../components/Header';
import { getCategories } from '../services/drawer';
import { AuthContext } from '../services/auth';
import { getMyData, subscribeToCategory, UnsubscribeToCategory } from '../services/user';
import { ActivityIndicator } from 'react-native-paper';




const MySubscribeScreen = ({ params, navigation }) => {
    const [isLogin, setIsLogin] = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);


    const CardItems = ({ name, state, id }) => (
        <ListItem>
            <Left>
                <CheckBox checked={state} color="#B047E5" onPress={() => subscribeOrNot(id, state)} />
            </Left>
            <Text style={{ fontFamily: 'Cairo' }}>{name}</Text>
        </ListItem>
    );


    const fetchData = async () => {
        let res = await getCategories();
        res.data = res.data.map(e => {
            return {
                id: e.id,
                name: e.name,
                isSelected: false
            }
        });

        if (isLogin) {
            let { subscribed } = await getMyData();
            subscribed = subscribed.map(e => e.id);
            let formated = res.data.map(e => {
                if (subscribed.indexOf(e.id) !== -1) {
                    e.isSelected = true;
                }
                return { ...e }
            })
            setData([...formated]);
        } else {
            setData([...res.data]);
        }


    }

    const subscribeOrNot = async (id, state) => {
        if (!isLogin) {
            return navigation.navigate('Login');
        }
        let newdata = data.filter((item) => {
            if (item.id === id) {
                item.isSelected = !item.isSelected;
            }

            return item;
        });
        setData([...newdata]);

        let body = [id];
        try {
            if (state == true) {
                const unsub = await UnsubscribeToCategory(body)
                    .then(() => Toast.show({
                        text: "تم الحذف بنجاح",
                        type: "warning",
                        position: "top",
                        duration: 2000
                    }))



            } else {
                const sub = await subscribeToCategory(body)
                    .then(() => Toast.show({
                        text: "تم الاضافة بنجاح",
                        type: "success",
                        position: "top",
                        duration: 2000
                    }))

            }
        } catch (error) {
            console.log(error);
        }


    }
    useEffect(() => {
        fetchData();
        setIsLoading(false);

    }, [isLoading]);
    return (
        isLoading ? <ActivityIndicator size="large" color="#0000ff" /> :
        <Container>
            <HeaderComponent title="متابعاتي" navigation={navigation} />
            <Content style={{ marginHorizontal: 20, marginTop: 30 }}>
                {data.map(e => (
                    <CardItems key={e.id} name={e.name} state={e.isSelected} id={e.id} />
                ))}
            </Content>
        </Container>
    )
};
export default MySubscribeScreen;
