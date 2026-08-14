/**
 * The list placeholder, ported from `ListLoadingView.swift` — a stack of
 * shimmering blocks standing in for drink rows while a fetch is in flight.
 */
import { ScrollView, StyleSheet } from 'react-native';

import { Shimmer } from '@/components/shimmer';

const PLACEHOLDER_ROWS = [0, 1, 2, 3];

export function ListLoadingView() {
  return (
    <ScrollView
      contentContainerStyle={styles.content}
      scrollEnabled={false}
      accessibilityLabel="Loading drinks">
      {PLACEHOLDER_ROWS.map((row) => (
        <Shimmer key={row} style={styles.block} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 16,
    gap: 16,
  },
  block: {
    height: 250,
  },
});
