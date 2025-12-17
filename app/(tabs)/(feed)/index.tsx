import LogContext from '@/context/LogContext';
import { useContext } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

export default function FeedScreen() {
  const { text, setText } = useContext(LogContext);
  return (
    <View style={styles.block}>
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="텍스트를 입력하세요"
        style={styles.input}
      />
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
