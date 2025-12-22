import SearchContext from '@/context/SearchContext';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useContext } from 'react';
import { Pressable, StyleSheet, TextInput, useWindowDimensions, View } from "react-native";

const SearchHeader = () => {
  const { width } = useWindowDimensions();
  const { keyword, onChangeText } = useContext(SearchContext)

  return (
    <View style={[styles.block, { width: width - 32 }]}>
      <TextInput style={styles.input} placeholder="검색어를 입력하세요" value={keyword} onChangeText={onChangeText} autoFocus />
      <Pressable style={({ pressed }) => [styles.button, pressed && { opacity: 0.5 }]} onPress={() => onChangeText('')}>
        <MaterialIcons name="cancel" size={20} color="black" />
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  block: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
  },
  button: {
    marginLeft: 8
  }

})

export default SearchHeader;