function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function cartItemClickListener(event) {
  event.target.remove();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

async function getItemsToCart(event) {
  const getIdProduct = getSkuFromProductItem(event.target.parentNode);
  const data = await fetchItem(getIdProduct);
  const renameProduct = { sku: data.id, name: data.title, salePrice: data.price };
  const getCartItems = document.querySelector('.cart__items');
  getCartItems.appendChild(createCartItemElement(renameProduct));
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  section.lastChild.addEventListener('click', getItemsToCart);

  return section;
}

async function insert() {
  const search = await fetchProducts('computador');
  const products = search.results;
  products.forEach((product) => {
    const renamedProduct = { sku: product.id, name: product.title, image: product.thumbnail };
    const section = document.querySelector('.items');
    section.appendChild(createProductItemElement(renamedProduct));
  });
}

window.onload = () => {
  insert();
};
