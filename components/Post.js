import React from 'react';
import { Image } from 'react-native';
import { Container, Content, Card, CardItem, Text, Left, Body, Badge } from 'native-base';
const PostComponent = ({ id, title, category }) => (

    <Card>
        <CardItem>
            <Left>
                <Badge>
                    <Text>{category}</Text>
                </Badge>
            </Left>
        </CardItem>
        <CardItem cardBody>
            <Image source={{ uri: 'https://images.unsplash.com/photo-1570192164067-6f2d28702ae8?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80' }} style={{ height: 250, width: null, flex: 1 }} />
        </CardItem>
        <CardItem>
            <Body>
                <Text>{title}</Text>
            </Body>
        </CardItem>
    </Card>

);
export default PostComponent;
