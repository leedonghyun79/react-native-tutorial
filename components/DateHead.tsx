import { StatusBar, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const DateHead = ({ today }: { today: string }) => {
    const { top } = useSafeAreaInsets();

    return (
        <>
            {/* ios 전용 상태바 영역 (노치/다이나믹 아일랜드 뒤 배경) */}
            <View style={[styles.statusBarPlaceHolder, { height: top }]} />

            {/* 상태바 스타일 설정 */}
            <StatusBar barStyle="light-content" backgroundColor="#26a69a" />

            {/* 실제 콘텐츠 영역 */}
            <View style={styles.block}>
                <Text style={styles.dateText}>{today}</Text>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    statusBarPlaceHolder: {
        backgroundColor: "#26a69a",
    },
    block: {
        padding: 16,
        backgroundColor: "#26a69a",
    },
    dateText: {
        fontSize: 24,
        color: '#fff'
    }
})

export default DateHead;

