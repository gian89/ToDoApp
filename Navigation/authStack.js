import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import Login from "../Screen/Auth/Login";
import SignUp from "../Screen/Auth/SignUp";

const authStackNavigator = createStackNavigator();

export default function authStack () {
    return(
        <authStackNavigator.Navigator screenOptions={{
            headerShown: true,
        }}>
            <authStackNavigator.Screen name="Login" component={Login} />
            <authStackNavigator.Screen name="SignUp" component={SignUp} />
        </authStackNavigator.Navigator>
    )
}
