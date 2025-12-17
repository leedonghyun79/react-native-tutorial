import LogContext from '@/context/LogContext';
import { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function CalendarScreen() {
  const { text } = useContext(LogContext)

  return (
    <View style={styles.block}>
      <Text style={styles.text}>text: {text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
  }
});
