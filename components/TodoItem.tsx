import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type TodoItemType = {
    id: number;
    text: string;
    done: boolean;
    onToggle: (id: number) => void;
    onRemove: (id: number) => void;
}

const TodoItem = ({ id, text, done, onToggle, onRemove }: TodoItemType) => {

    const alert = () => {
        Alert.alert('삭제', '정말로 삭제하시겠어요?', [
            {
                text: '취소', onPress: () => { }, style: 'cancel'
            },
            {
                text: '삭제', onPress: () => onRemove(id), style: 'destructive'
            }
        ], {
            cancelable: true
        })
    }

    return (
        <View style={styles.item}>
            <TouchableOpacity onPress={() => onToggle(id)}>
                <View style={[styles.circle, done && styles.filled]}>
                    {done && <Image source={require('../assets/icons/check_white/check_white.png')} />}
                </View>
            </TouchableOpacity>
            <Text style={[styles.text, done && styles.lineThrough]}>{text}</Text>
            {
                done ? (
                    <TouchableOpacity onPress={alert}>
                        <Ionicons name="trash" size={32} color="#d52424" />
                    </TouchableOpacity>
                ) : (
                    <View style={styles.removePlaceholder} />
                )
            }
        </View>
    );
};

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        padding: 16,
        alignItems: 'center',
    },
    circle: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#26a69a',
        marginRight: 16,

    },
    text: {
        flex: 1,
        fontSize: 16,
        color: '#212121',
    },
    filled: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#26a69a',
    },
    removePlaceholder: {
        width: 32,
        height: 32,
    },
    lineThrough: {
        color: '#9e9e9e',
        textDecorationLine: 'line-through',
    },
});


export default TodoItem;