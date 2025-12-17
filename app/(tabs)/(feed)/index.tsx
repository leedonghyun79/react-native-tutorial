import { StyleSheet, View } from 'react-native';

export default function FeedScreen() {
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
  input: {
    padding: 16,
    backgroundColor: '#fff',
  }
});
