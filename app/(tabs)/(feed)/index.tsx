import FeedList from '@/components/FeedList';
import FloatingWriteButton from '@/components/FloatingWriteButton';
import LogContext from '@/context/LogContext';
import { useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';

const FeedScreen = () => {
  const { logs } = useContext(LogContext);
  const [hidden, setHidden] = useState(false);
  const onScrolledToBottom = (isBottom: boolean) => {
    if (hidden !== isBottom) {
      setHidden(isBottom);
    }
  }

  return (
    <View style={styles.block}>
      <FeedList logs={logs} onScrolledToBottom={onScrolledToBottom} />
      <FloatingWriteButton hidden={hidden} />
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