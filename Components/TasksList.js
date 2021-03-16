import React from 'react';
import {FlatList} from 'react-native';
import {Divider} from 'react-native-elements';

import TaskCard from "./TaskCard";

export default function TasksList(props) {
    return (
        <FlatList
            data={props.data}
            renderItem={({item}) => {
                return (
                    <TaskCard
                        data={item}
                    />
                )
            }}
            keyExtractor={(item) => String(item.id)}
            showsHorizontalScrollIndicator={true}
            ItemSeparatorComponent={() => (<Divider style={{height: 6, backgroundColor: 'rgba(0, 0, 0, 0.0)'}}/>)}/>
    );
}
