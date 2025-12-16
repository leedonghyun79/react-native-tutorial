import AddTodo from "@/components/AddTodo";
import DateHead from "@/components/DateHead";
import Empty from "@/components/Empty";
import TodoList from "@/components/TodoLIst";
import { useState } from "react";
import { KeyboardAvoidingView, StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const App = () => {
  const today = new Date().toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const [todos, setTodos] = useState([
    {
      id: 1,
      text: "작업환경 설정",
      done: true,
    },
    {
      id: 2,
      text: "리액트 네이티브 기초 공부",
      done: false,
    },
    {
      id: 3,
      text: "투두리스트 만들어보기",
      done: false,
    },
  ]);

  const onInsert = (text: string) => {
    const nextId = todos.length > 0 ?
      Math.max(...todos.map(todo => todo.id)) + 1 : 1 //등록된 요소 idx중 가장 큰 idx 구하기
    const todo = {
      id: nextId,
      text,
      done: false,
    }
    setTodos(todos.concat(todo))
  }

  const onToggle = (id: number) => {
    const updateTodos = todos.map(todo => todo.id === id ? { ...todo, done: !todo.done } : todo)
    setTodos(updateTodos);
  }

  const onRemove = (id: number) => {
    const deleteTodos = todos.filter(todo => todo.id !== id);
    setTodos(deleteTodos);
  }

  return (
    <>
      <SafeAreaProvider>
        <SafeAreaView edges={['bottom']} style={styles.block}>
          <KeyboardAvoidingView behavior="padding" style={styles.avoid}>
            <DateHead today={today} />
            {todos.length === 0 ? <Empty /> : <TodoList todos={todos} onToggle={onToggle} onRemove={onRemove} />}
            <AddTodo onInsert={onInsert} />
          </KeyboardAvoidingView>
        </SafeAreaView>

      </SafeAreaProvider>
    </>
  );
}


const styles = StyleSheet.create({
  block: {
    flex: 1,
  },
  avoid: {
    flex: 1,
  }
});

export default App;