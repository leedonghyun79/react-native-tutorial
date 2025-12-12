import { StyleSheet, Text, View } from "react-native";

const AddTodo = () => {
    return (
        <View style={styles.block}>
            <Text>AddTodo</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    block: {
        height: 64,
        backgroundColor: 'pink',

    }
})

export default AddTodo;
