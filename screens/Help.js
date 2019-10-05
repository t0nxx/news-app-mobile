import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const HelpScreen = ({ params, }) => (
    <View style={styles.container}>
        <Text style={styles.title}> Help Me Blue Screen</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'blue',
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color: 'white'
    }
});

export default HelpScreen;
