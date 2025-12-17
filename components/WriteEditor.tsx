import { useRef } from "react";
import { StyleSheet, TextInput, View } from "react-native";

type WriteEditorProps = {
    title?: string;
    body?: string;
    onChageTitle?: (title: string) => void;
    onChageBody?: (body: string) => void;
}

const WriteEditor = ({ title, body, onChageTitle, onChageBody }: WriteEditorProps) => {
    const bodyRef = useRef<TextInput>(null);
    return (
        <View style={styles.block}>
            <TextInput
                placeholder="제목을 입력해주세요"
                style={styles.titleInput}
                returnKeyType="next"
                onChangeText={onChageTitle}
                value={title}
                onSubmitEditing={() => bodyRef.current?.focus()}

            />
            <TextInput
                placeholder="당신의 오늘을 기록해보세요!"
                style={styles.bodyInput}
                multiline
                textAlignVertical="top"
                onChangeText={onChageBody}
                value={body}
                ref={bodyRef}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    block: {
        flex: 1,
        padding: 16
    },
    titleInput: {
        paddingHorizontal: 0,
        fontSize: 18,
        height: 48,
        marginBottom: 16,
        color: '#263238',
        fontWeight: 'bold'
    },
    bodyInput: {
        flex: 1,
        fontSize: 16,
        paddingHorizontal: 0,
        color: '#263238'
    },
})

export default WriteEditor;
