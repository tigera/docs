export function parseLocationHash(location) {
  const decodedHash = decodeURIComponent(location.hash);
  const scrollToMatch = decodedHash.match(/(.*)-scroll-to-(.*)/);
  const hash = scrollToMatch ? scrollToMatch[1] : decodedHash;

  return [hash, scrollToMatch];
}
