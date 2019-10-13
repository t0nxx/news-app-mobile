import React from 'react';
import { Image, ImageBackground } from 'react-native';
import { Container, Content, Card, CardItem, Text, Left, Body, Badge, Right, Thumbnail, H1, View } from 'native-base';

const PostComponent = ({ id, title, category, backgroundImage, source, }) => {
    return (
        <Card>
            {/* <CardItem>
                <Right>
                    <Thumbnail source={{ uri: source.backgroundImage }} small />

                    <Text>{source.name}</Text>

                </Right>
            </CardItem> */}
            <CardItem cardBody style={{margin : 5}}>
                <ImageBackground source={{ uri: backgroundImage }} style={{ height: 200, width: null, flex: 1, opacity: 1.5 }} >
                    <View style={{ left: 4, top: 4 }}>
                        <Badge >
                            <Text>{category}</Text>
                        </Badge>
                    </View>
                    <View style={{ right: 8, bottom: 4, position: 'absolute' }}>
                        <H1 style={{ fontWeight: 'bold', color: 'white' }}>{title}</H1>
                    </View>

                </ImageBackground>
            </CardItem>
        </Card>

    )
};
export default PostComponent;
