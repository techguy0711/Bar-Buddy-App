/**
 * TheCocktailDB's `strVideo` is a normal youtube.com watch link. Loading that
 * page inside a web view gets refused by YouTube, so it has to be rewritten to
 * the embed player first — the one part of `YoutubeEmbeddedView.swift` that
 * doesn't translate literally.
 */
export function youtubeEmbedUrl(url: string): string | null {
  const trimmed = url.trim();
  if (trimmed.length === 0) return null;

  const patterns = [
    /[?&]v=([A-Za-z0-9_-]{6,})/, // youtube.com/watch?v=ID
    /youtu\.be\/([A-Za-z0-9_-]{6,})/, // youtu.be/ID
    /\/embed\/([A-Za-z0-9_-]{6,})/, // already an embed URL
    /\/shorts\/([A-Za-z0-9_-]{6,})/, // youtube.com/shorts/ID
  ];

  for (const pattern of patterns) {
    const match = trimmed.match(pattern);
    if (match) {
      return `https://www.youtube.com/embed/${match[1]}?playsinline=1&rel=0`;
    }
  }
  return null;
}
