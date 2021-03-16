import React, {useState, useEffect} from 'react';

import {Text, View, StyleSheet, TextInput, Pressable, Alert} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {LinearGradient} from 'expo-linear-gradient';
import Spinner from 'react-native-loading-spinner-overlay';

import {Foundation} from '@expo/vector-icons';
import {Feather} from '@expo/vector-icons';
import {Ionicons} from '@expo/vector-icons';

import moment from 'moment';

import {addTaskApp, updateTaskApp} from '../src/appFunction'



const TaskCard = (props) => {
    const [date, setDate] = useState();
    const [show, setShow] = useState(false);
    const [title, setTitle,] = useState("");
    const [showSpinner, setShowSpinner] = useState(false);

    useEffect(() => {
        if (props.data) {
            setTitle(props.data.text)
            setDate(new Date(props.data.date));
        } else {
            setDate("new")
        }
    }, [])

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const openCalendar = () => {
        if (!props.data) {
            setShow(true)
        }
    }

    const pressedIcon = () => {
        props.data ? (
            props.data.status === "toDo" ? setTaskDone() :
                console.log("done")
        ) : addTask()
    }

    const addTask = () => {
        if (date !== "new" && title !== "") {
            let body = {
                "date": date,
                "text": title,
                "status": "toDo"
            }
            setShowSpinner(true)
            addTaskApp(body)
                .then(() => {
                    setShowSpinner(false)
                    props.navigation.navigate('ToDo');
                }).catch((error) => {
                if (error.status === "Sessione scaduta") {
                    return;
                }
                Alert.alert(
                    "Errore",
                    "L'operazione non è andata a buon fine",
                    [
                        {text: "OK", onPress: () => console.log("OK Pressed")}
                    ],
                    {cancelable: true}
                );
            })
        } else {
            Alert.alert(
                "Errore",
                "Descrizione Task e Data Obbligatori",
                [
                    {text: "OK", onPress: () => console.log("OK Pressed")}
                ],
                {cancelable: true}
            );
        }
    }

    const setTaskDone = () => {
        setShowSpinner(true)
        let body = {
            "date": props.data.date,
            "text": props.data.text,
            "status": "done",
            "id": props.data.id
        }
        updateTaskApp(body)
            .then(() => {
                setShowSpinner(false)
            })
            .catch((error) => {
                setShowSpinner(false)
                if (error.status === "Sessione scaduta") {
                    return;
                }
                Alert.alert(
                    "Errore",
                    "L'operazione non è andata a buon fine",
                    [
                        {text: "OK", onPress: () => console.log("OK Pressed")}
                    ],
                    {cancelable: true}
                );
            })
    }

    return (
        <LinearGradient
            colors={['#5374E7', '#77B9F5']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={styles.containerTaskCard}
        >
            <Spinner
                visible={showSpinner}
                textContent={'Loading...'}
                textStyle={styles.spinnerTextStyle}
            />
            <View
                style={{
                    flex: 3,
                }}
            >
                <TextInput
                    placeholder="Descrizione Task"
                    numberOfLines={1}
                    ellipsizeMode={'tail'}
                    editable={!props.data}
                    onChangeText={text => setTitle(text)}
                    style={{
                        color: '#FFFFFF',
                        fontSize: 30
                    }}
                >{title}</TextInput>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}
                >
                    <View
                        style={{
                            width: 100,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                        <Text
                            style={{
                                color: 'black',
                                fontSize: 15
                            }}
                        >
                            {date === "new" ? "--/--/----" : moment(date)
                                .utcOffset('+05:30')
                                .format('DD-MM-YYYY')}
                        </Text>
                    </View>
                    <Foundation name="calendar" size={44} color="black" onPress={() => openCalendar()}/>
                    {show && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={date === "new" ? new Date() : date}
                            mode={'date'}
                            is24Hour={true}
                            display="default"
                            onChange={onChange}
                        />
                    )}
                </View>
            </View>
            <View
                style={styles.iconView}
            >
                <Pressable
                    style={styles.iconPressable}
                    onPress={() => pressedIcon()}
                >
                    {
                        props.data ? (
                            props.data.status === "toDo" ? <Feather name="circle" size={30} color="black"/> :
                                <Feather name="check-circle" size={30} color="black"/>
                        ) : <Ionicons name="add-circle-outline" size={30} color="black"/>
                    }
                </Pressable>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    containerTaskCard: {
        height: 140,
        width: 340,
        borderRadius: 25,
        alignItems: 'center',
        flexDirection: 'row',
    },
    spinnerTextStyle: {
        color: '#FFF'
    },
    iconPressable: {
        height: 40,
        width: 40
    },
    iconView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default TaskCard;
