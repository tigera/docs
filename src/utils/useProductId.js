const { useLocation } = require('@docusaurus/router');

export function useProductId() {
  const { pathname } = useLocation();

  if (pathname.startsWith('/calico/')) {
    return 'calico';
  } else if (pathname.startsWith('/calico-cloud/')) {
    return 'calico-cloud';
  } else if (pathname.startsWith('/calico-enterprise/')) {
    return 'calico-enterprise';
  }
}
