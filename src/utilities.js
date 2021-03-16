import {Alert} from "react-native";

export const alertMessage = (title, message, buttons = [{
                                 text: "OK", onPress: () => {
                                 }
                             }], options = {cancelable: true}
) => {
    return (
        Alert.alert(
            title,
            message,
            buttons,
            options
        )
    )
}
