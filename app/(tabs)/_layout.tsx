/**
 * The tab bar, ported from `ContentView.swift`.
 *
 * The Swift original also carried a `sidebar` variant for iPad that its `body`
 * never actually selected ("Disable iPad navigation for now"), so only the tab
 * layout is carried over.
 */
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

import { useThemeColor } from '@/hooks/use-theme-color';

export default function TabLayout() {
  const tint = useThemeColor({}, 'tint');
  const inactive = useThemeColor({}, 'tabIconDefault');

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: tint,
        tabBarInactiveTintColor: inactive,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Popular',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="glass-cocktail" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favorites',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="star-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="magnify" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
