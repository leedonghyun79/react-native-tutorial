import WriteEditor from '@/components/WriteEditor';
import WriteHeader from '@/components/WriteHeader';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const WriteScreen = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  return (
    <SafeAreaView style={styles.block}>
      <KeyboardAvoidingView
        style={styles.avoidingView}
        // behavior="padding"
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <WriteHeader />
        <WriteEditor />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    backgroundColor: '#fff',
  },
  avoidingView: {
    flex: 1,
  },
});

export default WriteScreen;
