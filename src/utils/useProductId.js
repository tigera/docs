const { useLocation } = require('@docusaurus/router');

export function useProductId() {
  const { pathname } = useLocation();

  if (pathname.startsWith('/calico/') || pathname === '/calico') {
    return 'calico';
  } else if (pathname.startsWith('/calico-cloud/') || pathname === '/calico-cloud') {
    return 'calico-cloud';
  } else if (pathname.startsWith('/calico-enterprise/') || pathname === '/calico-enterprise') {
    return 'calico-enterprise';
  } else if (pathname.startsWith('/use-cases/') || pathname === '/use-cases') {
    return 'use-cases';
  }
}
