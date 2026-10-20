const FREE_DELIVERY_FROM = 50000;
const DELIVERY_PRICE = 30000;
const SAVE10_MIN_SUBTOTAL = 20000;
const PROMOCODE = "SAVE10";

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

function removeFromCart(cart, productId) {
  if (productId < 0) {
    throw new RangeError("Некорректный идентификатор товара");
  }

  return cart.filter((item) => item.id !== productId);
}

function calculateCartSubtotal(cart) {
  return cart.reduce((total, product) => total + product.price * product.quantity, 0);
}

function calculateOrderTotal(cart, promo) {
  const cartSum = calculateCartSubtotal(cart);
  const deliverySum = (cartSum >= FREE_DELIVERY_FROM) ? 0 : DELIVERY_PRICE;
  const discountSum = (promo === PROMOCODE && cartSum >= SAVE10_MIN_SUBTOTAL) ? Math.floor(cartSum / 10) : 0;

  return {
    subtotal: cartSum,
    discount: discountSum,
    delivery: deliverySum,
    total: cartSum + deliverySum - discountSum,
  };
}

const cartApi = { addToCart, changeQuantity, removeFromCart, calculateCartSubtotal, calculateOrderTotal };

if (typeof module !== 'undefined') module.exports = cartApi;
if (typeof window !== 'undefined') window.cartApi = cartApi;
