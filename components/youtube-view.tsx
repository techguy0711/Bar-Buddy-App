/**
 * The embedded video player, ported from `YoutubeEmbeddedView.swift`
 * (a `WKWebView` wrapped in `UIViewRepresentable`).
 *
 * `youtube-view.web.tsx` is the browser counterpart, so react-native-webview —
 * which has no web build — is never pulled into a web bundle.
 */
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

import { youtubeEmbedUrl } from '@/lib/youtube';

export function YouTubeView({ url }: { url: string }) {
  const embedUrl = youtubeEmbedUrl(url);
  if (!embedUrl) return null;

  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: embedUrl }}
        style={styles.webview}
        scrollEnabled={false}
        allowsFullscreenVideo
        allowsInlineMediaPlayback
        mediaPlaybackRequiresUserAction
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    aspectRatio: 16 / 9,
    backgroundColor: '#000',
    overflow: 'hidden',
  },
  webview: {
    flex: 1,
    backgroundColor: '#000',
  },
});
