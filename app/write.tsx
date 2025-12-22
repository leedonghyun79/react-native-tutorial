import WriteEditor from '@/components/WriteEditor';
import WriteHeader from '@/components/WriteHeader';
import LogContext from '@/context/LogContext';
import { router, useLocalSearchParams } from 'expo-router';
import { useContext, useState } from 'react';
import { Alert, KeyboardAvoidingView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type WriteParams = {
  id: string;
  title: string;
  body: string;
  date: string;
};

const WriteScreen = () => {
  const log = useLocalSearchParams<WriteParams>()

  // 편집 모드 확인: log.id가 존재하고 빈 문자열이 아닌 경우
  const isEditing = !!(log.id && log.id !== '');

  console.log('WriteScreen - log:', log);
  console.log('WriteScreen - isEditing:', isEditing);

  const [title, setTitle] = useState(log?.title ?? '');
  const [body, setBody] = useState(log?.body ?? '');

  const { onCreate, onModify, onRemove } = useContext(LogContext)
  const onSave = () => {
    if (isEditing) {
      onModify({
        id: log.id,
        date: log.date,
        title,
        body,
      });
      setTitle('');
      setBody('');
      router.back();
    } else {
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
  }

  const onAskRemove = () => {
    console.log('onAskRemove called');
    console.log('log.id:', log?.id);
    Alert.alert(
      '삭제',
      '정말 삭제하시겠어요?',
      [
        {
          text: '취소',
          style: 'cancel',
        },
        {
          text: '삭제',
          onPress: () => {
            console.log('Delete confirmed, removing:', log?.id);
            onRemove(log?.id);
            router.back();
          },
          style: 'destructive',
        },
      ],
      {
        cancelable: true,
      }
    )
  }

  return (
    <SafeAreaView style={styles.block}>
      <KeyboardAvoidingView
        style={styles.avoidingView}
        behavior="padding"
      >
        <WriteHeader onSave={onSave} onAskRemove={onAskRemove} isEditing={isEditing} />
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
