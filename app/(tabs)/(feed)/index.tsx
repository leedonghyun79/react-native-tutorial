import FeedList from '@/components/FeedList';
import FloatingWriteButton from '@/components/FloatingWriteButton';
import LogContext from '@/context/LogContext';
import { useContext } from 'react';
import { StyleSheet, View } from 'react-native';

const FeedScreen = () => {
  const { logs } = useContext(LogContext);
  return (
    <View style={styles.block}>
      <FeedList logs={logs} />
      <FloatingWriteButton />
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    backgroundColor: '#fff',
    flex: 1,
    paddingVertical: 30,
  }
});

export default FeedScreen;