import Counter from "@/components/Counter";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const App = () => {
  const [count, setCount] = useState(0)

  const onIncrease = () => {
    setCount(count + 1)
  }

  const onDecrease = () => {
    setCount(count > 0 ? count - 1 : 0);
  }

  const onReset = () => {
    setCount(0);
  }

  return (
    <SafeAreaView style={styles.full}>
      <Counter count={count} onIncrease={onIncrease} onDecrease={onDecrease} onReset={onReset} />
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  full: {
    flex: 1,
    backgroundColor: "cyan",
  }
});

export default App;