import React from 'react';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ToDo from "../Screen/Task/ToDo";
import Done from "../Screen/Task/Done";



const taskTabTabNavigator = createMaterialTopTabNavigator();

export default function taskTab () {
    return(
        <taskTabTabNavigator.Navigator
            tabBarOptions={{
                labelStyle: {
                    textAlign: 'center',
                    fontSize: 15,
                    marginTop: 20
                }
            }}
        >
            <taskTabTabNavigator.Screen name="ToDo" component={ToDo}/>
            <taskTabTabNavigator.Screen name="Done" component={Done}/>
        </taskTabTabNavigator.Navigator>
    )
}
