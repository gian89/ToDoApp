import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import taskTab from "./taskTab";
import AddTask from "../Screen/Task/AddTask";

const tabStackNavigator = createStackNavigator();

export default function taskStack () {
    return (
        <tabStackNavigator.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <tabStackNavigator.Screen name={"taskTab"} component={taskTab}/>
            <tabStackNavigator.Screen name={"AddTask"} component={AddTask}
                                      options={({ route }) => ({
                                          title: "Add Task",
                                          headerShown: true
                                      })}
            />
        </tabStackNavigator.Navigator>
    )
}
