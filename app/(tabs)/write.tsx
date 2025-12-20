import WriteEditor from '@/components/WriteEditor';
import WriteHeader from '@/components/WriteHeader';
import LogContext from '@/context/LogContext';
import { router } from 'expo-router';
import { useContext, useState } from 'react';
import { KeyboardAvoidingView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const WriteScreen = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const { onCreate } = useContext(LogContext)
  const onSave = () => {
    onCreate({
      title,
      body,
      //날짜를 문자열로 변환
      date: new Date().toISOString(),
    });
    setTitle('');
    setBody('');
    router.back();
  }

  return (
    <SafeAreaView style={styles.block}>
      <KeyboardAvoidingView
        style={styles.avoidingView}
        behavior="padding"
      >
        <WriteHeader onSave={onSave} />
        <WriteEditor
          title={title}
          body={body}
          onChangeTitle={setTitle}
          onChangeBody={setBody}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
  },
  avoidingView: {
    flex: 1,
  },
});

export default WriteScreen;
