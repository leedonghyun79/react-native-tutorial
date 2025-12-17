import FloatingWriteButton from '@/components/FloatingWriteButton';
import LogContext from '@/context/LogContext';
import { useContext } from 'react';
import { StyleSheet, View } from 'react-native';

const FeedScreen = () => {
  const { logs } = useContext(LogContext);
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