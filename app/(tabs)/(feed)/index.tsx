import FloatingWriteButton from '@/components/FloatingWriteButton';
import { StyleSheet, View } from 'react-native';

const FeedScreen = () => {
  return (
    <View style={styles.block}>
      <FloatingWriteButton />
    </View>
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

export default FeedScreen;