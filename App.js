import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {StyleSheet} from 'react-native';

import { SafeAreaProvider } from 'react-native-safe-area-context';


//Navigation
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import AllNavigationContainer from "./Navigation/AllNavigationContainer"


// Redux
import {Provider} from 'react-redux'
import store from "./Redux/Store/store";


export default function App() {

    return (
        <SafeAreaProvider>
            <Provider store={store}>
                <StatusBar style="auto" />
                <NavigationContainer>
                    <AllNavigationContainer/>
                </NavigationContainer>
            </Provider>
        </SafeAreaProvider>
    );
}
