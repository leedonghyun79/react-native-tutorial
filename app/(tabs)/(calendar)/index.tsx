import { StyleSheet, View } from 'react-native';

export default function CalendarScreen() {
  return (
    <View style={styles.block} />
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
