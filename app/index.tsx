import AddTodo from "@/components/AddTodo";
import DateHead from "@/components/DateHead";
import Empty from "@/components/Empty";
import { StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const App = () => {
  const today = new Date().toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <>
      <SafeAreaProvider>
        <SafeAreaView edges={['bottom']} style={styles.block}>
          <DateHead today={today} />
          <Empty />
          <AddTodo />
        </SafeAreaView>

      </SafeAreaProvider>
    </>
  );
}


const styles = StyleSheet.create({
  block: {
    flex: 1,
  }
});

export default App;