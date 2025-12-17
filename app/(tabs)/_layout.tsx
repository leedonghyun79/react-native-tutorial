import { LogContextProvider } from '@/context/LogContext';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Tabs } from 'expo-router';

const TabLayout = () => {
  return (
    <LogContextProvider>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#009688',
          headerShown: false,
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
          name="(calendar)/index"
          options={{
            title: 'Calendar',
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="event" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="(search)/index"
          options={{
            title: 'Search',
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="search" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="write"
          options={{
            href: null,
            title: 'Write',
          }}
        />
      </Tabs>
    </LogContextProvider>
  );
}

export default TabLayout;
