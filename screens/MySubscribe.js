import React, { useState, useEffect } from 'react';
import { Container, Content, H1, Body, ListItem, CheckBox, Right, Text, Left } from 'native-base';
import HeaderComponent from '../components/Header';
import { getCategories } from '../services/drawer';


const CardItems = ({ name }) => (
    <ListItem>
        <Left>
            <CheckBox checked={true} color="#B047E5" />
        </Left>
        <Text style={{ fontFamily: 'Cairo' }}>{name}</Text>
    </ListItem>
);

const MySubscribeScreen = ({ params, navigation }) => {
    const [data, setData] = useState([]);
    const fetchData = async () => {
        const res = await getCategories();
        setData([...res.data]);
    }
    useEffect(() => {
        fetchData();
    }, []);
    return (
        <Container>
            <HeaderComponent title="متابعاتي" navigation={navigation} />
            <Content style={{ marginHorizontal: 20, marginTop: 30 }}>
                {data.map(e => (
                    <CardItems key={e.id} name={e.name} />
                ))}
            </Content>
        </Container>
    )
};
export default MySubscribeScreen;
