function notImplemented() {
  throw new Error('Корзина ещё не реализована. Сначала прочитайте тесты.');
}

function addToCart(cart, product, count) {
  if (count <= 0) {
    throw new RangeError("Количество товара должно быть больше 0");
  }

  const newCart = [...cart];

  const productIndex = newCart.findIndex((item) => item.id === product.id);
  const existing = productIndex > -1 ? newCart[productIndex] : null;
  const alreadyInCart = existing ? existing.quantity : 0;

  if (typeof product.stock === 'number' && alreadyInCart + count > product.stock) {
    throw new RangeError("Нельзя добавить больше товара чем есть на складе");
  }

  if (existing) {
    newCart[productIndex] = { ...existing, quantity: existing.quantity + count };
  } else {
    newCart.push({ ...product, quantity: count });
  }

  return newCart;
}

function changeQuantity(cart, productId, count) {
  if (count <= 0) {
    throw new RangeError("Количество товара должно быть больше 0");
  }

  const newCart = [...cart];

  const cartIndex = newCart.findIndex((item) => item.id === productId);
  if (cartIndex < 0) {
    return cart;
  }

  const product = newCart[cartIndex];
  if (count > product.stock) {
    throw new RangeError("Нельзя добавить больше товара чем есть на складе");
  }

  newCart[cartIndex] = { ...product, quantity: count };
  return newCart;
}

function removeFromCart() { return notImplemented(); }
function calculateCartSubtotal() { return notImplemented(); }
function calculateOrderTotal() { return notImplemented(); }

const cartApi = { addToCart, changeQuantity, removeFromCart, calculateCartSubtotal, calculateOrderTotal };

if (typeof module !== 'undefined') module.exports = cartApi;
if (typeof window !== 'undefined') window.cartApi = cartApi;
