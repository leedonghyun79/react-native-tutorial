import SearchHeader from '@/components/SearchHeader';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Tabs } from 'expo-router';

const TabLayout = () => {

  return (
    <Tabs
      initialRouteName="(feed)/index"
      screenOptions={{
        tabBarActiveTintColor: '#009688',
        headerShown: true,
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="(feed)/index"
        options={{
          title: 'Feed',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="view-stream" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="(calendar)/calendar"
        options={{
          title: 'Calendar',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="event" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="(search)/search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="search" size={size} color={color} />
          ),
          headerTitle: () => <SearchHeader />
        }}
      />
    </Tabs>
  );
}

export default TabLayout;
