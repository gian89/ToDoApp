import React, {useState, useEffect} from 'react';
import {Alert} from "react-native";

import {createStackNavigator} from '@react-navigation/stack';

import {useSelector} from "react-redux";

import {onStartUp} from "../src/appFunction";

import authStack from "./authStack";
import SplashScreen from "../Screen/SplashScreen";
import taskStack from "./taskStack";

const allNavigationStackNavigator = createStackNavigator();

export default function AllNavigationContainer() {
    const [isLoading, setIsLoading] = useState(true);
    const auth = useSelector(state => state.auth);

    useEffect(() => {
        console.log("initial UseEffect");
        onStartUp()
            .then(() => setIsLoading(false))
            .catch(err => {
                setIsLoading(false);
                console.log(err)
            });
    }, []);

    return (
        <allNavigationStackNavigator.Navigator screenOptions={{
            headerShown: false,
        }}>
            {isLoading ? (<allNavigationStackNavigator.Screen name="SplashScreen" component={SplashScreen}/>)
                : auth.logged ? (
                        <allNavigationStackNavigator.Screen name="taskStack" component={taskStack}/>)
                    :
                    (<allNavigationStackNavigator.Screen name="authStack" component={authStack}/>)}

        </allNavigationStackNavigator.Navigator>
    )
}

