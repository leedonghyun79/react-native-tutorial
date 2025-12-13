import AddTodo from "@/components/AddTodo";
import DateHead from "@/components/DateHead";
import Empty from "@/components/Empty";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const App = () => {
  const today = new Date().toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const [todos, setTodos] = useState([]);

  return (
    <>
      <SafeAreaProvider>
        <SafeAreaView edges={['bottom']} style={styles.block}>
          <KeyboardAvoidingView behavior={Platform.select({
            ios: 'padding',
          })} style={styles.avoid}>
            <DateHead today={today} />
            <Empty />
            <AddTodo />
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