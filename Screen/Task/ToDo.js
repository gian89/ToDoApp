import React, {useState, useEffect} from 'react';
import {Text, Button, View, StyleSheet} from 'react-native';

import {appLogout} from '../../src/appFunction'

import {useSelector} from "react-redux";
import TasksList from "../../Components/TasksList";

import {AntDesign} from '@expo/vector-icons';

const ToDo = ({navigation}) => {
    const tasks = useSelector(state => state.tasks);

    const [toDoTasks, setToDoTasks,] = useState([]);

    useEffect(() => {
        let filteredTasks = tasks.filter(item => item.status === "toDo");
        setToDoTasks(filteredTasks);
    }, [tasks]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>To Do!</Text>
            <TasksList
                data={toDoTasks}
            />
            <AntDesign name="pluscircle" size={50} color="black"
                       style={styles.addTaskIcon}
                       onPress={(() => navigation.navigate("AddTask"))}
            />
            <AntDesign name="logout" size={50} color="black"
                       style={styles.logoutIcon}
                       onPress={(() => appLogout())}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    addTaskIcon: {
        position: 'absolute',
        bottom: 10,
        right: 10
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

export default ToDo;
