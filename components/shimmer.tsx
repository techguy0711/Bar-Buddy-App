/**
 * The loading shimmer, ported from `ShimmerView.swift`.
 *
 * The Swift version animated a slanted gradient mask across the view. Here a
 * soft highlight band is translated across a placeholder block instead, built
 * from stacked translucent slices rather than a real gradient so the effect
 * needs no native module, and driven by the core `Animated` API so it stays on
 * the native thread without pulling Reanimated worklets into pure decoration.
 */
import { useEffect, useRef, useState } from 'react';
import { Animated, Easing, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';

const CYCLE_DURATION_MS = 1500;

/** Opacity ramp across the band — a triangular falloff reads as a gradient. */
const BAND_SLICES = [0.04, 0.1, 0.18, 0.26, 0.18, 0.1, 0.04];

export function Shimmer({ style }: { style?: StyleProp<ViewStyle> }) {
  const phase = useRef(new Animated.Value(0)).current;
  const [width, setWidth] = useState(0);
  const placeholder = useThemeColor({}, 'placeholder');
  const highlight = useThemeColor({ light: '#FFFFFF', dark: '#8A9099' }, 'placeholder');

  useEffect(() => {
    const animation = Animated.loop(
      Animated.timing(phase, {
        toValue: 1,
        duration: CYCLE_DURATION_MS,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );
    animation.start();
    return () => animation.stop();
  }, [phase]);

  const bandWidth = Math.max(width * 0.6, 1);
  // The band sweeps back and forth *inside* the block rather than sliding in
  // from off-screen: the parent would clip an overhang anyway, and staying in
  // bounds keeps the element's own geometry on-screen.
  const translateX = phase.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, Math.max(width - bandWidth, 0), 0],
  });

  return (
    <View
      style={[styles.container, { backgroundColor: placeholder }, style]}
      onLayout={(event) => setWidth(event.nativeEvent.layout.width)}>
      {width > 0 ? (
        <Animated.View
          style={[styles.band, { width: bandWidth, transform: [{ translateX }] }]}
          pointerEvents="none">
          {BAND_SLICES.map((opacity, index) => (
            <View
              key={index}
              style={[styles.slice, { backgroundColor: highlight, opacity }]}
            />
          ))}
        </Animated.View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    borderRadius: 12,
  },
  band: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    flexDirection: 'row',
  },
  slice: {
    flex: 1,
  },
});
