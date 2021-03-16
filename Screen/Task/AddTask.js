import React from 'react';
import {View, StyleSheet} from 'react-native';

import TaskCard from "../../Components/TaskCard";

const AddTask = ({navigation}) => {

    return (
        <View style={styles.container}>
            <TaskCard
                navigation={navigation}
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
});

export default AddTask;
