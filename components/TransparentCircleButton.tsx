import { MaterialIcons } from "@expo/vector-icons";
import { Platform, Pressable, StyleSheet, View } from "react-native";

type TransparentCircleButtonProps = {
    name: keyof typeof MaterialIcons.glyphMap;
    color: string;
    hasMarginRight?: boolean;
    onPress?: () => void;
}

const TransparentCircleButton = ({ name, color, hasMarginRight, onPress }: TransparentCircleButtonProps) => {
    return (
        <View
            style={[styles.iconButtonWrapper, hasMarginRight && styles.rightMargin]}
        >
            <Pressable
                style={({ pressed }) => [
                    styles.iconButton,
                    Platform.OS === 'ios' &&
                    pressed && {
                        backgroundColor: '#efefef'
                    }
                ]}
                onPress={onPress}
                android_ripple={{ color: '#ededed' }}
            >
                <MaterialIcons name={name} size={24} color={color} />
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    iconButtonWrapper: {
        width: 32,
        height: 32,
        borderRadius: 16,
        overflow: 'hidden',
    },
    iconButton: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 32,
        height: 32,
        borderRadius: 16,
    },
    rightMargin: {
        marginRight: 8,
    }
})

export default TransparentCircleButton