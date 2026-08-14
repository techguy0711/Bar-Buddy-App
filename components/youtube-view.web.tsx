/**
 * Web counterpart to `youtube-view.tsx`. react-native-webview has no browser
 * implementation, and on the web the thing it wraps is just an iframe.
 */
import { StyleSheet, View } from 'react-native';

import { youtubeEmbedUrl } from '@/lib/youtube';

export function YouTubeView({ url }: { url: string }) {
  const embedUrl = youtubeEmbedUrl(url);
  if (!embedUrl) return null;

  return (
    <View style={styles.container}>
      <iframe
        src={embedUrl}
        title="Drink video"
        style={{ border: 'none', width: '100%', height: '100%' }}
        allow="accelerometer; encrypted-media; picture-in-picture"
        allowFullScreen
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
});
