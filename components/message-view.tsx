/**
 * The shared full-screen message used by the empty, error and no-results
 * states — `noFavesView` in `Faves.swift`, `NoResultsView` in `Search.swift`,
 * and the "4 oh 4" branch in `Popular.swift`.
 */
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';

type MessageViewProps = {
  /** A MaterialCommunityIcons glyph name, or an emoji via `emoji` instead. */
  icon?: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  emoji?: string;
  title: string;
  caption?: string;
  actionLabel?: string;
  onAction?: () => void;
};

export function MessageView({
  icon,
  emoji,
  title,
  caption,
  actionLabel,
  onAction,
}: MessageViewProps) {
  const muted = useThemeColor({}, 'muted');
  const accent = useThemeColor({}, 'accent');

  return (
    <View style={styles.container}>
      {emoji ? <ThemedText style={styles.emoji}>{emoji}</ThemedText> : null}
      {icon ? <MaterialCommunityIcons name={icon} size={96} color={muted} /> : null}
      <ThemedText style={styles.title}>{title}</ThemedText>
      {caption ? (
        <ThemedText style={[styles.caption, { color: muted }]}>{caption}</ThemedText>
      ) : null}
      {actionLabel && onAction ? (
        <Pressable
          accessibilityRole="button"
          onPress={onAction}
          style={({ pressed }) => [
            styles.action,
            { backgroundColor: accent, opacity: pressed ? 0.8 : 1 },
          ]}>
          <ThemedText style={styles.actionLabel}>{actionLabel}</ThemedText>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    gap: 12,
  },
  emoji: {
    fontSize: 72,
    lineHeight: 84,
  },
  title: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '700',
    textAlign: 'center',
  },
  caption: {
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'center',
  },
  action: {
    marginTop: 8,
    minHeight: 48,
    justifyContent: 'center',
    paddingHorizontal: 24,
    borderRadius: 16,
  },
  actionLabel: {
    color: '#FFFFFF',
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '600',
  },
});
