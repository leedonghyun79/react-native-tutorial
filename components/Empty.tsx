import { Image, StyleSheet, View } from "react-native";

const Empty = () => {
    return (
        <View style={styles.block}>
            <Image source={require('@/assets/images/young_and_happy.png')} style={styles.image} />
        </View>
    )
}

const styles = StyleSheet.create({
    block: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    description: {
        fontSize: 24,
        color: '#9e9e9e',
    },
    image: {
        width: 240,
        height: 240,
    }
})

export default Empty;       