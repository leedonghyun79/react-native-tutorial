import { FlatList, StyleSheet, View } from "react-native";
import TodoItem from "./TodoItem";

type TodoProps = {
    id: number;
    text: string;
    done: boolean;
};

type TodoListProps = {
    todos: TodoProps[];
    onToggle: (id: number) => void;
    onRemove: (id: number) => void;
}

const TodoList = ({ todos, onToggle, onRemove }: TodoListProps) => {
    return (
        <FlatList
            ItemSeparatorComponent={() => <View style={styles.separator}></View>}
            style={styles.list}
            data={todos}
            renderItem={({ item }) => (
                <TodoItem id={item.id} text={item.text} done={item.done} onToggle={onToggle} onRemove={onRemove} />
            )}
            keyExtractor={(item => item.id.toString())}
        />
    );
};

export default TodoList;

const styles = StyleSheet.create({
    list: {
        flex: 1,
    },
    separator: {
        height: 1,
        backgroundColor: '#e0e0e0',
    },
});