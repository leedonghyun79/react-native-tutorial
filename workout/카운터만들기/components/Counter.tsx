import { Button, StyleSheet, Text, View } from "react-native";

type CounterTypes = {
    count: number;
    onIncrease: () => void;
    onDecrease: () => void;
    onReset: () => void;
}

const Counter = ({ count, onIncrease, onDecrease, onReset }: CounterTypes) => {
    return (
        <View style={styles.wrapper}>
            <View style={styles.counterArea}>
                <Text style={styles.number}>{count}</Text>
            </View>
            <Button color={"black"} title="+1" onPress={onIncrease} />
            <Button color={"black"} title="-1" onPress={onDecrease} />
            <Button color={"black"} title="Reset" onPress={onReset} />
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1
    },
    counterArea: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    number: {
        fontSize: 70,
        fontWeight: "bold",
    }
})

export default Counter;

