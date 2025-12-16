import { JSX, useState } from "react";
import { Image, Keyboard, Platform, StyleSheet, TextInput, TouchableNativeFeedback, TouchableOpacity, View } from "react-native";

type AddTodoProps = {
    onInsert: (text: string) => void;
}

const platformSelect = (button: JSX.Element, onPress: () => void) => Platform.select({
    ios: <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
        {button}
    </TouchableOpacity>,
    android: (
        <View style={styles.circleWrapper}>
            <TouchableNativeFeedback onPress={onPress}>
                {button}
            </TouchableNativeFeedback>
        </View>
    )
})

const AddTodo = ({ onInsert }: AddTodoProps) => {
    const [text, setText] = useState("");

    const button = (
        <View style={styles.buttonStyle}>
            <Image source={require('@/assets/icons/add_white/add_white.png')} />
        </View>
    )

    const onPress = () => {
        onInsert(text);
        setText("");
        Keyboard.dismiss();
    }

    return (
        <View style={styles.block}>
            <TextInput
                placeholder="할일을 입력해주세요."
                style={styles.input}
                value={text}
                onChangeText={setText}
                onSubmitEditing={onPress}
                returnKeyType="done"
            />
            {platformSelect(button, onPress)}
        </View>
    )
}

const styles = StyleSheet.create({
    block: {
        height: 64,
        paddingHorizontal: 16,
        borderColor: '#bdbdbd',
        borderWidth: 1,
        borderBottomWidth: 1,
        alignItems: 'center',
        flexDirection: 'row',
    },
    input: {
        flex: 1,
        fontSize: 16,
        paddingVertical: 8
    },
    buttonStyle: {
        width: 48,
        height: 48,
        backgroundColor: '#26a69a',
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    circleWrapper: {
        overflow: 'hidden',
        borderRadius: 24,
    }

})

export default AddTodo;
