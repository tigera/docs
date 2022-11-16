export function parseLocationHash(location) {
  const scrollToMatch = location.hash.match(/(.*)-scroll-to-(.*)/);
  const hash = scrollToMatch ? scrollToMatch[1] : location.hash;

  return [hash, scrollToMatch];
}
