import { useCallback } from 'react';
import { FlatList, NativeScrollEvent, NativeSyntheticEvent, StyleSheet, View } from 'react-native';
import FeedListItem from './FeedListItem';

const FeedList = ({ logs, onScrolledToBottom, ListHeaderComponent }: any) => {
    const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
        if (!onScrolledToBottom) return;

        const { contentSize, layoutMeasurement, contentOffset } = e.nativeEvent;
        const distanceFromBottom = contentSize.height - layoutMeasurement.height - contentOffset.y

        if (contentSize.height >
            layoutMeasurement.height &&
            distanceFromBottom < 72) {
            onScrolledToBottom(true)
        } else {
            onScrolledToBottom(false)
        }

    }

    const renderItem = useCallback(({ item }: { item: any }) => (
        <FeedListItem log={item} />
    ), [])

    return (
        <FlatList
            data={logs}
            style={styles.block}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            onEndReachedThreshold={0.85}
            onScroll={onScroll}
            ListHeaderComponent={ListHeaderComponent}
        />
    );
};

const styles = StyleSheet.create({
    block: {
        flex: 1
    },
    separator: {
        backgroundColor: '#e0e0e0',
        height: 1,
        width: '100%'
    },
});

export default FeedList; 