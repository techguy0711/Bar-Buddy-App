/**
 * Everything static lives in app.json; this only overrides the one field that
 * has to differ between a real build and an Expo Go preview.
 *
 * WHY: an EAS update is only served to a client whose runtime version matches
 * the one it was published with. Expo Go is a fixed binary that always asks for
 * `exposdk:<its SDK>`, so an update published under the default `appVersion`
 * policy (runtime version "1.0.0") is invisible to it — the manifest endpoint
 * answers 204 No Content rather than an error, which looks like a broken link
 * rather than a version mismatch.
 *
 * Publishing with EXPO_GO_PREVIEW=1 stamps the update `exposdk:54.0.0` instead,
 * which Expo Go will load. Both can live on the same branch: EAS serves each
 * client the newest update matching its own runtime version, so a dev build
 * still picks up the `appVersion` one.
 *
 *   EXPO_GO_PREVIEW=1 npx eas update --branch preview --message "..."
 */
const { dependencies } = require('./package.json');

/** "~54.0.35" -> "exposdk:54.0.0", so this follows an SDK bump on its own. */
function expoGoRuntimeVersion() {
  const major = dependencies.expo.replace(/^\D+/, '').split('.')[0];
  return `exposdk:${major}.0.0`;
}

module.exports = ({ config }) => {
  if (process.env.EXPO_GO_PREVIEW !== '1') return config;
  return { ...config, runtimeVersion: expoGoRuntimeVersion() };
};
