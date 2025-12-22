import { router } from "expo-router";
import { StyleSheet, View } from "react-native";
import TransparentCircleButton from "./TransparentCircleButton";

type WriteHeaderProps = {
    onSave: () => void;
    onAskRemove: () => void;
    isEditing: boolean;
}

const WriteHeader = ({ onSave, onAskRemove, isEditing }: WriteHeaderProps) => {
    const onGoBack = () => {
        router.back()
    }

    return (
        <View style={styles.block}>
            <View>
                <TransparentCircleButton
                    name="arrow-back"
                    color="#424242"
                    onPress={onGoBack}
                />
            </View>
            <View style={styles.buttons}>
                {
                    isEditing && (
                        <TransparentCircleButton
                            name="delete-forever"
                            color="#ef5350"
                            hasMarginRight
                            onPress={onAskRemove}
                        />
                    )
                }
                <TransparentCircleButton
                    name="check"
                    color="#009688"
                    onPress={onSave}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    block: {
        height: 48,
        paddingHorizontal: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    buttons: {
        flexDirection: 'row',
        alignItems: 'center',
    }
})

export default WriteHeader