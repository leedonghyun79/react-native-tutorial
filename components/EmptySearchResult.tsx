import { StyleSheet, Text, View } from "react-native"

const message = {
  NOT_FOUNT: '검색 결과가 없습니다.',
  EMPTY_KEYWORD: '검색어를 입력해주세요.',
}

export const EmptySearchResult = ({ type }: { type: 'NOT_FOUNT' | 'EMPTY_KEYWORD' }) => {
  return (
    <View style={styles.block}>
      <Text style={styles.text}>{message[type]}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#9e9e9e',
    textAlign: 'center',
  },
})
