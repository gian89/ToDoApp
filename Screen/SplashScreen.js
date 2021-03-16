import React from 'react';
import {Image, View, StyleSheet} from 'react-native';

const SplashScreen = () => {
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={require("../assets/a2y-logo.png")}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    image: {
        marginBottom: 40,
    },
});

export default SplashScreen;
