export default function maybeRender(shouldRender, jsx) {
  if (shouldRender) {
    return jsx;
  }

  return null;
}
