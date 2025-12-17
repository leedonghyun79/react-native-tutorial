import { StyleSheet, Text, View } from 'react-native';

const SearchScreen = () => {
  return (
    <View style={styles.block}>
      <Text>Search</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SearchScreen;
