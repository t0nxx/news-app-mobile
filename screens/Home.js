import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const HomeScreen = ({ params, }) => (
    <View style={styles.container}>
        <Text style={styles.welcome}> Home Screen Green </Text>
    </View>
);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'green',
    },
    welcome: {
        fontSize: 30,
        color: 'white',
        textAlign: 'center',
        margin: 10,
    }
});

export default HomeScreen;
