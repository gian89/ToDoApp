import React, { useState } from "react";
import {StyleSheet, Text, View, Image, TextInput, Pressable,Alert} from "react-native";

import Spinner from 'react-native-loading-spinner-overlay'

import {appSignup} from '../../src/appFunction'
;
import {alertMessage} from "../../src/utilities";

const SignUp = ({navigation}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showSpinner, setShowSpinner] = useState(false);


    const signup = () => {
        if (email === "" || password === "") {
            Alert.alert(
                "Errore",
                "Email e Password obbligatori ",
                [
                    {text: "OK", onPress: () => console.log("OK Pressed")}
                ],
                {cancelable: true}
            );
            return;
        }
        setShowSpinner(true);
        let body = {
            "username": email,
            "password": password,
        }
        appSignup(body)
            .then(() => {
                setShowSpinner(false);
                Alert.alert(
                    "Registrazione Riuscita",
                    "Da adesso puoi utilizzare l'app con le tue credenziali",
                    [
                        {text: "OK", onPress: () => navigation.navigate('Login')}
                    ],
                    {cancelable: false}
                );
            })
            .catch((error) => {
                if (error.status === 409) {
                    alertMessage(`Errore ${error.status}`, error.message.message);
                }
                setShowSpinner(false);
            })
    };

    return (
        <View style={styles.container}>
            <Spinner
                visible={showSpinner}
                textContent={'Loading...'}
                textStyle={styles.spinnerTextStyle}
            />
            <Image style={styles.image} source={require("../../assets/a2y-logo.png")} />

            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Email."
                    placeholderTextColor="#003f5c"
                    onChangeText={(email) => setEmail(email)}
                />
            </View>

            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Password."
                    placeholderTextColor="#003f5c"
                    secureTextEntry={true}
                    onChangeText={(password) => setPassword(password)}
                />
            </View>
            <Pressable style={styles.signupButton} onPress={() => signup()}>
                <Text>SIGNUP</Text>
            </Pressable>
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

    inputView: {
        backgroundColor: "#77B9F5",
        borderRadius: 30,
        width: "70%",
        height: 45,
        marginBottom: 20,

        alignItems: "center",
    },

    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 20,
    },

    newUserButton: {
        height: 30,
        marginBottom: 30,
    },

    signupButton: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        backgroundColor: "#5374E7",
    },
    spinnerTextStyle: {
        color: '#FFF'
    },
});

export default SignUp;
