const saveCartItems = (actualCart) => localStorage.setItem('cartItems', actualCart);

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
