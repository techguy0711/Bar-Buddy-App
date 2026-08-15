/**
 * Root navigation, ported from `Bar_BuddyApp.swift`.
 *
 * `.modelContainer(for: DrinkFav.self)` — the SwiftData container the whole
 * app hung off — becomes `FavoritesProvider` here.
 */
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { FavoritesProvider } from '@/lib/favorites';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <FavoritesProvider>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            {/* Header hidden on purpose — the screen renders its own. See the
                note in components/screen-header.tsx: the native iOS 26 nav bar
                stops receiving taps in Expo Go. The edge-swipe back gesture is
                unaffected by hiding it. */}
            <Stack.Screen name="drink/[id]" options={{ headerShown: false }} />
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </FavoritesProvider>
    </GestureHandlerRootView>
  );
}
