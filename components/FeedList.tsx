import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import FeedListItem from './FeedListItem';

const FeedList = ({ logs }: any) => {
    return (
        <FlatList
            data={logs}
            renderItem={({ item }) => <FeedListItem log={item} />}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
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