import { EmptySearchResult } from '@/components/EmptySearchResult';
import FeedList from '@/components/FeedList';
import LogContext from '@/context/LogContext';
import SearchContext from '@/context/SearchContext';
import { useContext } from 'react';
import { StyleSheet, View } from 'react-native';

const SearchScreen = () => {
  const { keyword } = useContext(SearchContext);
  const { logs } = useContext(LogContext);


  //검색어 필터링
  const filtered = keyword === '' ? [] : logs.filter((log =>
    [log.title, log.body].some((text) => text.includes(keyword))
  ))

  if (keyword === '') {
    return (
      <EmptySearchResult type="EMPTY_KEYWORD" />
    )
  }

  if (filtered.length == 0) {
    return (
      <EmptySearchResult type="NOT_FOUNT" />
    )
  }

  return (
    <View style={styles.block}>
      <FeedList logs={filtered} />
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
  },
});

export default SearchScreen;
