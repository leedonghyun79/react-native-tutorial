import AddTodo from "@/components/AddTodo";
import DateHead from "@/components/DateHead";
import Empty from "@/components/Empty";
import TodoList from "@/components/TodoLIst";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { KeyboardAvoidingView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
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

  // 불러오기 
  // 불러오기 useEffect는 항상 저장하는 useEffect보다 상위에 위치해야한다.
  // 만약 불러오기 useEffect가 저장하는 useEffect보다 아래에 위치한다면,
  // 저장하는 useEffect가 실행되기 전에 불러오기 useEffect가 실행되어
  // todos가 초기값으로 설정되어 버린다. 즉 초기값만 불러오게 됨 
  useEffect(() => {
    async function loadTodo() {
      try {
        const rawTodos = await AsyncStorage.getItem('todos');
        console.log("rawTodos: ", rawTodos)
        const savedTodos = JSON.parse(rawTodos || '[]');
        setTodos(savedTodos);
      }
      catch (error) {
        console.log("불러오는데 실패했습니다.")
      }
    }
    loadTodo()
  }, [])

  // 저장
  useEffect(() => {
    async function saveTodo() {
      try {
        await AsyncStorage.setItem('todos', JSON.stringify(todos));
      }
      catch (error) {
        console.log("저장하는데 실패했습니다.");
      }
    }
    saveTodo();
  }, [todos])

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
    <SafeAreaView edges={['top']} style={styles.block}>
      <KeyboardAvoidingView behavior="padding" style={styles.avoid}>
        <DateHead today={today} />
        {todos.length === 0 ? <Empty /> : <TodoList todos={todos} onToggle={onToggle} onRemove={onRemove} />}
        <AddTodo onInsert={onInsert} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  block: {
    flex: 1,
    backgroundColor: 'white',
  },
  avoid: {
    flex: 1,
  }
});
