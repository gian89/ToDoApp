import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet} from 'react-native';

import {appLogout} from '../../src/appFunction'

import {useSelector} from "react-redux";
import TasksList from "../../Components/TasksList";
import {AntDesign} from "@expo/vector-icons";

const Done = () => {
    const tasks = useSelector(state => state.tasks);

    const [toDoTasks, setToDoTasks,] = useState([]);

    useEffect(() => {
        let filteredTasks = tasks.filter(item => item.status === "done");
        console.log("Filtered tasks: " + JSON.stringify(filteredTasks));
        setToDoTasks(filteredTasks);
    }, [tasks]);


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Done!</Text>
            <TasksList
                data={toDoTasks}
            />
            <AntDesign name="logout" size={50} color="black"
                       style={styles.logoutIcon}
                       onPress={(() => appLogout())}
            />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoutIcon: {
        position: 'absolute',
        top: 10,
        right: 10
    },
    title: {
        color: 'black',
        fontSize: 50
    }
});

export default Done;
