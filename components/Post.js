import React from 'react';
import { Image, ImageBackground, StyleSheet } from 'react-native';
import { Container, Content, Card, CardItem, Left, Body, Badge, H1, View, Text, H2 } from 'native-base';

const PostComponent = ({ id, title, category, backgroundImage, source, }) => {
    return (
        <Card>
            <CardItem cardBody style={{ margin: 5 }} >
                <ImageBackground source={{ uri: backgroundImage }} style={{ height: 200, width: null, flex: 1, opacity: 1.5 }} >
                    <View style={{ left: 4, top: 4 }}>
                        <Badge >
                            <Text>{category}</Text>
                        </Badge>
                    </View>
                    <View style={{ right: 8, bottom: 4, position: 'absolute' }}>
                        <H1 style={styles.text}>{title}</H1>
                    </View>
                </ImageBackground>
            </CardItem>
        </Card>
    )
};

const styles = StyleSheet.create({
    text: {
        fontFamily: 'Cairo',
        color: 'white',
        fontWeight: 'bold'
    }
})
export default PostComponent;
