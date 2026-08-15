/**
 * An in-app header with a real, plain-React back button.
 *
 * WHY THIS EXISTS INSTEAD OF THE NATIVE STACK HEADER: on iOS 26 the native
 * `UINavigationBar` that react-native-screens renders stops receiving taps in
 * Expo Go — the bar draws correctly and the interactive-pop edge swipe still
 * works, but nothing in it is pressable, because SDK 54 forces its buttons
 * into iOS 26's liquid-glass treatment (expo/expo#39667,
 * software-mansion/react-native-screens#3226). Content and the tab bar are
 * unaffected, which is what makes it look like "only the back button is
 * broken".
 *
 * A custom `headerLeft` would not help: the whole bar is what stops
 * hit-testing, not the button inside it. So the route hides the native header
 * and renders this instead — an ordinary `Pressable`, which is subject to
 * nothing but React Native's own touch handling. The edge-swipe gesture is
 * independent of `headerShown` and still works.
 */
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';

/** Keeps the title optically centred between the back button and the gap. */
const SIDE_WIDTH = 92;

export function ScreenHeader({ title }: { title: string }) {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const accent = useThemeColor({}, 'accent');
  const background = useThemeColor({}, 'background');
  const border = useThemeColor({}, 'border');

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top, backgroundColor: background, borderBottomColor: border },
      ]}>
      <View style={styles.bar}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Go back"
          hitSlop={8}
          onPress={() => (router.canGoBack() ? router.back() : router.replace('/'))}
          style={({ pressed }) => [styles.back, { opacity: pressed ? 0.5 : 1 }]}>
          <MaterialCommunityIcons name="chevron-left" size={28} color={accent} />
          <ThemedText style={[styles.backLabel, { color: accent }]}>Back</ThemedText>
        </Pressable>

        <ThemedText style={styles.title} numberOfLines={1}>
          {title}
        </ThemedText>

        {/* Balances the back button so the title sits centred. */}
        <View style={styles.side} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 48,
    paddingHorizontal: 8,
  },
  back: {
    flexDirection: 'row',
    alignItems: 'center',
    // Its own 44pt minimum: this is the tap target the native bar lost.
    minWidth: SIDE_WIDTH,
    minHeight: 44,
    paddingRight: 8,
  },
  backLabel: {
    fontSize: 17,
    lineHeight: 22,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '600',
  },
  side: {
    width: SIDE_WIDTH,
  },
});
