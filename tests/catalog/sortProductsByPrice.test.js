const products = require('../../src/data/products');
const { sortProductsByPrice} = require('../../src/catalog');

const pickByIds = (ids) => {
  return ids.map((id) => {
    const product = products.find((product) => product.id === id);
    if (!product) throw new Error(`Товар с id = ${id} не найден`);
    return product;
  });
}

describe('sortProductsByPrice', () => {
  test("все товары c 'asc' сортируются как [3, 6, 5, 4, 2, 1]", () => {
    const result = sortProductsByPrice(products, 'asc');
    expect(result.map((product) => product.id)).toEqual([3, 6, 5, 4, 2, 1]);
  });

  test('все товары без направления сортируются как [3, 6, 5, 4, 2, 1]', () => {
    const result = sortProductsByPrice(products);
    expect(result.map((product) => product.id)).toEqual([3, 6, 5, 4, 2, 1]);
  });

  test("товары [1, 3, 4] c 'asc' сортируются как [3, 4, 1]", () => {
    const selectedProducts = pickByIds([1, 3, 4]);
    const result = sortProductsByPrice(selectedProducts, 'asc');
    expect(result.map((product) => product.id)).toEqual([3, 4, 1]);
  });

  test("все товары c 'desc' сортируются как [1, 2, 4, 5, 6, 3]", () => {
    const result = sortProductsByPrice(products, 'desc');
    expect(result.map((product) => product.id)).toEqual([1, 2, 4, 5, 6, 3]);
  });

  test("товары [3, 1, 4] c 'desc' сортируются как [1, 4, 3]", () => {
    const selectedProducts = pickByIds([3, 1, 4]);
    const result = sortProductsByPrice(selectedProducts, 'desc');
    expect(result.map((product) => product.id)).toEqual([1, 4, 3]);
  });

  test("товары [5, 2, 6] c 'desc' сортируются как [2, 5, 6]", () => {
    const selectedProducts = pickByIds([5, 2, 6]);
    const result = sortProductsByPrice(selectedProducts, 'desc');
    expect(result.map((product) => product.id)).toEqual([2, 5, 6]);
  });

  test("'asc' не меняет исходный массив [1, 3, 4]", () => {
    const selectedProducts = pickByIds([1, 3, 4]);
    const originalOrder = selectedProducts.map((product) => product.id);

    const result = sortProductsByPrice(selectedProducts, 'asc');

    expect(result).not.toBe(selectedProducts);
    expect(selectedProducts.map((product) => product.id)).toEqual(originalOrder);
  });

  test("'desc' не меняет исходный массив [1, 3, 4]", () => {
    const selectedProducts = pickByIds([1, 3, 4]);
    const originalOrder = selectedProducts.map((product) => product.id);

    const result = sortProductsByPrice(selectedProducts, 'desc');

    expect(result).not.toBe(selectedProducts);
    expect(selectedProducts.map((product) => product.id)).toEqual(originalOrder);
  });

  test('направление по умолчанию не меняет исходный массив всех товаров', () => {
    const originalOrder = products.map((product) => product.id);

    const result = sortProductsByPrice(products);

    expect(result).not.toBe(products);
    expect(products.map((product) => product.id)).toEqual(originalOrder);
  });
});
