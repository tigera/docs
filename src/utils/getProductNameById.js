export function getProductNameById(productId) {
  switch (productId) {
    case 'calico':
      return 'Calico Open Source';
    case 'calico-cloud':
      return 'Calico Cloud';
    case 'calico-enterprise':
      return 'Calico Enterprise';
  }
}
